function buildMenu() {
  const menu = []


  return menu
}

module.exports = {
  title: 'Docs',
  description: 'Avocado documentation',
  port: 3011,
  activeHeaderLinks: true,
  extraWatchFiles: [
    './0.1/**/*'
  ],
  plugins: [
    '@vuepress/pwa',
  ],
  themeConfig: {
    logo: `/assets/img/logo.png`,
    displayAllHeaders: true,
    sidebarDepth: 2,
    nav: [
      {
        text: 'Home',
        link: '/0.1/index.html'
      },
      {
        text: 'Version',
        link: '/',
        items: [
          {
            text: "0.1",
            link: "/0.1/"
          }
        ]
      }
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
