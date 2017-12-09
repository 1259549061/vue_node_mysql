// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import resource from 'vue-resource'
import './assets/css/main.scss'

Vue.use(resource)

Vue.config.productionTip = false;  //来关闭生产模式下给出的提示
Vue.prototype.myTime = {
  DateToUnix: function(string) {
    var f = string.split(' ', 2);
    var d = (f[0] ? f[0] : '').split('-', 3);
    var t = (f[1] ? f[1] : '').split(':', 3);
    return (new Date(
      parseInt(d[0], 10) || null,
      (parseInt(d[1], 10) || 1) - 1,
      parseInt(d[2], 10) || null,
      parseInt(t[0], 10) || null,
      parseInt(t[1], 10) || null,
      parseInt(t[2], 10) || null
    )).getTime();
  },
  UnixToDate: function(unixTime, isFull, timeZone) {
    if (typeof (timeZone) == 'number')
    {
      unixTime = parseInt(unixTime) + parseInt(timeZone) * 60 * 60;
    }
    var time = new Date(unixTime * 1000);
    var ymdhis = "";
    ymdhis += time.getFullYear() + "-";
    if(time.getMonth()+1<10){
      ymdhis += "0"+ (time.getMonth()+1) + "-";
    }else{
      ymdhis += (time.getMonth()+1) + "-";
    }
    if(time.getDate()<10){
      ymdhis += "0"+ time.getDate();
    }else{
      ymdhis += time.getDate();
    }
    if (isFull === true)
    {
      if(time.getHours()<10){
        ymdhis += " 0" + time.getHours() + ":";
      }else{
        ymdhis += " " + time.getHours() + ":";
      }
      if(time.getMinutes()<10){
        ymdhis += "0" + time.getMinutes() + ":";
      }else{
        ymdhis += time.getMinutes() + ":";
      }
      if(time.getSeconds()<10){
        ymdhis +="0" + time.getSeconds();
      }else{
        ymdhis += time.getSeconds();
      }
    }
    return ymdhis;
  },
};
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});
