"use server";

import { createClient } from "@/utils/supabase/server";

export async function endPreviousUserSessions(userId) {
    try {
        const supabase = await createClient();
        await supabase.from("Sessions").delete().eq("user_id", userId);
        return {
            status: true,
        };
    } catch (error) {
        console.log("Error in the endPreviousUserSessions: " + error);
        return {
            status: false,
        };
    }
}
