/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Source Sans Pro', 'sans-serif'],
        serif: ['Source Serif Pro', 'serif'],
      },

      colors: {
        background: '#F2EBDC',
        primary: '#463B24',
        dark: '#1A1A1A',
        accent: '#FD900F',
        grayed: '#828082',
      },
    },
  },
  plugins: [],
}
