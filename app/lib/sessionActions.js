import supabase from "@/utils/supabase";

export async function endPreviousUserSessions(userId) {
    try {
        await supabase.from("Sessions").delete().eq("userId", userId);
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
