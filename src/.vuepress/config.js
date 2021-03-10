module.exports = {
  title: 'Avo Docs',
  description: 'Avo documentation',
  theme: '@vuepress/theme-default',
  port: 3011,
  activeHeaderLinks: true,
  head: [
    ['link', { href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&amp;display=swap", rel: "stylesheet" }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
  ],
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
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
    ['@vuepress/back-to-top'],
    [
      'vuepress-plugin-hotjar',
      {
        id: 2077263
      }
    ],
  ],
  postcss: require('./postcss.config.js'),
  themeConfig: {
    logo: `/assets/img/logo.png`,
    displayAllHeaders: true,
    docsRepo: 'avo-hq/docs',
    editLinks: true,
    editLinkText: 'Could you help us improve this page?',
    smoothScroll: true,
    collapsable: false,
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
            text: "0.5.x",
            link: "/0.5.x/"
          },
          {
            text: "0.4.x",
            link: "/0.4.x/"
          },
        ]
      }
    ],
    sidebar: {
      '/0.5.x/': [
        {
          title: 'Getting started',
          path: '/0.5.x/',
          collapsable: false,
          sidebarDepth: 0,
          children: [
            '/0.5.x/installation',
            '/0.5.x/upgrade',
            '/0.5.x/authentication',
            '/0.5.x/resources',
            '/0.5.x/fields-reference',
            '/0.5.x/grid-view',
          ]
        },
        '/0.5.x/fields',
        '/0.5.x/associations',
        {
          title: 'Filters',
          path: '/0.5.x/filters',
          sidebarDepth: 0,
        },
        {
          title: 'Actions',
          path: '/0.5.x/actions',
          sidebarDepth: 0,
        },
        '/0.5.x/authorization',
        '/0.5.x/customization',
        '/0.5.x/localization',
      ],
      '/0.4.x/': [
        {
          title: 'Getting started',
          path: '/0.4.x/',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/0.4.x/installation',
            '/0.4.x/resources',
            '/0.4.x/fields-reference',
            '/0.4.x/grid-view',
          ]
        },
        {
          title: 'Fields',
          path: '/0.4.x/fields',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/0.4.x/fields',
            '/0.4.x/relations',
          ]
        },
        {
          title: 'Filters',
          path: '/0.4.x/filters',
          collapsable: false,
          sidebarDepth: 1,
        },
        {
          title: 'Actions',
          path: '/0.4.x/actions',
          collapsable: false,
          sidebarDepth: 1,
        },
        '/0.4.x/authorization',
        {
          title: 'Customize Avo',
          path: '/0.4.x/customization',
          collapsable: false,
          sidebarDepth: 1,
          children: [
            '/0.4.x/customization',
            '/0.4.x/localization',
          ]
        },
        '/0.4.x/dashboard',
      ],
    },
  },
}
