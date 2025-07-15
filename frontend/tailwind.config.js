/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
  extend: {
    backgroundImage: {
      'dark-gradient': 'linear-gradient(135deg, #0f172a 0%, #111827 100%)',
    },
  },
},
  plugins: [],
}
