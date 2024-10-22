"use client";
import { useFormStatus, useActionState } from "react";
import signUp from "@/app/lib/actions";
import classes from "./signup.module.css";
import Link from "next/link";
import { BiHide, BiShow } from "react-icons/bi";
import { useState } from "react";

export default function SignUp() {
    const [formState, dispatch] = useActionState(signUp, {});
    const [isShowPassword, setIsShowPassword] = useState(false);

    function showPasswordFunction() {
        setIsShowPassword(!isShowPassword);
    }

    return (
        <div className={classes.container}>
            <div className={classes.leftSection}>
                <h1>Welcome to Stackcode</h1>

                <form action={dispatch} className={classes.formContainer}>
                    <div className={classes.subFormContainer}>
                        <label>Email</label>
                        <input type="email" name="email" required autoComplete="false" />
                    </div>
                    <div className={classes.subFormContainer}>
                        <label>Username</label>
                        <input type="text" name="username" required autoComplete="false" />
                    </div>
                    <div className={classes.subFormContainer}>
                        <div className={classes.passwordLabel}>
                            <p>Password</p>
                            <p className={classes.iconWithTest} onClick={showPasswordFunction}>
                                {isShowPassword ? <BiShow /> : <BiHide />}
                                {isShowPassword ? "Hide" : "Show"}
                            </p>
                        </div>
                        <input type={isShowPassword ? "text" : "password"} name="password" required autoComplete="false" />
                    </div>

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

                    <label className={classes.licenseLabelNotification}>
                        By creating an account, you agree to the <span>Terms of use</span> and <span>Privacy Policy</span>
                    </label>

                    <SignUpButton />
                    <p className={classes.subHeading}>
                        Already have an account? <Link href="/sign-in">Log in</Link>
                    </p>
                </form>
            </div>
            <div className={classes.rightSection}>
                <video src="/videos/video.mp4" autoPlay loop muted playsInline className={classes.videoBackground} />
            </div>
        </div>
    );
}

function SignUpButton() {
    const { pending } = useFormStatus();

    const handleClick = (event) => {
        if (pending) {
            event.preventDefault();
        }
    };

    return (
        <button type="submit" onClick={handleClick} className={pending ? classes.disabledButton : ""}>
            Create an account
        </button>
    );
}
