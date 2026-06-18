import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                // Primary colors for child-friendly design
                primary: {
                    blue: "#87CEEB",  // Light Blue (sky blue)
                    green: "#4CAF50", // Green (correct actions, safe)
                    red: "#F44336",   // Red (stop, gentle warning)
                    yellow: "#FFC107", // Yellow/Orange (caution)
                },
                secondary: {
                    purple: "#9C27B0", // Badges, rewards
                    pink: "#E91E63",   // Playful elements
                    teal: "#009688",   // Alternative safe indicators
                    amber: "#FF9800",  // Progress indicators
                },
                neutral: {
                    white: "#FFFFFF",
                    lightGray: "#F5F5F5",
                    darkGray: "#424242",
                    mediumGray: "#757575",
                },
                semantic: {
                    success: "#4CAF50",
                    warning: "#FFB300",
                    error: "#F44336",
                    info: "#2196F3",
                }
            },
            fontFamily: {
                baloo: ["var(--font-baloo)", "sans-serif"],
                nunito: ["var(--font-nunito)", "sans-serif"],
            },
            fontSize: {
                display: ["2rem", { lineHeight: "1.2" }],      // 32px
                h1: ["1.75rem", { lineHeight: "1.2" }],        // 28px
                h2: ["1.5rem", { lineHeight: "1.3" }],         // 24px
                h3: ["1.25rem", { lineHeight: "1.3" }],        // 20px
                body: ["1.125rem", { lineHeight: "1.5" }],     // 18px (minimum)
                small: ["1rem", { lineHeight: "1.5" }],        // 16px
                button: ["1.125rem", { lineHeight: "1" }],     // 18px
            },
            spacing: {
                xs: "0.25rem",   // 4px
                sm: "0.5rem",    // 8px
                md: "1rem",      // 16px
                lg: "1.5rem",    // 24px
                xl: "2rem",      // 32px
                "2xl": "3rem",   // 48px
                "3xl": "4rem",   // 64px
            },
            borderRadius: {
                card: "0.5rem",    // 8px for clean professional cards
                button: "0.75rem", // 12px for buttons
            },
            minHeight: {
                button: "3.75rem", // 60px minimum for buttons
            },
            minWidth: {
                button: "3.75rem", // 60px minimum for buttons
            },
        },
    },
    plugins: [],
};

export default config;
