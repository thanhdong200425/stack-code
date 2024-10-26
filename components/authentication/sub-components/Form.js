"use client";

import PasswordField from "./Password";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import classes from "./form.module.css";
import DividerWithText from "@/components/divider/DividerWithText";
import Image from "next/image";
import InputField from "./Input";
import Link from "next/link";

export default function FormContainer({ inputFields = null, children, isHaveLicense = true, isSignIn = false, formAction }) {
    const [formState, dispatch] = useActionState(formAction, {});

    return (
        <form action={dispatch} className={classes.formContainer}>
            {/* Render input fields */}
            {inputFields &&
                inputFields.map((field, index) => {
                    if (field.type === "input") return <InputField key={index} label={field.label} inputName={field.name} />;
                    else if (field.type === "password") return <PasswordField key={index} name={field.name} />;
                    return null;
                })}

            {formState.errors && (
                <div className="text-red-600 text-sm mb-5">
                    {Object.keys(formState.errors).map((error, index) => {
                        return <p key={index}>{formState.errors[error]}</p>;
                    })}
                </div>
            )}

            {isHaveLicense && (
                <label className={classes.licenseLabel}>
                    <input type="checkbox" name="subscribe" defaultChecked />
                    <span>I want to receive emails about the product, feature updates, events, and marketing promotions.</span>
                </label>
            )}

            <SignUpButtonArea text={isSignIn ? "Log in" : "Create your account"} isSignIn={isSignIn} />

            <DividerWithText text={"OR"} />

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">{children}</div>
        </form>
    );
}

export function SignUpButton({ text, iconPath = null, altIconPath = null, widthIcon = null, heightIcon = null, additionClassName = "" }) {
    const { pending } = useFormStatus();

    const handleClick = (event) => {
        if (pending) {
            event.preventDefault();
        }
    };

    return (
        <div className="flex justify-center items-center w-full sm:w-[40%]">
            <button type="submit" onClick={handleClick} className={`w-full max-w-[250px] py-3 px-2 ${iconPath ? "text-zinc-800 border-[1px] border-black hover:bg-[#155bb5] hover:text-white hover:shadow-lg" : "text-white"} ${!iconPath && "bg-gray-300"} rounded-3xl text-sm cursor-pointer mb-6 hover:bg-[#005bb5] hover:text-[#f0f0f0] text-center flex items-center justify-center gap-2 space-x-2 ${additionClassName}`}>
                {iconPath && <Image src={iconPath} alt={altIconPath} width={widthIcon} height={heightIcon} />}
                <span>{text}</span>
            </button>
        </div>
    );
}

export function SignUpButtonArea({ isSignIn, text }) {
    let subText = isSignIn ? `Don't have account?` : `Already have an account?`;
    let href = isSignIn ? "/sign-up" : "/sign-in";

    return (
        <div className="flex justify-center items-center flex-col">
            <SignUpButton text={text} />
            <div className="flex gap-1 leading-4">
                <p className="font-normal">{subText}</p>
                <Link href={href} className="text-[#155bb5]">
                    {isSignIn ? "Sign up" : "Sign in"}
                </Link>
            </div>
        </div>
    );
}
