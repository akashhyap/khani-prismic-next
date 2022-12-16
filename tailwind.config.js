module.exports = {
  content: ["./pages/**/*.js", "./components/**/*.js", "./slices/**/*.js"],
  theme: {
    fontFamily: {
      primary:['Questrial', 'sans-serif'],
      secondary:['Poppins', 'sans-serif']
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
