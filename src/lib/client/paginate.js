export default (arr, perPage = 5) =>
    Array.from({ length: Math.ceil(array.length / itemsPerPage) }, (_, i) =>
        array.slice(i * itemsPerPage, (i + 1) * itemsPerPage)
    );
