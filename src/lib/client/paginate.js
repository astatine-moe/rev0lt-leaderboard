export default (arr, perPage = 5) =>
    Array.from({ length: Math.ceil(arr.length / perPage) }, (_, i) => ({
        name: i + 1,
        href: `/?page=${i + 1}`,
        items: arr.slice(i * perPage, (i + 1) * perPage),
    }));
