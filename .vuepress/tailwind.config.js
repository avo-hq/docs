module.exports = {
  purge: [
    "./.vuepress/theme/**/*.*",
    // "./!(node_modules)/**/*.md",
    // "./*.md",
    './0.1/**/*.md',
    // './vuepress/dist/**/*.*',
  ],
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
  variants: {},
  plugins: [],
}
