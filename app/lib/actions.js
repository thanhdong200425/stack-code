"use server";

import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";
import { validate } from "@/app/lib/validateDatabase";

const prisma = new PrismaClient();

export default async function signUp(prevState, formData) {
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

    // If no error found
    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await hash(password, saltRounds);

    try {
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
