"use client";

import { BiHide, BiShow } from "react-icons/bi";
import classes from "./password.module.css";
import { useState } from "react";

export default function PasswordField({ name }) {
    const [isShowPassword, setIsShowPassword] = useState(false);
    function showPasswordFunction() {
        setIsShowPassword(!isShowPassword);
    }

    return (
        <div className={classes.passwordFormContainer}>
            <div className={classes.passwordLabel}>
                <p>Password</p>
                <p className={classes.iconWithTest} onClick={showPasswordFunction}>
                    {isShowPassword ? <BiShow /> : <BiHide />}
                    {isShowPassword ? "Hide" : "Show"}
                </p>
            </div>
            <input type={isShowPassword ? "text" : "password"} name={name} required autoComplete="false" className="text-black" />
        </div>
    );
}
