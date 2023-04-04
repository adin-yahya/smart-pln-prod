const module = {
  config: {
    name: 'master-data',
    icon: 'ri-draft-line',
    desc: 'Pengelolaan Data Master Aplikasi SMART Pusmanpro',
    layout: true
  },
  routes: [
    { name: 'units', label: 'Unit', icon: 'ri-group-line', path: '/units', component: () => import('./units.vue') },
    { name: 'pst', label: 'PST', icon: 'ri-group-line', path: '/pst', component: () => import('./pst.vue') },
    { name: 'projects', label: 'Proyek', icon: 'ri-group-line', path: '/projects', component: () => import('./projects.vue') },
    // ===============
    // { separator: 'Isu & Mitigasi', label: 'Kategori Potensi Isu & Risk Register', name: 'm-issue-categories', icon: 'ri-stack-line', path: '/m-issue-categories', component: () => import('./m-issue-categories.vue') },
    // { separator: 'Isu & Mitigasi', label: 'Daftar Mitigasi', name: 'm-mitigations', icon: 'ri-stack-line', path: '/m-mitigations', component: () => import('./m-mitigations.vue') },
    // ===============
    { separator: 'Konfigurasi Proyek', label: 'Urgensi Proyek', name: 'm-project-urgency', icon: 'ri-stack-line', path: '/m-project-urgency', component: () => import('./m-project-urgency.vue') },
    { separator: 'Konfigurasi Proyek', label: 'Tipe Proyek', name: 'm-project-types', icon: 'ri-stack-line', path: '/m-project-types', component: () => import('./m-project-types.vue') }
  ]
}
export default module
