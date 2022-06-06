import pageComponents from '@internal/page-components'
/**
 * Client app enhancement file.
 *
 * https://v1.vuepress.vuejs.org/guide/basic-config.html#app-level-enhancements
 */

export default ({
  Vue, // the version of Vue being used in the VuePress app
  options, // the options for the root Vue instance
  router, // the router instance for the app
  siteData // site metadata
}) => {
  router.addRoutes([
    { path: '/', redirect: '/2.0' },
    { path: '/0.x/*', redirect: '/1.0' },
    { path: '/0.1/*', redirect: '/0.4.x' },
    { path: '/1.0/fields-reference', redirect: '/1.0/field-options' },
    { path: '/1.0/rest-api-integration', redirect: '/1.0/recipes/rest-api-integration' },
    { path: '/2.0/stimulus-controllers', redirect: '/2.0/custom-fields.html#use-pre-built-stimulus-controllers' },
  ])

  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }
}
