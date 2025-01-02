/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "main-bg" : '#fff',
        "card-bg" : '#e1e1e1  ',
        "secondary-bg" : "#fff3e6"
      }
    },
  },
  plugins: [],
}