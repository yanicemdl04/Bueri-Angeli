/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'sky-blue': '#6EC1FF',
        'turquoise': '#23D5E7',
        'deep-blue': '#0A1E3F',
        'mid-blue': '#124A88',
        'neon-blue': '#45B7FF',
        'midnight': '#050B16'
      },
      boxShadow: {
        glass: '0 20px 50px rgba(15, 23, 42, 0.35)'
      }
    }
  },
  plugins: []
}
