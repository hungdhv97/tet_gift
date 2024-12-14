import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const API_USER_ME = `${process.env.NEXT_PUBLIC_API_URL}/api/users/me/`;

export async function middleware(req: NextRequest) {
    const accessToken = req.cookies.get("access_token");
    const urlPath = req.nextUrl.pathname;

    if (urlPath === "/") {
        return redirectTo("/dashboard", req);
    }

    if (!accessToken) {
        return redirectTo(urlPath === "/dashboard" ? "/login" : "/dashboard", req);
    }

    try {
        const response = await fetch(API_USER_ME, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken.value}`,
            },
        });

        if (response.ok) {
            return NextResponse.next();
        } else {
            console.error("Authentication failed:", response.statusText);
            return redirectTo(urlPath === "/dashboard" ? "/login" : "/dashboard", req);
        }
    } catch (error) {
        console.error("Error during authentication:", error);
        return redirectTo(urlPath === "/dashboard" ? "/login" : "/dashboard", req);
    }
}

function redirectTo(target: string, req: NextRequest) {
    const redirectUrl = new URL(target, req.url);
    return NextResponse.redirect(redirectUrl);
}

export const config = {
    matcher: ["/dashboard/:path*", "/vessels/:path*", "/"],
};
