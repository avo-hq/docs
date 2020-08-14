module.exports = {
  title: 'Avo Docs',
  description: 'Avo documentation',
  theme: '@vuepress/theme-default',
  port: 3011,
  activeHeaderLinks: true,
  head: [
    ['link', {href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&amp;display=swap", rel: "stylesheet"}],
  ],
  extraWatchFiles: [
    './0.1/**/*'
  ],
  plugins: [
    [
      '@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true
      }
    ],
    ['vuepress-plugin-code-copy'],
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-174545089-1'
      }
    ],
    ['@silvanite/tailwind'],
  ],
  themeConfig: {
    logo: `/assets/img/logo.png`,
    displayAllHeaders: true,
    repo: 'AvocadoHQ/avo',
    docsRepo: 'AvocadoHQ/docs',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
    smoothScroll: true,
    sidebarDepth: 1,
    nav: [
      {
        text: 'Home',
        link: 'https://avohq.io'
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
          sidebarDepth: 1,
          children: [
            '/0.1/resources',
            '/0.1/fields-reference',
            '/0.1/grid-view',
          ]
        },
        {
          title: 'Fields',
          path: '/0.1/fields',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/0.1/fields',
            '/0.1/relations',
          ]
        },
        {
          title: 'Filters',
          path: '/0.1/filters',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/0.1/filters',
          ]
        },
        '/0.1/dashboard',
      ],
    },
  },
}
