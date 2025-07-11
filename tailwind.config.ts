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
          900: '#004E52',
          800: '#006C72',
          700: '#007F88',
          600: '#019CA3',
          500: '#00B8BF',
          100: '#D0F1F3',
          50: '#E6FAFB',
        },

        // Semantic colors
        success: '#4ade80',  // green-400
        error: '#f87171',    // red-400
        muted: '#6b7280',    // gray-500
        card: '#ffffff',
        background: '#f9f9f9',

        // Custom alias
        primary: '#007F88',
      },

      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },

      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },

      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.04)',
      },

      spacing: {
        sidebar: '72px',
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
        // Gradients
        'blue-green': 'linear-gradient(to right, #3b82f6, #10b981)',
        'radiant-blue': 'linear-gradient(to right, #3b82f6, #1e3a8a)',

        // ✅ Teal Dashboard Gradient
        'dashboard-teal': 'linear-gradient(to right, rgba(0,126,133,0.33) 0%, rgba(0,126,133,0.34) 39%, rgba(0,126,133,1) 100%)',
      },
    },
  },
  plugins: [],
}
