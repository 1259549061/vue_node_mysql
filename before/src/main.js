// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from 'vue-resource'
import './assets/css/main.scss'

Vue.use(resource)

Vue.config.productionTip = false;  //来关闭生产模式下给出的提示
Vue.prototype.myTips = function (type,text){

}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
