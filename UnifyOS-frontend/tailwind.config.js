/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a", // Navy Blue for a professional look
        accent: "#3b82f6",  // CareOps Blue
      },
    },
  },
  plugins: [],
}