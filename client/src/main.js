import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Store
import store from "@/store.js";

import "materialize-css/dist/css/materialize.min.css"
import "materialize-css/dist/js/materialize.min"

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  store: store
}).$mount('#app')
