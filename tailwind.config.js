/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extends: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

