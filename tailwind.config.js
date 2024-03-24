/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-gunmetal": "#20212c",
        "alice-blue": "#f4f7fd",
        gunmetal: "#2b2c37",
        montage: "#828fa3",
      },
      maxWidth: {
        180: "11.25rem",
        416: "26rem",
      },
      width: {
        34: "2.125rem",
      },
      height: {
        34: "2.125rem",
      },
      margin: {
        256: "16rem",
      },
    },
  },
  plugins: [],
};
