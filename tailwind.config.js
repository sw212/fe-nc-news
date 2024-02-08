/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "background": "#1c2025",
                "background_alt": "#b3b6b8",
                "background_header": "#1c2025",
            },
        },
    },
    plugins: [],
}