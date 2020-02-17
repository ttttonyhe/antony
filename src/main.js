/*
    name: 入口文件
    author: TonyHe
    update: 15-2-2020
*/

// Import Main Dependencies
import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Import Site Config
import config from './config'

// Import & Use Bootstrap-Vue Resources
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(BootstrapVue)

// Import RemixIcon Stylesheet
import 'remixicon/fonts/remixicon.css'

// Making Axios available globally
import axios from 'axios'
Vue.prototype.axios = axios

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

// Import & use head meta modification feature
import VueHead from 'vue-head'
Vue.use(VueHead)

// Import Global Stylesheet
import './styles/main.scss'

/* Define Global Variables */
// Site Configuration
Vue.prototype.config = config
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
  router,
  render: h => h(App)
}).$mount('#app')