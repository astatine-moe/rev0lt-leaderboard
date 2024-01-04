export default (arr, perPage = 5) =>
    Array.from({ length: Math.ceil(arr.length / perPage) }, (_, i) =>
        arr.slice(i * perPage, (i + 1) * perPage)
    );
