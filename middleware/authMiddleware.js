import { NextResponse } from "next/server";

export default function authMiddleware(request) {
    const sessionId = request.cookies.get("sessionId");
    if (!sessionId) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    return NextResponse.next();
}
