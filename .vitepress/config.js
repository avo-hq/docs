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
    // sidebar: [
    //   {
    //     title: 'Getting started',
    //     path: '/',
    //     collapsable: false,
    //     sidebarDepth: 1,
    //     children: [
    //       '/',
    //       '/new',
    //     ]
    //   },
    //   {
    //     title: 'Fields',
    //     path: '/fields/',
    //     collapsable: false,
    //     children: [
    //       ['/fields/text', 'Text field']


    //     ]
    //   },
    // ],
    // sidebar: 'auto',
    // sidebar: [
    //   {
    //     title: 'Group 1',   // required
    //     path: '/foo/',      // optional, link of the title, which should be an absolute path and must exist
    //     collapsable: false, // optional, defaults to true
    //     sidebarDepth: 1,    // optional, defaults to 1
    //     children: [
    //       '/'
    //     ]
    //   },
    // ]
  },
}
