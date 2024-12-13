import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const API_USER_ME = `${process.env.NEXT_PUBLIC_API_URL}/api/users/me`;

export async function middleware(req: NextRequest) {
    const accessToken = req.cookies.get("access_token");

    if (!accessToken) {
        return redirectToLogin(req);
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
            return redirectToLogin(req);
        }
    } catch (error) {
        console.error("Error during authentication:", error);
        return redirectToLogin(req);
    }
}

function redirectToLogin(req: NextRequest) {
    const loginUrl = new URL("/", req.url);
    return NextResponse.redirect(loginUrl);
}

export const config = {
    matcher: ["/dashboard/:path*", "/vessels/:path*"],
};
