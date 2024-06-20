/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {height: {
        '128': '32rem',
        '500': '500px',
        '700': '700px'
      }},
  },
  plugins: [],
}