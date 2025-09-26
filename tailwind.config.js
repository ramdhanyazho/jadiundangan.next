/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Dancing Script', 'cursive']
      },
      colors: {
        brand: {
          DEFAULT: '#0E356B',
          gold: '#C7A252',
          emerald: '#0EA57A'
        }
      }
    },
  },
  plugins: [],
}
