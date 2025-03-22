import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { Role } from "@/app/_lib/prisma";


export default auth(async (req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const reqPath = nextUrl.pathname;

    // Public routes
    const publicRoutes = ["/login", "/"];
    if (publicRoutes.includes(reqPath)) {
        return isLoggedIn
            ? NextResponse.redirect(new URL("/dashboard", nextUrl))
            : NextResponse.next();
    }

    if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/login", nextUrl));
    }

    // Protected routes
    const userRole = req.auth?.user.role;

    const adminRoutes = ["/dashboard/admin"];
    const adminRoles = [Role.ADMIN];
    if (adminRoutes.some(route => reqPath.includes(route)) && !adminRoles.includes(userRole)) {
        return NextResponse.redirect(new URL("/permission-denied", nextUrl));
    }

    const teacherRoutes = ["/dashboard/teacher"];
    const teacherRoles = [Role.TEACHER, Role.ADMIN];
    if (teacherRoutes.some(route => reqPath.includes(route)) && !teacherRoles.includes(userRole)) {
        return NextResponse.redirect(new URL("/permission-denied", nextUrl));
    }
    const labManagerRoutes = ["/dashboard/lab-manager"];
    const labManagerRoles = [Role.LAB_MANAGER, Role.ADMIN];
    if (labManagerRoutes.some(route => reqPath.includes(route)) && !labManagerRoles.includes(userRole)) {
        return NextResponse.redirect(new URL("/permission-denied", nextUrl));
    }



    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};