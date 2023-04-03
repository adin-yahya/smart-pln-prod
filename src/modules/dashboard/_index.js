const module = {
  config: {
    name: 'dashboard',
    icon: 'ri-apps-line',
    desc: 'Dashboard Potensi issue dan rekomendasi mitigasi Pusmanpro',
    layout: true
  },
  routes: [
    { name: 'dashboard', label: 'Dashboard SMART', icon: 'ri-database-2-fill', path: '/dashboard', component: () => import('./dashboard.vue') }
  ]
}
export default module
