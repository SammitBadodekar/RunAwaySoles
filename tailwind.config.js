/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        light: ["white"],
        dark: ["black"],
        menu: ["hsla(114, 61%, 94%, 0.135)"],
        navbar: ["#0c134f"] /* #7158bb */,
        gradient1: ["radial-gradient(circle at top left, dark,menu)no-repeat"],
      },
      fontFamily: {
        logo: ["Darumadrop One", "cursive"],
        heading: ["Bruno Ace", "cursive"],
        paragraph: ["Roboto Mono", " monospace"],
      },
    },
  },
  plugins: [],
};
