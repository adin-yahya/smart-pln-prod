const app = {
  name: 'SMART',
  fullname: 'Sistem Mitigation All Risk Terintegrasi',
  company: 'Pusat Manajemen Proyek (Pusmanpro)',
  guide: 'https://bit.ly/Panduan-SMART-Pusmanpro',
  site: 'https://pln.co.id/',
  code: 'pln-smart',
  logo: {
    sm: './static/img/logo/240x240.png',
    md: './static/img/logo/480x480.png',
    lg: './static/img/logo/pln-bumn.png'
  },
  server: {
    stagging: 'https://smart-pln.pttas.xyz/api/',
    development: 'https://smart-pln.pttas.xyz/api/',
    production: 'https://pusmanpro.id/api/',
    demo: 'https://smart-pln.pttas.xyz/api/'
  },
  sso: {
    stagging: 'https://smart-pln.pttas.xyz/api/',
    development: 'https://smart-pln.pttas.xyz/api/',
    production: 'https://pusmanpro.id/api/',
    demo: 'https://smart-pln.pttas.xyz/api/'
  },
  download: {
    android: 'https://play.google.com/store/',
    ios: 'https://www.apple.com/id/app-store/'
  },
  options: {
    allowRegister: true,
    forgetPassword: false,
    autofill: false,
    myAction: false,
    asideRight: false,
    sso: false
  }
}

// =========================================================
// File CUSTOM Variable SCSS
// static\assets\sass\components\_variables.demo.scss
// =========================================================

export default app
