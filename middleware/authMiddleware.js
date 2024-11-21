import { NextResponse } from "next/server";

export default function authMiddleware(request) {
    const sessionId = request.cookies.get("sessionId");

    const url = new URL(request.url);

    if (sessionId && (url.pathname.includes("sign-in") || url.pathname.includes("sign-up"))) {
        return NextResponse.redirect(new URL("/home", request.url));
    }

    if (!sessionId) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}
