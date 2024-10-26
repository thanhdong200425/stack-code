"use server";

import { PrismaClient } from "@prisma/client";
import { hash, compare } from "bcrypt";
import { redirect } from "next/navigation";
import { validate } from "@/app/lib/validateDatabase";

const prisma = new PrismaClient();

export async function signUp(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");

    // Try to validate credentials
    const validateResult = await validate(email, password, username);
    // If there are at least 1 error, return them
    if (Object.keys(validateResult).length > 0) {
        return {
            errors: validateResult,
        };
    }

    let newUser;
    try {
        // If no error found
        const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
        const hashedPassword = await hash(password, saltRounds);
        // Create a new user by using prisma
        newUser = await prisma.user.create({
            data: {
                username,
                email,
                hashedPassword,
            },
        });
    } catch (e) {
        console.log("Error creating user:", e);
        return {
            errors: {
                server: "There was an error creating your account. Please try again.",
            },
        };
    }

    redirect("/test");
}

export async function signIn(prevState, formData) {
    const username = formData.get("username");
    const password = formData.get("password");

    let currentUser = null;

    try {
        currentUser = await prisma.user.findFirst({
            where: {
                username,
            },
        });

        if (!currentUser || !(await compare(password, currentUser.hashedPassword)))
            return {
                errors: {
                    error: "Invalid username or password. Please try again",
                },
            };
    } catch (e) {
        console.log("Error in signIn function with error: " + e);
        return {
            errors: {
                server: "An error occurred while trying to sign in. Please try again later.",
            },
        };
    }

    redirect("/test");
}
