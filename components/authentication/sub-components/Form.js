"use client";

import PasswordField from "./Password";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import signUp from "@/app/lib/actions";
import classes from "./form.module.css";
import DividerWithText from "@/components/divider/DividerWithText";
import Image from "next/image";
import InputField from "./Input";

export default function FormContainer() {
    const [formState, dispatch] = useActionState(signUp, {});

    return (
        <form action={dispatch} className={classes.formContainer}>
            <InputField label={"Email"} inputName={"email"} />
            <InputField label={"Username"} inputName={"username"} />
            <PasswordField name={"password"} />

            {formState.errors && (
                <div className={classes.errors}>
                    {Object.keys(formState.errors).map((error, index) => {
                        return <p key={index}>{formState.errors[error]}</p>;
                    })}
                </div>
            )}

            <label className={classes.licenseLabel}>
                <input type="checkbox" name="subscribe" defaultChecked />
                <span>I want to receive emails about the product, feature updates, events, and marketing promotions.</span>
            </label>

            <div className="flex justify-center items-center">
                <SignUpButton text={"Create your account"} />
            </div>
            <DividerWithText text={"OR"} />

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <SignUpButton text={"Sign in with Facebook"} iconPath={"/icons/facebook.svg"} altIconPath={"Facebook icon"} widthIcon={32} heightIcon={32} />
                <SignUpButton text={"Sign in with Google"} iconPath={"/icons/google.svg"} altIconPath={"Google icon"} widthIcon={30} heightIcon={30} />
                <SignUpButton text={"Sign in with Github"} iconPath={"/icons/github.svg"} altIconPath={"Github icon"} widthIcon={30} heightIcon={30} />
            </div>
            {/* <p className={classes.subHeading}>
                Already have an account? <Link href="/sign-in">Log in</Link>
            </p> */}
        </form>
    );
}

function SignUpButton({ text, iconPath = null, altIconPath = null, widthIcon = null, heightIcon = null, additionClassName = "" }) {
    const { pending } = useFormStatus();

    const handleClick = (event) => {
        if (pending) {
            event.preventDefault();
        }
    };

    return (
        <div className="flex justify-center items-center w-full sm:w-[40%]">
            <button type="submit" onClick={handleClick} className={`w-full py-3 px-2 ${iconPath ? "text-zinc-800 border-[1px] border-black hover:bg-[#155bb5] hover:text-white hover:shadow-lg" : "text-white"} ${!iconPath && "bg-gray-300"} rounded-3xl text-sm cursor-pointer mb-6 hover:bg-[#005bb5] hover:text-[#f0f0f0] text-center flex items-center justify-center gap-2 space-x-2 ${additionClassName}`}>
                {iconPath && <Image src={iconPath} alt={altIconPath} width={widthIcon} height={heightIcon} />}
                <span>{text}</span>
            </button>
        </div>
    );
}
