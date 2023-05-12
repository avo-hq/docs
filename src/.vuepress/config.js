const recipes1 = require('./getRecipes1')
const recipes2 = require('./getRecipes2')

const recipeChildren1 = recipes1.reverse().map((file) => `/1.0/recipes/${file.replace('.md', '')}`)
const recipeChildren2 = recipes2.reverse().map((file) => `/2.0/recipes/${file.replace('.md', '')}`)

module.exports = {
  title: 'Avo Admin for Rails | Documentation',
  description: 'The most beautiful, easy-to-use Ruby on Rails admin framework',
  theme: '@vuepress/theme-default',
  port: 3011,
  activeHeaderLinks: true,
  head: [
    ['link', { href: "https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&amp;display=swap", rel: "stylesheet" }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { name: 'monetization', content: '$ilp.uphold.com/HmDUzP4NWA62' }],
  ],
  plugins: [
    ['@vuepress/search', {
      test: '/2\.0/'
    }],
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
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
    docsDir: 'src',
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
            text: "2.0",
            link: "/2.0/"
          },
          {
            text: "1.0",
            link: "/1.0/"
          },
          {
            text: "0.4.x",
            link: "/0.4.x/"
          },
        ]
      }
    ],
    sidebar: {
      '/2.0/': [
        {
          title: 'Getting started',
          path: '/2.0/',
          collapsable: false,
          sidebarDepth: 0,
          children: [
            '/2.0/installation',
            '/2.0/authentication',
            '/2.0/licensing',
            '/2.0/upgrade',
            '/2.0/grid-view',
            '/2.0/recipes',
            '/2.0/faq',
          ]
        },
        '/2.0/resources',
        '/2.0/field-options',
        '/2.0/fields',
        '/2.0/associations',
        {
          title: 'Tabs and panels',
          path: '/2.0/tabs',
          sidebarDepth: 0,
        },
        {
          title: 'Menu editor',
          path: '/2.0/menu-editor',
          sidebarDepth: 0,
        },
        {
          title: 'Dashboards',
          path: '/2.0/dashboards',
          sidebarDepth: 0,
        },
        {
          title: 'Cards',
          path: '/2.0/cards',
          sidebarDepth: 0,
        },
        '/2.0/search',
        {
          title: 'Filters',
          path: '/2.0/filters',
          sidebarDepth: 0,
        },
        {
          title: 'Actions',
          path: '/2.0/actions',
          sidebarDepth: 0,
        },
        '/2.0/customization',
        '/2.0/custom-tools',
        '/2.0/custom-fields',
        '/2.0/resource-tools',
        '/2.0/custom-asset-pipeline',
        '/2.0/authorization',
        '/2.0/localization',
        '/2.0/stimulus-integration',
        '/2.0/evaluation-hosts',
        '/2.0/faq',
        {
          title: 'Recipes & guides',
          path: '/2.0/recipes',
          sidebarDepth: 0,
          collapsable: false,
          children: recipeChildren2
        },
      ],
      '/1.0/': [
        {
          title: 'Getting started',
          path: '/1.0/',
          collapsable: false,
          sidebarDepth: 0,
          children: [
            '/1.0/installation',
            '/1.0/authentication',
            '/1.0/licensing',
            '/1.0/upgrade',
            '/1.0/grid-view',
            '/1.0/recipes',
            '/1.0/faq',
          ]
        },
        '/1.0/resources',
        '/1.0/field-options',
        '/1.0/fields',
        '/1.0/associations',
        '/1.0/search',
        {
          title: 'Filters',
          path: '/1.0/filters',
          sidebarDepth: 0,
        },
        {
          title: 'Actions',
          path: '/1.0/actions',
          sidebarDepth: 0,
        },
        '/1.0/customization',
        '/1.0/custom-tools',
        '/1.0/custom-fields',
        '/1.0/custom-asset-pipeline',
        '/1.0/authorization',
        '/1.0/localization',
        '/1.0/stimulus-controllers',
        '/1.0/faq',
        {
          title: 'Recipes & guides',
          path: '/1.0/recipes',
          sidebarDepth: 0,
          collapsable: false,
          children: recipeChildren1
        },
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
