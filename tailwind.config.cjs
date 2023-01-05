/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      fontSize: {
        xxs: 12,
        xs: 14,
        sm: 16,
        md: 18,
        large: 20,
        xl: 24,
        '2xl': 32,
      },

      colors: {
        transparent: 'transparent',

        black: '#000000',

        overlay: 'rgba(0, 0, 0, 0.75)',

        gray: {
          350: '#a0a7b2',
          500: '#A0A9C6',
          600: '#888EA5',
          650: '#7e8499',
          750: '#41414e',
          800: '#35353f',
        },

        blue: {
          300: '#3f709d',
          400: '#38648c',
          900: '#d79037',
        },

        white: '#FFFFFF',
      },
      fontFamily: {
        sans: 'Poppins, sans-serif',
      },
    },
  },
  plugins: [require('daisyui')],

  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#3f709d',
          neutral: '#A0A9C6',
          'base-100': '#ffffff',
        },
      },
    ],
  },
}
