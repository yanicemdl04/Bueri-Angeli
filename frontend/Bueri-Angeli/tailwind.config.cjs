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
        glass: '0 20px 50px rgba(15, 23, 42, 0.35)',
        neon: '0 0 25px rgba(69, 183, 255, 0.35)'
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(circle at 10% 20%, rgba(69, 183, 255, 0.35), transparent 55%), radial-gradient(circle at 80% 0%, rgba(35, 213, 231, 0.2), transparent 55%), linear-gradient(135deg, rgba(5, 11, 22, 0.98), rgba(10, 30, 63, 0.98))'
      }
    }
  },
  plugins: []
}
