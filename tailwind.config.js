module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    theme: {
      extend: {
        screens: {
          'betterhover': {'raw': '(hover: hover)'},
        },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
