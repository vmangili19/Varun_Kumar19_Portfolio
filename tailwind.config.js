/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}", // Adjust this path based on your actual file structure
    "./components/**/*.{js,ts,jsx,tsx}", // If you have components in a separate folder
    "./public/**/*.html", // If you have HTML files in the public folder
  ],
  theme: {
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')],
};