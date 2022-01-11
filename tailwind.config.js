module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    theme: {
      extend: {
        screens: {
          'betterhover': {'raw': '(hover: hover)'},
        },
        fontFamily: {
          'source': ['Source Serif Pro'],
        },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
