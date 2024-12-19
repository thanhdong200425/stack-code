import { updateSession } from "@/utils/supabase/middleware";
import { createClient } from "./utils/supabase/server";
import { NextResponse } from "next/server";

export async function middleware(request) {
    const protectedPaths = ["/home", "/coding"];
    const requestPath = request.nextUrl.pathname;
    const supabase = await createClient();

    if (protectedPaths.some((path) => requestPath.startsWith(path))) {
        const userSession = await supabase.auth.getSession();
        if (!userSession.data.session) {
            return NextResponse.redirect(new URL("/sign-in", request.url));
        }
    }

    if (requestPath.startsWith("/sign-in") || requestPath.startsWith("/sign-up")) {
        const userSession = await supabase.auth.getSession();
        if (userSession.data.session) {
            return NextResponse.redirect(new URL("/home", request.url));
        }
    }

    // update user's auth session
    return await updateSession(request);
}
