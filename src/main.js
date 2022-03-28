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
import Vant from "vant";
import { Lazyload } from "vant";
import "vant/lib/index.css";
import VueClipboard from "vue-clipboard2";
import waterfall from "vue-waterfall2";

Vue.use(Vant);
Vue.use(Lazyload);
Vue.use(VueClipboard);
Vue.use(waterfall);

Vue.filter("moneyFormat", (value) => {
  return "¥" + Number(value).toFixed(2);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
