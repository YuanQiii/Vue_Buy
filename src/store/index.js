
/*
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-15 20:59:27
 * @FilePath: \vue_buy\src\store\index.js
 */
import Vue from "vue";
import Vuex from "vuex";
import persist from 'vuex-persistedstate'

import {
  UPDATE_MENU_ACTIVE,
  UPDATE_HOME_ACTIVE,
  UPDATE_CURRENT_GOODS_DETAIL,
} from "./types";

import user from "./modules/user";
import cart from "./modules/cart";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    menuActive: 0,
    homeActive: 0,
    currentGoodsDetail: {},
  },
  mutations: {
    [UPDATE_MENU_ACTIVE](state, payload) {
      state.menuActive = payload;
    },
    [UPDATE_HOME_ACTIVE](state, payload) {
      state.homeActive = payload;
    },
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
    new persist({
      storage: window.sessionStorage
    })
  ]
});
