export const load = async ({ locals }) => {
    return {
        user: locals.user, //expose user to all routes
    };
};
