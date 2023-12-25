const config = {
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
    ],

    plugins: [require("flowbite/plugin")],

    darkMode: "class",

    theme: {
        container: {
            padding: {
                DEFAULT: "1rem",
                sm: "4rem",
                lg: "10rem",
                xl: "15rem",
                "2xl": "25rem",
            },
            center: true,
        },
        extend: {
            colors: {
                // flowbite-svelte
                primary: {
                    50: "#ffffff",
                    100: "#ffffff",
                    200: "#f4908b",
                    300: "#ea6f69",
                    400: "#ee8c87",
                    500: "#e8615a",
                    600: "#9c3230",
                    700: "#5e2122",
                    800: "#451717",
                    900: "#3c181a",
                },
                gray: {
                    50: "#f9fafb",
                    100: "#f3f4f6",
                    200: "#e5e7eb",
                    300: "#d1d5db",
                    400: "#9ca3af",
                    500: "#6b7280",
                    600: "#4b5563",
                    700: "#374151",
                    800: "#1e181e",
                    900: "#131417",
                },
                discord: {
                    50: "#eef3ff",
                    100: "#e0e9ff",
                    200: "#c6d6ff",
                    300: "#a4b9fd",
                    400: "#8093f9",
                    500: "#5865f2",
                    600: "#4445e7",
                    700: "#3836cc",
                    800: "#2f2fa4",
                    900: "#2d2f82",
                    950: "#1a1a4c",
                },
            },
        },
    },
};

module.exports = config;
