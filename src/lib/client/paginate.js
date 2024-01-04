export default (arr, perPage, currentPage, showOnlyEntries = true) => {
    const totalPages = Math.ceil(arr.length / perPage);

    if (showOnlyEntries) {
        arr = arr.filter((user) => {
            return user.total_points !== 0;
        });
    }

    if (currentPage < 1 || currentPage > totalPages) {
        throw new Error("Invalid currentPage value");
    }

    const start = (currentPage - 1) * perPage + 1;
    const end = Math.min(currentPage * perPage, arr.length);

    const pages = Array.from({ length: totalPages }, (_, i) => ({
        name: i + 1,
        href: `/?page=${i + 1}`,
        items: arr.slice(i * perPage, (i + 1) * perPage),
    }));

    const helper = {
        start,
        end,
        total: arr.length,
    };

    return { pages, helper };
};
