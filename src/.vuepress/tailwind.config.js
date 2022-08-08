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
      './../0.4.x/**/*.md',
      './../1.0/**/*.md',
      '0.4.x/**/*.md',
      '1.0/**/*.md',
    ],
    options: {
      safelist: ['border', 'rounded-md', 'bg-blue-50', 'p-4', 'flex', 'flex-shrink-0', 'h-5', 'w-5', 'text-blue-400', 'ml-3', 'flex-1', 'md:flex', 'md:justify-between', 'text-sm', 'leading-5', 'text-blue-700', 'underline', 'bg-yelow-50', 'text-yelow-400', 'text-yelow-700', 'rounded', 'bg-purple-600', 'hover:bg-purple-500', 'text-white', 'no-underline', 'px-2', 'py-1', 'inline', 'leading-none', 'mt-2', 'bg-green-600', 'hover:bg-green-500', "bg-white", "w-full", "mx-auto", "py-12", "text-center", "text-base", "font-semibold", "uppercase", "text-gray-600", "tracking-wider", "mt-6", "grid", "grid-cols-2", "gap-0.5", "md:grid-cols-3", "lg:mt-8", "col-span-1", "flex", "justify-center", "py-8", "px-8", "bg-gray-50", "max-h-12", "opacity-30", "flex-grow-0", "rounded-md", "border", "border-blue-500", "px-4", "bg-blue-700"],
    }
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
