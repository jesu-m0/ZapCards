import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        moonstone: "#0FA3B1",
        uranianBlue: "#B5E2FA",
        babyPowder: "#F9F7F3",
        vanilla: "#EDDEA4",
        atomicTangerine: "#F7A072",
      },
    },
  },
  plugins: [],
} satisfies Config;
