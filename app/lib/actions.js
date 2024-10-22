"use server";

import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

function validate(email, password, username) {
    let errors = {};
    // If username is empty
    if (username.trim().length <= 0) errors.username = "Username can't be empty!";

    // If email don't have "@"
    if (!email.includes("@")) errors.email = "Please include @ with your email!";

    // If the password doesn't have at least 8 character, or one uppercase letter or one number or one special character
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    if (password.trim().length < 8) {
        errors.password = "Your password length is too short, try more 8 characters!";
    } else if (!hasUpperCase) {
        errors.password = "Your password have to has at least one uppercase character!";
    } else if (!hasNumber) {
        errors.password = "Your password have to has at least one number!";
    }

    // If there is at least 1 error, return it
    if (Object.keys(errors).length > 0) {
        return errors;
    }

    // If no error, return True
    return {};
}

export default async function signUp(prevState, formData) {
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");

    console.log(email, password, username);

    // Try to validate credentials
    const validateResult = validate(email, password, username);
    // If there are at least 1 error, return them
    if (Object.keys(validateResult).length > 0) {
        return {
            errors: validateResult,
        };
    }

    // If no error found
    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    const hashedPassword = await hash(password, saltRounds);

    try {
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                hashedPassword,
            },
        });

        return {
            success: true,
            newUser,
        };
    } catch (e) {
        console.error("Error creating user:", e);
        return {
            errors: {
                server: "There was an error creating your account. Please try again.",
            },
        };
    }
}
