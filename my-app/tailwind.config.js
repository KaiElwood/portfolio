/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        backblack: '#000000c4',
      },
      typography: {
        DEFAULT: {
          css: {
            lineHeight: '1.625',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
