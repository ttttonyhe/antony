/*
    name: 入口文件
    author: TonyHe
    update: 22-2-2020
*/

// Import Main Dependencies
import Vue from 'vue'
import App from './App.vue'
import router from './router'

/* Import and configure i18n feature */
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
// i18n language pack configuration
const i18n = new VueI18n({
  locale: 'zh-CN',
  messages: {
    'zh-CN': require('./common/lang/zh'),
    'en-US': require('./common/lang/en')
  }
})

// Making Cookies Features to be available globally


// Vue.js
new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')