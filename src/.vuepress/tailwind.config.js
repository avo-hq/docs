module.exports = {
  purge: {

    content: [
      // "./.vuepress/theme/**/*.*",
      // './0.1/**/*.md',
    ],
    options: {
      whitelist: [],
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: '"Lato", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",  "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      },
      borderRadius: {
        xl: '1rem',
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/ui'),
  ],
}
