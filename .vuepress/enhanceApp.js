export default ({ Vue, router, options }) => {
  router.addRoutes([
    { path: '/', redirect: '/0.1' }
  ])
}