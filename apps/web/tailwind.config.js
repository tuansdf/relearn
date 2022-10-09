/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      aspectRatio: {
        "2/1": "2/1",
      },
    },
    container: {
      center: true,
      padding: "1rem",
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    darkTheme: "garden",
    lightTheme: "garden",
  },
};
