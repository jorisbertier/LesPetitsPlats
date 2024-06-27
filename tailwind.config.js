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
        'secondary-color': '#7A7A7A',
        'customGrey': '#C6C6C6',
      },
      backgroundColor: {
        'primary-color': '#FFD15B',
        'secondary-color': '#7A7A7A'
      },
      screens: {
        'max-xl': {'max': '1280px'},
        'min-xl': {'min': '1280px'},
        'max-lg': {'max': '1024px'},
        'max-860': {'max': '860px'},
        'max-800': {'max': '800px'},
        'max-md': {'max': '768px'},
        'max-690': {'max': '690px'},
        'max-sm': {'max': '640px'},
        'max-570': {'max': '570px'},
        'max-500': {'max': '500px'},
        'max-426': {'max': '426px'},
        'max-400': {'max': '400px'},
        'max-375': {'max': '375px'},
        'max-350': {'max': '350px'},
      },
    },
  },
  plugins: [],
}

