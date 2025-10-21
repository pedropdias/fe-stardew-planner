/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        stardewSimple: ["var(--font-stardew-simple)", "sans-serif"],
        stardewMain: ["var(--font-stardew-main)", "sans-serif"],
      },
      colors: {
        cardBackground: "var(--card-background)",
      },
    },
  },
  plugins: [],
}