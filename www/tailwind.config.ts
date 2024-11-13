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
        warning: "var(--warning)",
        success: "var(--success)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        header: "var(--header)",
        ibackground: "var(--inner-background)",
      },
      fontFamily: {
        righteous: ['var(--font-righteous)'],
        geist: ['var(--font-geist-mono)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
