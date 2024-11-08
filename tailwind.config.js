/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",

        // Or if using `src` directory:
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            boxShadow: {
                custom: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
            },
            keyframes: {
                animateTop: {
                    "0%": { top: "-300px", opacity: "0" },
                    "100%": { top: "0", opacity: "1" },
                },
                fadeIn: {
                    "0%": { opacity: 0, transform: "translateY(-10px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" },
                },
            },
            animation: {
                animateTop: "animateTop 0.4s ease-out",
                animateFadeIn: "fadeIn 0.2s ease-out",
            },
        },
    },
    plugins: [],
};
