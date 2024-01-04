export default (arr, perPage) => {
    const totalPages = Math.ceil(arr.length / perPage);

    const pages = Array.from({ length: totalPages }, (_, i) => ({
        name: i + 1,
        href: `/?page=${i + 1}`,
        items: arr.slice(i * perPage, (i + 1) * perPage),
    }));

    const helper = {
        start: 1,
        end: totalPages,
        total: arr.length,
    };

    return { pages, helper };
};
