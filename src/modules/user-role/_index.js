const module = {
  config: {
    name: 'pengaturan-pengguna',
    icon: 'ri-user-settings-line',
    desc: 'Digunakan untuk mendaftarkan, menonaktifkan, dan mengatur hak akses pengguna di Aplikasi SMART Pusmanpro',
    layout: true
  },
  routes: [
    { name: 'tenaga-kerja', icon: 'ri-group-line', path: '/employees', component: () => import('./employees.vue') },

    { separator: 'Pengguna', name: 'daftar-pengguna', icon: 'ri-group-line', path: '/users', component: () => import('./users.vue') },
    { separator: 'Pengguna', name: 'verifikasi-pengguna', icon: 'ri-group-line', path: '/user-approval', component: () => import('./user-approval.vue') },
    { separator: 'Pengguna', name: 'pengguna-non-aktif', icon: 'ri-group-line', path: '/user-register', component: () => import('./user-register.vue') },

    { separator: 'Access Config', name: 'role-group', icon: 'ri-stack-line', path: '/role-group', component: () => import('./role-group.vue') },
    { separator: 'Access Config', name: 'role', icon: 'ri-stack-line', path: '/role', component: () => import('./role.vue') },
    { separator: 'Access Config', name: 'permissions', icon: 'ri-key-2-line', path: '/permissions', component: () => import('./permissions.vue') }
  ]
}
export default module
