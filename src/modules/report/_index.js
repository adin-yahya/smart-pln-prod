const module = {
  config: {
    name: 'potensi-isu',
    icon: 'ri-funds-line',
    desc: 'Pengelolaan Laporan Potensi isu dan rekomendasi mitigasi Pusmanpro',
    layout: true
  },
  routes: [
    { name: 'potential-issues', label: 'Pelaporan Potensi Isu', icon: 'ri-database-2-fill', path: '/potential-issues', component: () => import('./potential-issues.vue') },

    { separator: 'Isu & Mitigasi', label: 'Kategori Risk Register', name: 'm-issue-categories', icon: 'ri-stack-line', path: '/m-issue-categories', component: () => import('./../master-data/m-issue-categories.vue') },
    { separator: 'Isu & Mitigasi', label: 'Risk Register', name: 'm-issue', icon: 'ri-stack-line', path: '/m-issues', component: () => import('./../master-data/m-issues.vue') },
    { separator: 'Isu & Mitigasi', label: 'Sub Risk Register', name: 'm-sub-issues', icon: 'ri-stack-line', path: '/m-sub-issues', component: () => import('./../master-data/m-sub-issues.vue') },
    { separator: 'Isu & Mitigasi', label: 'Daftar Mitigasi', name: 'm-mitigations', icon: 'ri-stack-line', path: '/m-mitigations', component: () => import('./../master-data/m-mitigations.vue') },

    { separator: 'Master Data', label: 'Level Potensi Isu & Mitigasi', name: 'm_levels', icon: 'ri-stack-line', path: '/m_levels', component: () => import('./../master-data/m_levels.vue') }
  ]
}
export default module
