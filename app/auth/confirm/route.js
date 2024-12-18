import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type");
    const next = searchParams.get("next") ?? "/";

    if (token_hash && type) {
        const supabase = await createClient();

        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        });
        if (!error) {
            redirect("/error");
        }
    }

    // redirect the user to an error page with some instructions
    redirect("/sign-in");
}
