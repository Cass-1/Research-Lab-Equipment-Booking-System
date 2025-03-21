import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    // Public routes
    const publicRoutes = ["/login", "/"];
    if (publicRoutes.includes(nextUrl.pathname)) {
        return isLoggedIn
            ? NextResponse.redirect(new URL("/dashboard", nextUrl))
            : NextResponse.next();
    }

    // Protected routes
    if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/login", nextUrl));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};