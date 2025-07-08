/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand Teal Shades
        teal: {
          700: '#007F88',
          600: '#019CA3',
          500: '#00B8BF',
          100: '#D0F1F3',
          50: '#E6FAFB',
        },

        // Custom alias for primary usage
        primary: '#007F88',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
