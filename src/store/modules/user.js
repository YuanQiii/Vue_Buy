/*
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-19 12:16:17
 * @FilePath: \Vue_Buy\src\store\modules\user.js
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
  userInfo: {
  },
};
const getters = {
  userName(state) {
    if (Object.keys(state.userInfo).length) {
      return state.userInfo.userName;
    } else {
      return "";
    }
  },
};
const mutations = {
  [UPDATE_USER_INFO](state, payload) {
    state.userInfo = payload;
  },
  [UPDATE_USER_NAME](state, payload) {
    Vue.set(state.userInfo, "userName", payload);
  },
  [UPDATE_USER_PHONE](state, payload) {
    Vue.set(state.userInfo, "phone", payload);
  },
  [UPDATE_USER_GENDER](state, payload) {
    Vue.set(state.userInfo, "gender", payload);
  },
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
