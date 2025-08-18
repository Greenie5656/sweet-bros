/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sweet Bros color palette
        'white': {
          DEFAULT: '#ffffff',
          100: '#333333',
          200: '#666666', 
          300: '#999999',
          400: '#cccccc',
          500: '#ffffff',
          600: '#ffffff',
          700: '#ffffff',
          800: '#ffffff',
          900: '#ffffff'
        },
        'phlox': {
          DEFAULT: '#dd18fe',
          100: '#2f0038',
          200: '#5f0170',
          300: '#8e01a7',
          400: '#be01df',
          500: '#dd18fe',
          600: '#e348fe',
          700: '#ea76fe',
          800: '#f1a4ff',
          900: '#f8d1ff'
        },
        'red': {
          DEFAULT: '#ff000c',
          100: '#330003',
          200: '#660005',
          300: '#990008',
          400: '#cc000a',
          500: '#ff000c',
          600: '#ff333d',
          700: '#ff666e',
          800: '#ff999e',
          900: '#ffcccf'
        },
        'yellow_green': {
          DEFAULT: '#9fd600',
          100: '#202b00',
          200: '#405600',
          300: '#608100',
          400: '#81ab00',
          500: '#9fd600',
          600: '#c4ff12',
          700: '#d3ff4e',
          800: '#e1ff89',
          900: '#f0ffc4'
        },
        'dodger_blue': {
          DEFAULT: '#0495ff',
          100: '#001e34',
          200: '#003d68',
          300: '#005b9c',
          400: '#0079d0',
          500: '#0495ff',
          600: '#37acff',
          700: '#69c1ff',
          800: '#9bd5ff',
          900: '#cdeaff'
        }
      },
      fontFamily: {
        'marble': ['Marble', 'system-ui', 'sans-serif'],
        'sans': ['Nunito', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        'light': 300,
        'extrabold': 800,
      },
      
animation: {
  'float': 'float 3s ease-in-out infinite',
},
keyframes: {
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-6px)' },
  }
}
    },
  },
  plugins: [],

  
}