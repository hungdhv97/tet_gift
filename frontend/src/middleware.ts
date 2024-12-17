import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const API_USER_ME = `${process.env.NEXT_PUBLIC_API_URL}/api/users/me/`;

export async function middleware(req: NextRequest) {
    const accessToken = req.cookies.get("access_token");
    const urlPath = req.nextUrl.pathname;

    if (urlPath === "/") {
        return redirectTo("/login", req);
    }

    if (urlPath === "/login") {
        if (!accessToken) {
            return NextResponse.next();
        }

        try {
            const response = await fetch(API_USER_ME, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken.value}`,
                },
            });

            if (response.ok) {
                return redirectTo("/dashboard", req);
            } else {
                console.error("Authentication failed:", response.statusText);
                return deleteTokenAndRedirect(req);
            }
        } catch (error) {
            console.error("Error during authentication:", error);
            return deleteTokenAndRedirect(req);
        }
    }

    if (!accessToken) {
        return redirectTo("/login", req);
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
            return deleteTokenAndRedirect(req);
        }
    } catch (error) {
        console.error("Error during authentication:", error);
        return deleteTokenAndRedirect(req);
    }
}

function redirectTo(target: string, req: NextRequest) {
    const redirectUrl = new URL(target, req.url);
    return NextResponse.redirect(redirectUrl);
}

function deleteTokenAndRedirect(req: NextRequest) {
    const response = NextResponse.redirect(new URL("/login", req.url));
    response.cookies.delete("access_token");
    return response;
}

export const config = {
    matcher: ["/dashboard", "/introduction", "/news/:path*", "/update_position", "/vessels/:path*", "/", "/login"],
};
