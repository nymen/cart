// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'
import InfiniteScroll from 'vue-infinite-scroll'
import VModal from 'vue-js-modal'

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  loading: '/static/loading/loading-bars.svg'
})
Vue.use(InfiniteScroll)
Vue.use(VModal)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
