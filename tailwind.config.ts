import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  daisyui: {
    themes: ["dark"], // Or "dark", "cupcake", etc.
  },
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'main-1': '#D6DDE3',  // dark background
        'main-2': '#474B4F',  // slightly lighter
        'main-3': '#2C2F33',  // accent background
        'colortext-1':"#2C2F33"
      },
      animation: {
        "bounce-once": "bounce 0.8s ease-in-out 1",
      },
    },
  },
  plugins: [require("daisyui")],
} satisfies Config;
