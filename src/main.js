/*
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-15 20:59:27
 * @FilePath: \mall-vue\src\main.js
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
import BaiduMap from 'vue-baidu-map'

// Vue.config.productionTip = false;

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'bw2za7V7fdMByonea9qs5zDgZ0fSqlFY'
})

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
