import Vue from "vue";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import VueMeta from 'vue-meta'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Config from '@/config/Config.js'

 

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'highlight.js/styles/atom-one-dark-reasonable.css';

Vue.use(VueMeta, {
  refreshOnceOnNavigation: true
});

Vue.config.productionTip = false;

//CONFIG
Vue.prototype.$Config = Config;

const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#blogApp");
