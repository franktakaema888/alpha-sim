// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E293B', // dark blue-gray
        secondary: '#334155', // lighter blue-gray
        accent: '#3B82F6', // bright blue
        background: '#F8FAFC', // light gray
      }
    },
  },
  plugins: [],
}
