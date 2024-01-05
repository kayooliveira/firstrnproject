/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter_100Thin'],
        interBlack: ['Inter_900Black']
      },
      colors: {
        brand: {
          primary: '#4EA8DE',
          secondary: '#5E60CE',
          input: '#262626',
          text: '#808080',
          backgroundLight: '#1A1A1A',
          backgroundDark: '#0D0D0D',
          white: '#FFFFFF'
        }
      }
    }
  },
  plugins: []
}
