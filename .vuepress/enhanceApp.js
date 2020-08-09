import pageComponents from '@internal/page-components'

export default ({ Vue, router, options }) => {
  router.addRoutes([
    { path: '/', redirect: '/0.1' }
  ])

  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }
}
