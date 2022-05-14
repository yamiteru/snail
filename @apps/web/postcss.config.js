module.exports = {
  purge: ['./index.html', './src/**/*.{ts,tsx}'],
  plugins: {
    "postcss-import": {},
    "tailwindcss/nesting": {},
    tailwindcss: {},
    autoprefixer: {},
  },
};