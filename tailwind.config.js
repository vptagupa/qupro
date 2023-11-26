/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
    ],
    theme: {
        extend: {
            screens: {
                xs: "375px",
            },
            fontSize: {
                xs: "0.75rem",
                xxs: "0.55rem",
            },
            animation: {
                marquee: "marquee 20s linear infinite",
            },
            keyframes: {
                marquee: {
                    from: {
                        transform: "translateX(100%)",
                    },
                    to: {
                        transform: "translateX(-200%)",
                    },
                },
            },
        },
    },
    plugins: [],
};
