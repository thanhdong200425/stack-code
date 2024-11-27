import supabase from "@/utils/supabase";

export async function validate(email, password, username) {
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

    // If email or username is already in use
    const isDuplicate = await isDuplicateEmailOrUsername(email, username);
    if (isDuplicate) {
        errors.email = "Your email or username was already in use. Try another email or username!";
    }

    // If there is at least 1 error, return it
    if (Object.keys(errors).length > 0) {
        return errors;
    }

    // If no error, return True
    return {};
}

export async function isDuplicateEmailOrUsername(email, username) {
    const { data, error } = await supabase.from("Users").select("*").or(`email.eq.${email},username.eq.${username}`).limit(1);
    return data.length !== 0;
}
