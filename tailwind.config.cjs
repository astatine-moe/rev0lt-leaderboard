const config = {
    content: [
        "./src/**/*.{html,js,svelte,ts}",
        "./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}",
    ],

    plugins: [require("flowbite/plugin")],

    darkMode: "class",

    theme: {
        // container: {
        //     padding: {
        //         DEFAULT: "1rem",
        //         sm: "4rem",
        //         lg: "10rem",
        //         xl: "15rem",
        //         "2xl": "25rem",
        //     },
        //     center: true,
        // },

        container: {
            padding: {
                DEFAULT: "1rem",
                sm: "2rem",
                lg: "4rem",
                xl: "5rem",
                "2xl": "12.5rem",
            },
            center: true,
        },
        extend: {
            colors: {
                // flowbite-svelte
                primary: {
                    50: "#eefffc",
                    100: "#c5fffa",
                    200: "#8bfff5",
                    300: "#4afef0",
                    400: "#15ece2",
                    500: "#00d0c9",
                    600: "#00a8a5",
                    700: "#008080",
                    800: "#066769",
                    900: "#0a5757",
                    950: "#003235",
                },
                gray: {
                    50: "#cbd2d2",
                    100: "#c4c4ca",
                    200: "#adafb8",
                    300: "#8c909b",
                    400: "#686c78",
                    500: "#4d4f56",
                    600: "#37383f",
                    700: "#26272c",
                    800: "#1a1a1e",
                    900: "#131416",
                    950: "#000000",
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
                violet: {
                    50: "#f5f3ff",
                    100: "#ede9fe",
                    200: "#ddd6fe",
                    300: "#c4b5fd",
                    400: "#a78bfa",
                    500: "#8b5cf6",
                    600: "#7c3aed",
                    700: "#6d28d9",
                    800: "#5b21b6",
                    900: "#4c1d95",
                    950: "#2e1065",
                },
            },
        },
    },
};

module.exports = config;
