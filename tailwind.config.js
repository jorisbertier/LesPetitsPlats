/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",,
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        anton: ['Anton', 'sans-serif'],
        manrope: ['Manrope', 'sans-serif']
      },
      width: {
        '60%': '60%', // 60%
        '50px': '50px', // 576px
        '160': '40rem', // 640px
        '192': '48rem', // 768px
      },
      backgroundImage: {
        'header-image': "url('/src/img/lampos-aritonang-24gR_9lCdes-unsplash.jpg')",
      },
      height: {
        '500': '500px',
        '700': '700px',
      },
      colors: {
        'primary-color': '#FFD15B',
        'secondary-color': '#7A7A7A'
      },
      backgroundColor: {
        'primary-color': '#FFD15B',
        'secondary-color': '#7A7A7A'
      }
    },
  },
  plugins: [],
}

