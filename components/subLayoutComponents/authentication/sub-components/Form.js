"use client";

import PasswordField from "./Password";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import classes from "./form.module.css";
import Image from "next/image";
import InputField from "./Input";
import Link from "next/link";
import DividerWithText from "@/components/subLayoutComponents/divider/DividerWithText";

export default function FormContainer({ inputFields = null, children, isHaveLicense = true, isSignIn = false, formAction }) {
    const [formState, dispatch, isPending] = useActionState(formAction, {});

    return (
        <form action={dispatch} className={classes.formContainer}>
            {/* Render input fields */}
            {inputFields &&
                inputFields.map((field, index) => {
                    if (field.type === "input" || field.type === "email") return <InputField key={index} label={field.label} type={field.type} inputName={field.name} />;
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

            <SignUpButtonArea text={isSignIn ? "Log in" : "Create your account"} isSignIn={isSignIn} isPending={isPending} />

            <DividerWithText text={"OR"} />

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">{children}</div>
        </form>
    );
}

export function SignUpButton({ text, iconPath = null, altIconPath = null, widthIcon = null, heightIcon = null, additionClassName = "", isPending }) {
    return (
        <div className="flex justify-center items-center w-full sm:w-[40%]">
            <button type="submit" className={`w-full max-w-[250px] py-3 px-2 ${iconPath ? "text-zinc-800 border-[1px] border-black hover:bg-[#155bb5] hover:text-white hover:shadow-lg" : "text-white"} ${!iconPath && "bg-gray-300"} rounded-3xl text-sm cursor-pointer mb-6 hover:bg-[#005bb5] hover:text-[#f0f0f0] text-center flex items-center justify-center gap-2 space-x-2 ${additionClassName}`}>
                {iconPath && <Image src={iconPath} alt={altIconPath} width={widthIcon} height={heightIcon} />}
                <span>
                    {!isPending ? (
                        text
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z">
                                <animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" />
                            </path>
                        </svg>
                    )}
                </span>
            </button>
        </div>
    );
}

export function SignUpButtonArea({ isSignIn, text, isPending }) {
    let subText = isSignIn ? `Don't have account?` : `Already have an account?`;
    let href = isSignIn ? "/sign-up" : "/sign-in";

    return (
        <div className="flex justify-center items-center flex-col">
            <SignUpButton text={text} isPending={isPending} />
            <div className="flex gap-1 leading-4">
                <p className="font-normal">{subText}</p>
                <Link href={href} className="text-[#155bb5]">
                    {isSignIn ? "Sign up" : "Sign in"}
                </Link>
            </div>
        </div>
    );
}
