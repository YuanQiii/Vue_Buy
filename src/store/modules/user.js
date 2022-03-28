/*
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-19 12:16:17
 * @FilePath: \vue_buy\src\store\modules\user.js
 */
import Vue from "vue";

import {
  UPDATE_USER_INFO,
  UPDATE_USER_NAME,
  UPDATE_USER_PHONE,
  UPDATE_USER_GENDER,
  UPDATE_USER_BIRTHDAY,
} from "../types";

const state = {
  // 用户信息
  userInfo: {},
};
const getters = {
  // 用户名
  userName(state) {
    if (Object.keys(state.userInfo).length) {
      return state.userInfo.userName;
    } else {
      return "";
    }
  },
};
const mutations = {
  // 更新用户信息
  [UPDATE_USER_INFO](state, payload) {
    state.userInfo = payload;
  },

  // 更新用户名
  [UPDATE_USER_NAME](state, payload) {
    Vue.set(state.userInfo, "userName", payload);
  },

  // 更新用户手机号
  [UPDATE_USER_PHONE](state, payload) {
    Vue.set(state.userInfo, "phone", payload);
  },

  // 更新用户性别
  [UPDATE_USER_GENDER](state, payload) {
    Vue.set(state.userInfo, "gender", payload);
  },

  // 更新用户生日
  [UPDATE_USER_BIRTHDAY](state, payload) {
    Vue.set(state.userInfo, "birthday", payload);
  },
};
const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
