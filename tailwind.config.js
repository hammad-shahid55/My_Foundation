/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.tsx", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "bg-dark":"#252628",
        "main-color": "#FFF",
        "blue-text": "#006FFD",
        "button-bg-blue": "#006FFD",
        "button-bg-white": "#FFFFFF",
        "button-bg-gray": "#F6F6F6",
        "white-text": "#FFFFFF",
        "black-text": "#070707",
        "gray-text": "#8A8A8A",
        "border-outline": "#999999",
        "field-text": "#626262",
        "field-bg": "#E8F2FF",
        "save-bg-color": "#43B0D8",
        "table-field-bg": "#EFF6FF",
        
      },
      backgroundImage: {
        "linear-gradient": "linear-gradient(to right, #43B0D8, #78C45E)",
      },
    },
  },
  plugins: [],
};