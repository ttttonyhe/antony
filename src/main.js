/*
    name: 入口文件
    author: TonyHe
    update: 22-2-2020
*/

// Import Main Dependencies
import Vue from 'vue'
import App from './App.vue'
import router from './router'


// Import RemixIcon Stylesheet
import 'remixicon/fonts/remixicon.css'

// Making Axios available globally
import axios from 'axios'
Vue.prototype.axios = axios

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
import cookie from 'vue-cookie'
Vue.prototype.cookie = cookie;

// Import & configure progress bar feature
import NProgress from "nprogress"
import 'nprogress/nprogress.css'
NProgress.configure({
  easing: 'ease-in-out',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.2
})

// Import Global Stylesheet
import './styles/main.scss'

/* Define Global Variables */
// Disable Production Tip
Vue.config.productionTip = false

/* Before & after switching to a new route */
router.beforeEach((to, from, next) => {
  // Change Title According to Path
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  // Start progress bar
  NProgress.start();
  next();
})
router.afterEach(() => {
  // Complete progress bar
  NProgress.done();
})


// Vue.js
new Vue({
  i18n,
  router,
  render: h => h(App)
}).$mount('#app')