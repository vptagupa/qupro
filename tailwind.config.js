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
            },
        },
    },
    plugins: [],
};
