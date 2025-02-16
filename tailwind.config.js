/** @type {import('tailwindcss').Config} */
import daisyui  from 'daisyui';

export default {
  darkMode: 'class', // Enable class-based dark mode

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-golden': '#f9f2e8', 
        // 'light-golden': '#f70h80', 
         "golden": '#f5c518',
        'golden-dark': '#f4b400',
        'amber': {
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#eab308',
          700: '#ca8a04',
          800: '#a16207',
          900: '#854d0e',
        },
      },
    },
  },
  plugins: [
    daisyui,
  ],
}

