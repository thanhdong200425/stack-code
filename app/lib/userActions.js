"use server";

import { hash, compare } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { validate } from "@/app/lib/validateActions";
import supabase from "@/utils/supabase";
import { insertAndReturnData } from "./generalActions";
import { endPreviousUserSessions } from "./sessionActions";

export async function signUp(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");

    const validateResult = await validate(email, password, username);
    if (Object.keys(validateResult).length > 0) {
        return { errors: validateResult };
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS);
    const hashedPassword = await hash(password, saltRounds);

    const { data, error } = await supabase.from("Users").insert([{ username, email, hashedPassword }]).single();

    if (error) {
        console.log("Error creating user:", error);
        return { errors: { server: "There was an error creating your account. Please try again." } };
    }

    redirect("/sign-in");
}

export async function signIn(prevState, formData) {
    try {
        const username = formData.get("username");
        const password = formData.get("password").trim();

        const { data: currentUser, error } = await supabase
            .from("Users")
            .select("*")
            .match({
                username: username,
            })
            .single();

        if (!currentUser) {
            return { errors: { error: "Invalid username or password. Please try again" } };
        }

        //Compare the plain password with the hashed password stored in the database
        const compareHashedPassword = await compare(password, currentUser.hashedPassword);
        if (!compareHashedPassword) {
            return { errors: { error: "Invalid username or password. Please try again" } };
        }

        await endPreviousUserSessions(currentUser.id);

        const sessionToken = uuidv4();
        const session = await insertAndReturnData({
            tableName: "Sessions",
            data: [
                {
                    userId: currentUser.id,
                    token: sessionToken,
                    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
                },
            ],
        });

        const cookieStore = await cookies();
        cookieStore.set("sessionId", session[0].token, { expires: new Date(session[0].expiresAt) });
    } catch (error) {
        console.error("Error in signIn function: " + error);
        return {
            errors: {
                error,
            },
        };
    }

    redirect("/home");
}

export async function fetchImage() {
    // Get sessionId from cookie first
    const cookieStore = await cookies();
    const sessionId = cookieStore.get("sessionId").value;

    // Get image by retrieve userId from sessionId
    const { data, error } = await supabase.from("Sessions").select("Users:userId (Info_Users (avatar_link))").match({ token: sessionId }).single();

    // If there is any error, log them out
    if (error) {
        throw new Error("Error in fetchImage: " + error.message);
    }

    // If there isn't error, then return avatar
    return data.Users.Info_Users.avatar_link;
}
