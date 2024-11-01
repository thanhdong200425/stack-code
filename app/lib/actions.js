"use server";

import {hash, compare} from "bcrypt";
import {v4 as uuidv4} from "uuid";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";

import {validate} from "@/app/lib/validateDatabase";
import supabase from "@/utils/supabase";


export async function signUp(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");

    const validateResult = await validate(email, password, username);
    if (Object.keys(validateResult).length > 0) {
        return {errors: validateResult};
    }

    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await hash(password, saltRounds);

    const {data, error} = await supabase
        .from('Users')
        .insert([{username, email, hashedPassword}])
        .single();

    if (error) {
        console.log("Error creating user:", error);
        return {errors: {server: "There was an error creating your account. Please try again."}};
    }

    redirect("/home");
    return {};
}

export async function signIn(prevState, formData) {
    const username = formData.get("username");
    const password = formData.get("password");

    const {data: currentUser, error} = await supabase
        .from('Users')
        .select('*')
        .eq('username', username)
        .single();

    if (error || !currentUser || !(await compare(password, currentUser.hashedPassword))) {
        return {errors: {error: "Invalid username or password. Please try again"}};
    }

    const sessionToken = uuidv4();
    const {data: session, error: sessionError} = await supabase
        .from('Sessions')
        .insert([{
            userId: currentUser.id,
            token: sessionToken,
            expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10)
        }])
        .single();

    if (sessionError) {
        console.log("Error creating session:", sessionError);
        return {errors: {server: "An error occurred while trying to sign in. Please try again later."}};
    }

    const cookieStore = await cookies();
    cookieStore.set("sessionId", session.token, {expires: session.expiresAt});

    redirect("/home");
}
