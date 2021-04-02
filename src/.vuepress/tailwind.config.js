module.exports = {
  purge: {
    content: [
      "./components/**/*.*",
      "./theme/**/*.*",
      "./.vuepress/components/**/*.*",
      "./.vuepress/theme/**/*.*",
      ".vuepress/components/**/*.*",
      ".vuepress/theme/**/*.*",
      ".vuepress/components/**/*.vue",
      ".vuepress/theme/**/*.vue",
      './0.4.x/**/*.md',
      './1.0/**/*.md',
    ],
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
  plugins: [],
}
