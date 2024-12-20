"use server";

import { v4 as uuidv4 } from "uuid";
import { redirect } from "next/navigation";
import { cookies, headers } from "next/headers";
import { insertAndReturnData } from "./generalActions";
import { endPreviousUserSessions } from "./sessionActions";
import { createClient } from "@/utils/supabase/server";

export async function signUpFunction(prevState, formData) {
    const supabase = await createClient();

    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");

    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            data: {
                username: username,
            },
        },
    });

    if (error) {
        console.log("Error creating user:", error.message);
        return { errors: { server: error.message } };
    }

    redirect("/sign-in");
}

export async function signIn(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password").trim();

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        console.error("Error in signIn function: " + error);
        return {
            errors: {
                error,
            },
        };
    }

    try {
        await endPreviousUserSessions(data.user.id);

        const sessionToken = uuidv4();
        const session = await insertAndReturnData({
            tableName: "Sessions",
            data: [
                {
                    user_id: data.user.id,
                    token: sessionToken,
                    expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
                },
            ],
        });

        const cookieStore = await cookies();
        cookieStore.set("sessionId", sessionToken, {
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
        });
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

export async function signOut() {
    const supabase = await createClient();

    const { error } = await supabase.auth.signOut();

    if (error) throw new Error("Error in signOut: " + error.message);
    redirect("/sign-in");
}

export async function signInWithGoogle() {
    const supabase = await createClient();
    const headerList = await headers();
    const origin = headerList.get("origin");

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) throw new Error("Error in signInWithGoogle: " + error.message);

    return data.url ? redirect(data.url) : redirect("/sign-in");
}

export async function signInWithGithub() {
    const supabase = await createClient();
    const headerList = await headers();
    const origin = headerList.get("origin");

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    });

    if (error) throw new Error("Error in signInWithGithub: " + error.message);

    return data.url ? redirect(data.url) : redirect("/sign-in");
}

export async function signInWithNotion() {
    const supabase = await createClient();
    const headerList = await headers();
    const origin = headerList.get('origin');
    const {data, error} = await supabase.auth.signInWithOAuth({
        provider: "notion",
        options: {
            redirectTo: `${origin}/auth/callback`,
        }
    })

    if (error) throw new Error("Error in signInWithNotion: " + error.message);

    return data.url ? redirect(data.url) : redirect("/sign-in");
}

export async function fetchImage() {
    const supabase = await createClient();
    const { data: userData } = await supabase.auth.getUser();

    // Get image by retrieve userId from sessionId
    const { data, error } = await supabase.from("Info_Users").select("avatar_link").eq("id", userData.user.id).single();

    // If there is any error, log them out
    if (error) {
        throw new Error("Error in fetchImage: " + error.message);
    }

    // If there isn't error, then return avatar
    return data.avatar_link;
}
