import pageComponents from '@internal/page-components'

export default ({ Vue, router, options }) => {
  for (const [name, component] of Object.entries(pageComponents)) {
    Vue.component(name, component)
  }
}
