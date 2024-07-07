/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ["Quicksand"],
      },
      colors: {
        "custom-color": "#333",
        "custom-color-2": "#f1356d",
        "custom-color-3": "rgba(0, 0, 0, 0.1)",
        "custom-color-4": "#fafafa",
      },
      spacing: {
        "20px": "20px",
        "6px": "6px",
        "8px": "8px",
        "10px": "10px",
      },
      maxWidth: {
        lg: "600px",
      },
      margin: {
        "16px": "16px",
        "40px": "40px",
      },
      borderRadius: {
        "8px": "8px",
      },
      boxShadow: {
        "custom-shadow": "1px 3px 5px rgba(0, 0, 0, 0.1)",
      },
      fontSize: {
        "20px": "20px",
      },
    },
  },
  plugins: [],
};
