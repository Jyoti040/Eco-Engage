/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        primaryGreen :'#4caf50',
        secondaryDarkGreen : '#388e3c',
        accentLightGreen : '#c8e6c9',
        accentYellow : '#ffeb3b',
        neutralGray : '#607D8B', 
        oliveGreen :'#556B2F',
        // '#a9a9a9'  #bebebe  #B0BEC5  #37474F  #607D8B
      },
      keyframes: {
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '50%': { transform: 'translateX(-50%)', opacity: 0.5 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideIn7: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '50%': { transform: 'translateX(-50%)', opacity: 0.5 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        slideIn9: {
          '0%': { transform: 'translateX(-100%)', opacity: 0 },
          '50%': { transform: 'translateX(-50%)', opacity: 0.5 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
        // typewriter: {
        //   '0%': { width: '0%' },
        //   '100%': { width: '100%' },
        // },
        // blink: {
        //   '50%': { borderColor: 'transparent' },
        //   '100%': { borderColor: 'white' },
        // },

      },
      animation: {
        slideIn: 'slideIn 0.5s ease-out forwards',
        slideIn7: 'slideIn7 0.7s ease-out forwards',
        slideIn9: 'slideIn9 0.9s ease-out forwards',
        // blink: 'blink 1s step-end infinite',
        // typewriter: 'typewriter 3s steps(30, end) infinite',

      },
    },
  },
  plugins: [],
}

