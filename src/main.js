import Vue from 'vue'
// 按需引入
// import { Button, Select,Container } from 'element-ui';
// 全局引入
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue'
// 引入路由
import VueRouter from 'vue-router';
import router from './router/'
// 引入Vuex
import store from './store/'
// 引入模拟数据
import './api/mock'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)


new Vue({
  store,
  router,
  render: h => h(App),
  created(){
    store.commit('menu/ADDMENU', router);
  }
}).$mount('#app')
