import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0366d6",
        secondary: "#24292e",
        accent: "#f6f8fa",
        error: "#d73a49",
        success: "#28a745",
        warning: "#ffcc00",
        gray: {
          100: "#f6f8fa",
          200: "#e1e4e8",
          300: "#d1d5da",
          400: "#999",
          500: "#6a737d",
          600: "#4f545c",
          700: "#3c4043",
          800: "#24292e",
          900: "#161b22",
        },
      },
      boxShadow: {
        md: "0 3px 6px rgba(0, 0, 0, 0.1)",
        lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
        xl: "0 20px 25px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;
