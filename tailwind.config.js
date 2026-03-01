/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#e9f7ff',
          100: '#cdeeff',
          200: '#9fdcff',
          300: '#6bc7f2',
          400: '#39b0e0',
          500: '#1f93c7',
          600: '#1777a3',
          700: '#125e81',
          800: '#0d4560',
          900: '#082f42',
        },
        pineapple: {
          200: '#ffe6a3',
          400: '#ffd064',
          600: '#e2a82f',
          800: '#b67f18',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Manrope"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 20px 60px rgba(8, 38, 58, 0.35)',
      },
    },
  },
  plugins: [],
}
