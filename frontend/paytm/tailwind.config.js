/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'bgcolor':"#f5f7fa",
        'dblue':"#002E6E",
        'lblue':"#00B9F1"
      }
    },
  },
  plugins: [],
}
