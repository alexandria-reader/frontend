// const generateColorClass = (variable) => {
//   return ({ opacityValue }) =>
//     opacityValue
//       ? `rgba(var(--${variable}), ${opacityValue})`
//       : `rgb(var(--${variable}))`
// }

// const textColor = {
//   primary: generateColorClass('text-primary'),
//   secondary: generateColorClass('text-secondary'),
//   tertiary: generateColorClass('text-tertiary'),
// }

// const backgroundColor = {
//   primary: generateColorClass('bg-primary'),
//   secondary: generateColorClass('bg-secondary'),
//   tertiary: generateColorClass('bg-tertiary'),
// }

const textColor = {
  primary: 'var(--text-primary)',
  secondary: 'var(--text-secondary)',
  tertiary: 'var(--text-tertiary)',
  four: 'var(--text-four)',
  five: 'var(--text-five)',
  six: 'var(--text-six)',
}

const backgroundColor = {
  primary: 'var(--bg-primary)',
  secondary: 'var(--bg-secondary)',
  tertiary: 'var(--bg-tertiary)',
  four: 'var(--bg-four)',
  five: 'var(--bg-five)',
}

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
    theme: {
      extend: {
        textColor,
        backgroundColor,
        screens: {
          'betterhover': {'raw': '(hover: hover)'},
        },
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
