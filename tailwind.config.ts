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

      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },

      backgroundImage: {
        'blue-green': 'linear-gradient(to right, #3b82f6, #10b981)',
      },
    },
  },
  plugins: [],
}
