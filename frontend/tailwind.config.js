
/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
import tailwindScrollbar from "tailwind-scrollbar";
import daisyUIThemes from "daisyui/src/theming/themes";
export default {
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
theme: {
extend: {},
},
plugins: [daisyui, tailwindScrollbar],
daisyui: {
themes: [
"light",
"retro",
"coffee",
"emerald",
"valentine",
{
dark: {
...daisyUIThemes["dark"],
primary: "rgb(29, 155, 240)",
secondary: "rgb(24, 24, 24)",
},
},
],
},
};