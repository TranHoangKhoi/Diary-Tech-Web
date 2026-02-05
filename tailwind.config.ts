/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./configs/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#186F41",
        subPrimary: "#B0D1E4",
        background: "#FFFFFF",
        secondary: "#F5F6FA",
        accent: "#4F46E5",
        danger: "#EF4444",
        success: "#22C55E",
        black: "#333333",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
