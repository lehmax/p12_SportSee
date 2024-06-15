/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: [
        '"Roboto"',
        'ui-sans-serif',
        'system-ui',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
      ],
    },
    colors: {
      gray: 'var(--color-grey)',
      greyLight: 'var(--grey-light)',
      greyDark: 'var(--grey-dark)',
      red: 'var(--red)',
      redLight: 'var(--red-light)',
      redDark: 'var(--red-dark)',
      redDark2: 'var(--red-dark2)',
      blue: 'var(--blue)',
      blueDark: 'var(--blue-dark)',
      blueLight: 'var(--blue-light)',
      yellow: 'var(--yellow)',
      yellowLight: 'var(--yellow-light)',
      magenta: 'var(--magenta)',
      magentaLight: 'var(--magenta-light)',
      black: 'var(--black)',
      white: 'var(--white)',
    },
  },
  plugins: [],
}
