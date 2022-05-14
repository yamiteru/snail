module.exports = {
  content: [
    './index.html',
    './src/**/*.{ts,tsx,css,html}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ["SF Pro", "San Francisco Pro", "Helvetica Neue", "Helvetica", "sans-serif"],
        text: ["SF Compact", "San Francisco Compact", "Helvetica Neue", "Helvetica", "sans-serif"],
      }
    },
  },
  plugins: [],
};