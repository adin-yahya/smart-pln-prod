const module = {
  config: {
    name: 'my-action',
    icon: 'ri-notification-3-line',
    desc: 'An powerfull module list',
    layout: true
  },
  routes: [
    { name: 'my-action', icon: 'ri-database-2-fill', path: '/my-action', component: () => import('./my-action.vue') }
  ]
}
// ri-funds-line
export default module
