/*
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-15 20:59:27
 * @FilePath: \vue_buy\src\store\index.js
 */
import Vue from "vue";
import Vuex from "vuex";

// vuex数据持久化
import persist from "vuex-persistedstate";

import {
  UPDATE_MENU_ACTIVE,
  UPDATE_HOME_ACTIVE,
  UPDATE_CURRENT_GOODS_DETAIL,
} from "./types";

// 引入模块
import user from "./modules/user";
import cart from "./modules/cart";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 分类索引
    menuActive: 0,

    // 底部导航索引
    homeActive: 0,

    // 当前商品详情数据
    currentGoodsDetail: {},
  },
  mutations: {
    // 更新分类索引
    [UPDATE_MENU_ACTIVE](state, payload) {
      state.menuActive = payload;
    },

    // 底部导航索引
    [UPDATE_HOME_ACTIVE](state, payload) {
      state.homeActive = payload;
    },

    // 更新当前商品详情数据
    [UPDATE_CURRENT_GOODS_DETAIL](state, payload) {
      state.currentGoodsDetail = payload;
    },
  },
  actions: {},
  modules: {
    user,
    cart,
  },
  plugins: [
    // 数据持久化
    // 以sessionStorage方式存储
    new persist({
      storage: window.sessionStorage,
    }),
  ],
});
