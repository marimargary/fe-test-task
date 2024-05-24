/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    },
    colors: {
      'main': '#FB9300',
      'grey-900': '#212121', 
      'grey-800': '#424242 ', 
      'grey-700': '#616161',
      'grey-600': '#757575',
      'grey-500': '#9E9E9E',
      'grey-400': '#BDBDBD',
      'grey-300': '#E0E0E0',
      'grey-200': '#EEEEEE',
      'grey-100': '#F5F5F5',
      'red': '#EF0107 ',
    },
    borderWidth: {
      '1': '1px'
    },
    boxShadow: {
      'form': 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px',
    },
    fontFamily: {
      'roboto': 'Roboto',
    },
  },
  plugins: [],
}

