import { PUBLIC_API_URL } from "$env/static/public";

const refresh = async (refreshToken) => {
    const res = await fetch(`${PUBLIC_API_URL}/users/@me/refresh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
    });

    if (res.ok) {
        const data = await res.json();
        return data.accessToken;
    } else return null;
};

const getUser = async (accessToken, refreshToken, retry, cookies) => {
    const res = await fetch(`${PUBLIC_API_URL}/users/@me`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });

    if (res.ok) {
        const data = await res.json();
        return data;
    } else if (res.status === 401 && retry) {
        //accessToken expired, refresh it
        const newAccessToken = await refresh(refreshToken);

        if (newAccessToken) {
            //refresh token is valid
            //store new access token in cookies
            cookies.set("accessToken", newAccessToken, {
                path: "/",
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 90, // 90 days
            });

            return getUser(newAccessToken, false, cookies);
        } else return null;
    }
};

export const authenticateUser = async (event) => {
    const { cookies } = event;

    //accessToken & refreshToken are stored in cookies
    const accessToken = cookies.get("accessToken");
    const refreshToken = cookies.get("refreshToken");

    if (accessToken && refreshToken) {
        try {
            const user = await getUser(
                accessToken,
                refreshToken,
                true,
                cookies
            );

            if (user) {
                return user;
            } else return null;
        } catch (e) {
            return null;
        }
    } else return null;
};
