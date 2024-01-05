import { error, redirect } from "@sveltejs/kit";
import { PUBLIC_API_URL } from "$env/static/public";

export async function GET({ url, cookies, locals }) {
    const token = url.searchParams.get("user");

    console.log(token);

    if (!token) {
        throw error(400, "Bad Request");
    }

    //make POST request to backend /auth/discord/return with {token}
    // this will return accessToken & refreshToken to be stored in cookies
    //then it will redirect to /

    const res = await fetch(`${PUBLIC_API_URL}/auth/discord/return`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
    });

    if (res.ok) {
        const data = await res.json();

        cookies.set("accessToken", data.accessToken, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 90, // 90 days
        });

        cookies.set("refreshToken", data.refreshToken, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24 * 90, // 90 days
        });

        throw redirect(303, "/success");
    } else {
        //get json
        const data = await res.json();

        console.log(data);
        throw error(res.status, "Bad Request");
    }
}
