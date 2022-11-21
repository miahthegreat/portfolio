/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: "marquee 25s linear alternate infinite",
      },
      fontFamily: {
        fira: ["Fira Sans"],
        poppins: ["Poppins"],
        plexmono: ["Syne Mono"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-25%)" },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("prettier-plugin-tailwindcss"),
    require("@headlessui/tailwindcss"),
  ],
  darkMode: "class",
};
