import type { Config } from 'tailwindcss';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      colors: {
        digi: {
          purple: {
            DEFAULT: '#534AB7',
            light: '#7F77DD',
            bg: '#EEEDFE',
            dark: '#3C3489',
            border: '#AFA9EC',
          },
          bg: '#EBF5F0',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
          admin: {
            bg: '#5EEAD4',
            text: '#0F766E',
          },
          teacher: {
            bg: '#DDD6FE',
            text: '#5B21B6',
          },
        },
      },
      borderRadius: {
        'card': '16px',
        'pill': '24px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.25s ease-out forwards',
        'scale-in': 'scaleIn 0.2s ease-out forwards',
      },
    },
  },
  plugins: [],
} satisfies Config;
