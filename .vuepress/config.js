module.exports = {
  title: 'Avocado',
  description: 'Avocado documentation',
  port: 3011,
  activeHeaderLinks: false,
  markdown: {
    toc: {},
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Resources', link: '/resources' },
      { text: 'Fields reference', link: '/fields-reference' },
      { text: 'Fields', link: '/fields' },
    ],
    sidebar: [
      {
        title: 'Getting started',
        path: '/',
        collapsable: false,
        sidebarDepth: 1,
        children: [
          '/',
          '/new',
        ]
      },
      {
        title: 'Fields',
        path: '/fields/',
        collapsable: false,
        children: [
          ['/fields/text', 'Text field']
        ]
      },
    ],
    sidebar: 'auto',
  },
}
