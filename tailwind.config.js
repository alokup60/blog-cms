/** @type {import('tailwindcss').Config} */
import { colors } from "tailwindcss/colors";
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
  plugins: [],
};
