/** @type {import('tailwindcss').Config} */
const BASE = 16; // your base size

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        WineBerry: "#A30D27",
        LightningYellow: "#FEBB15",
        gray: "#C4C4C4",
        White60: "#F2F2F2",
        Sub_Blues: "#82B0F4",
        Black_80: "#6D6D6D",
        Blue_Main: "#3478F6",
      },
    },
  },
  plugins: [],
};
