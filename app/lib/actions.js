"use server";

import { hash, compare } from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { validate } from "@/app/lib/validateDatabase";
import supabase from "@/utils/supabase";
import { fetchData, insertAndReturnData } from "./utilsDatabase";

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

    redirect("/home");
}

export async function signIn(prevState, formData) {
    try {
        const username = formData.get("username");
        const password = formData.get("password").trim();

        const currentUser = await fetchData({
            tableName: "Users",
            data: {
                username,
            },
            isObject: true,
        });

        if (!currentUser) {
            return { errors: { error: "Invalid username or password. Please try again" } };
        }

        //Compare the plain password with the hashed password stored in the database
        const compareHashedPassword = await compare(password, currentUser.hashedPassword);
        console.log(compareHashedPassword);
        if (!compareHashedPassword) {
            return { errors: { error: "Invalid username or password. Please try again" } };
        }

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
