/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B4571', // Lucas Fox deep blue
          light: '#2A5C8F',
          dark: '#0F2943',
        },
        secondary: {
          DEFAULT: '#C5A572', // Gold accent
          light: '#D4BC94',
          dark: '#AA8B52',
        },
        neutral: {
          DEFAULT: '#F5F5F5',
          dark: '#333333',
          light: '#FFFFFF',
        },
        accent: {
          DEFAULT: '#E6E6E6', // Light gray for subtle accents
          dark: '#999999',
          light: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
}
