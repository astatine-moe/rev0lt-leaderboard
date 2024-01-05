import { redirect } from "@sveltejs/kit";

export const load = async (event) => {
    //if user is already logged in, redirect to home

    const user = event.locals?.user;

    if (!user) {
        throw redirect(302, "/");
    }

    //else just continue
    return;
};
