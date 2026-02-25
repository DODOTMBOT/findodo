import { heroui } from "@heroui/react";

const config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}", // Добавить это
  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [heroui()], // Добавить это
};
export default config;