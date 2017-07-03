// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import VueResource from 'vue-resource';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/scss/index.scss'
import 'mavon-editor/dist/css/index.css'
Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(ElementUI)
Vue.use(VueResource)
new Vue({
  el: '#app',
  router
})
