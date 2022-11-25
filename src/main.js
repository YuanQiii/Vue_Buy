/*
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-15 20:59:27
 * @FilePath: \vue_buy\src\main.js
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import {VueJsonp} from 'vue-jsonp'
Vue.use(VueJsonp)

// viewport-units-buggyfill
// 根据content里的数据把vw单位转为px单位
const vub = require('viewport-units-buggyfill')
window.addEventListener('load', () => {
  vub.init({ hacks: window.viewportUnitsBuggyfillHacks })
})

// fastclick
// import fastclick from 'fastclick'
// fastclick.attach(document.body)

// prod
import waterfall from "vue-waterfall2";
Vue.use(waterfall);  
Vue.use(vant.Lazyload);

// dev
// import waterfall from "vue-waterfall2";
// import 'normalize.css/normalize.css'
// import VueClipboard from "vue-clipboard2";

// import "vant/lib/index.css";
// import Vant from "vant";
// import { Lazyload } from 'vant'

// Vue.use(VueClipboard);
// Vue.use(Vant);
// Vue.use(Lazyload);
// Vue.use(waterfall);

Vue.filter("moneyFormat", (value) => {
  return "¥" + Number(value).toFixed(2);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
