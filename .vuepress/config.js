function buildMenu() {
  const menu = []


  return menu
}

module.exports = {
  title: 'Avocado documentation',
  description: 'Avocado documentation',
  port: 3011,
  activeHeaderLinks: true,
  markdown: {
    toc: {},
  },
  // extraWatchFiles: [
  //   './0.1/**/*'
  // ],

  plugins: [
    '@vuepress/pwa',
  ],
  themeConfig: {
    displayAllHeaders: true,
    sidebarDepth: 2,
    nav: [
      { text: 'Home', link: '/0.1/index.html' },
    ],
    sidebar: {
      '/0.1/': [
        {
          title: 'Getting started',
          path: '/0.1/',
          collapsable: false,
          sidebarDepth: 4,
          children: [
            '/0.1/resources',
            '/0.1/fields-reference',
          ]
        },
        {
          title: 'Fields',
          path: '/0.1/fields',
          collapsable: false,
          sidebarDepth: 4,
          children: [
            '/0.1/fields',
            '/0.1/relations',
          ]
        }
      ],
    },
  },
}
