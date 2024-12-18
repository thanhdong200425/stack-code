import { NextResponse } from "next/server";
import authMiddleware from "./middleware/authMiddleware";

export default function middleware(request) {
    if (request.nextUrl.pathname.startsWith("/home")) {
        return authMiddleware(request);
    }

    if (request.nextUrl.pathname.startsWith("/sign-in")) {
        const sessionId = request.cookies.get("sessionId");
        if (sessionId) {
            return NextResponse.redirect(new URL("/home", request.url));
        }
    }

    return NextResponse.next();
}
