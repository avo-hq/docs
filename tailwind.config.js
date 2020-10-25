module.exports = {
  future: {
    // purgeLayersByDefault: true,
    removeDeprecatedGapUtilities: true,
    standardFontWeights: true,
  },
  purge: {
    // mode: 'layers',
    // layers: ['components', 'utilities'],
    content: [
      "./.vuepress/theme/**/*.*",
      './0.1/**/*.md',
    ],
    options: {
      whitelist: [],
    },
  },
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
  plugins: [
    require('@tailwindcss/ui'),
  ]
}
