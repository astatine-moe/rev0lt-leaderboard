import { browser } from "$app/environment";

export const makeCamelCase = (str) => {
    return str
        .replace(/\s(.)/g, function ($1) {
            return $1.toUpperCase();
        })
        .replace(/\s/g, "")
        .replace(/^(.)/, function ($1) {
            return $1.toLowerCase();
        });
};

export const stripHtml = (html) => {
    const regEx = /(<([^>]+)>)/gi;
    return html.replace(regEx, "");
};
