const module = {
  config: {
    name: 'laporan',
    icon: 'ri-funds-line',
    desc: 'Pengelolaan Laporan Potensi issue dan rekomendasi mitigasi Pusmanpro',
    layout: true
  },
  routes: [
    { name: 'potential-issues', label: 'Pelaporan Potensi Isu', icon: 'ri-database-2-fill', path: '/potential-issues', component: () => import('./potential-issues.vue') },
    { name: 'mitigation-recommendations', label: 'Rekomendasi Mitigasi', icon: 'ri-database-2-fill', path: '/mitigation-recommendations', component: () => import('./mitigation-recommendations.vue') },
    // ==============
    { separator: 'Master Isu & Mitigasi', label: 'Kategori Potensi Isu & Risk Register', name: 'm-issue-categories', icon: 'ri-stack-line', path: '/m-issue-categories', component: () => import('./../master-data/m-issue-categories.vue') },
    { separator: 'Master Isu & Mitigasi', label: 'Daftar Mitigasi', name: 'm-mitigations', icon: 'ri-stack-line', path: '/m-mitigations', component: () => import('./../master-data/m-mitigations.vue') },
    { separator: 'Master Isu & Mitigasi', label: 'Level Potensi Isu & Mitigasi', name: 'm_levels', icon: 'ri-stack-line', path: '/m_levels', component: () => import('./../master-data/m_levels.vue') },
    { hidden: true, separator: 'Master Isu & Mitigasi', label: 'Daftar Sub Risk Register', name: 'm-sub-issues', icon: 'ri-stack-line', path: '/m-sub-issues', component: () => import('./../master-data/m-sub-issues.vue') }
  ]
}
export default module
