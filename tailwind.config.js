// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#fefefe",
        baseDark: "#474451",
        baseBlue: "#4e6e89",
        accentRed: "#e96d60",
        accentTeal: "#4daf9f",
        accentYellow: "#ebc138",
        grayLight: "#ced0d0",
        accentBeige: "#d8b09e",
        borderBeige: "#78716B",
        mordalSubInfo: "#D6D3D1",
        avgLine: "#C2BBB5",
        chartLine: "#78716B",
        modalBaseFont: "#312821",
        modalBaseFont_pale: "#78716B",
        cardBaseFont: "#312821",
        cardBaseFont_pale: "#78716B",
        cardBaseFont_palemore: "#76716C",
        cardLinkFont: "#386FAA",
      },
      fontFamily:{
        kosugi : ["Kosugi", "sans-serif"],
        noto : ["Noto Sans JP", "sans-serif"],
      },
      keyframes: {
        growBar: {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
      animation: {
        growBar: 'growBar 0.7s ease-out forwards',
      },
    },
  },
  plugins: [],
};