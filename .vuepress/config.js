module.exports = {
  title: 'Docs',
  description: 'Avo documentation',

  port: 3011,
  activeHeaderLinks: true,
  extraWatchFiles: [
    './0.1/**/*'
  ],
  plugins: [
    '@vuepress/pwa',
    ['vuepress-plugin-code-copy', {
      align: 'top',
      staticIcon: true
    }],
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-174545089-1'
      }
    ]
  ],
  themeConfig: {
    logo: `/assets/img/logo.png`,
    displayAllHeaders: true,
    sidebarDepth: 2,
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
          sidebarDepth: 4,
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
          sidebarDepth: 4,
          children: [
            '/0.1/fields',
            '/0.1/relations',
          ]
        },
        {
          title: 'Filters',
          path: '/0.1/filters',
          collapsable: false,
          sidebarDepth: 4,
          children: [
            '/0.1/filters',
          ]
        }
      ],
    },
  },
}
