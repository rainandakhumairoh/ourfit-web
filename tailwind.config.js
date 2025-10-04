/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FFEBC8',     // warna utama
        white: '#FFFFFF',
        pink1: '#CB5252',   
        pink2: '#D98282',        
        pink3: '#DB9F9F',
        pink4: '#FFC5C5',
        oren1: '#FFC692',   
        oren2: '#F5B072',        
        oren3: '#E99C58',
        coklat: '#C7752E',
      },
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
    },
  },
  plugins: [],
}

