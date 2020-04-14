import Vue from 'vue'
import App from './App.vue'
import router from './router'

// Store
import store from "@/store.js";

// Tailwind compiled css
import "@/../styles/styles.css";

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  store: store
}).$mount('#app')
