import { NextResponse } from "next/server";
import authMiddleware from "./middleware/authMiddleware";

export default function middleware(request) {
    if (request.nextUrl.pathname.startsWith("/home")) {
        return authMiddleware(request);
    }

    return NextResponse.next();
}
