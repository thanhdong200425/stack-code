"use server";

import { createClient } from "@/utils/supabase/server";

export async function search(value, limit = 10) {
    const supabase = await createClient();

    // Search in Users table
    const { data: userData, error: userError } = await supabase.from("Users").select("username, Info_Users(avatar_link)").ilike("username", `%${value}%`).limit(limit);

    if (userError) throw new Error("Error in search function (Users): " + userError.message);

    // Search in Problems table
    const { data: problemData, error: problemError } = await supabase.from("Problems").select("id,title, description, score").ilike("title", `%${value}%`).limit(limit);

    if (problemError) throw new Error("Error in search function (Problems): " + problemError.message);

    return { users: userData, problems: problemData };
}
