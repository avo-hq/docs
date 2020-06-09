module.exports = {
  title: 'Hello VitePress',
  description: 'Just playing around',
  port: 3010,
  // activeHeaderLinks: false, // Default: true
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Resources', link: '/resources' },
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


