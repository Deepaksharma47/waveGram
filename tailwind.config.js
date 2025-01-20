/** @type {import('tailwindcss').Config} */
export default {
  content: [
     "./index.html",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary:"#3E5677",
        customBlue: '#5BE4EC',
        headingColor:"#FFF9E4",
        linkText:"#B18D4B",
        yellowLion:"#BEA16E",
        darkYellowLion:"#93794D",
        lightGray:"#929292",
        grayBackground:"#f4f5fa",
        greenAcc:"#49A15C",
        pending:"#B18D4B",
        grayCard:"#EEF5F6",
      },
      fontFamily: {
        nunito: ['Nunito','sans-sarif']
      }
    },
  },
  plugins: [],
}

