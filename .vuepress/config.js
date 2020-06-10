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
  themeConfig: {
    nav: [
      { text: 'Home', link: '/0.1/index.html' },
    ],
    sidebar: [
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
    ]
    // }
      // {
      //   title: 'Getting started',
      //   path: '/0.1/',
      //   // collapsable: false,
      //   // sidebarDepth: 1,
      //   // children: [
      //   //   '/',
      //   //   '/new',
      //   // ]
      // },
      // {
      //   title: 'Fields',
      //   path: '/0.1/fields/',
      //   // collapsable: false,
      //   // children: [
      //   //   ['/fields/text', 'Text field']
      //   // ]
      // },
    // },
  },
}
