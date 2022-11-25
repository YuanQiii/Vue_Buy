/*
 * @Autor: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-28 09:50:18
 * @FilePath: \vue_buy\src\store\modules\cart.js
 */

import Vue from "vue";
import {
  ADD_ADDRESS,
  DEL_ADDRESS,
  CLEAR_ADDRESS,
  UPDATE_DEFAULT_ADDRESS,
  ADD_GOODS_CART,
  DEL_GOODS_CART,
  DEL_GOODS_CART_LIST,
  UPDATE_GOODS_CART_NUM,
  UPDATE_GOODS_CART_CHECKED,
  UPDATE_ORDER_ADDRESS,
  ADD_COUPON,
} from "../types";

const state = {
  // 购物车数组
  cartList: [],

  // 订单地址数据
  orderAddress: {},

  // 优惠券数组
  couponList: [
    {
      // 优惠券信息
      id: 1,
      available: 1,
      condition: "无使用门槛\n最多优惠1.5元",
      reason: "",
      value: 150,
      name: "优惠券",
      startAt: 1646064000,
      endAt: 1677600000,
      valueDesc: "1.5",
      unitDesc: "元",
    },
    {
      id: 2,
      available: 1,
      condition: "无使用门槛\n最多优惠2元",
      reason: "",
      value: 200,
      name: "优惠券",
      startAt: 1646064000,
      endAt: 1677600000,
      valueDesc: "2",
      unitDesc: "元",
    },
    {
      id: 3,
      available: 0,
      condition: "无使用门槛\n最多优惠2.5元",
      reason: "",
      value: 250,
      name: "优惠券",
      startAt: 1643644800,
      endAt: 1646064000,
      valueDesc: "2.5",
      unitDesc: "元",
    },
  ],

  disabledCouponList: [],

  // 全部地址数组
  addressList: [],
};
const getters = {
  // 购物车总价
  totalPrice(state) {
    let total = 0;
    state.cartList.forEach((element) => {
      if (element.checked) {
        total += element.price * element.cart_num * 100;
      }
    });
    return total;
  },

  // 默认地址id
  defaultAddressId(state) {
    let id = 0;
    state.addressList.forEach((element) => {
      if (element.isDefault) {
        console.log("element.id", element.id);
        id = element.id;
      }
    });
    return id;
  },
};

const mutations = {
  // 添加地址
  [ADD_ADDRESS](state, payload, index = -1) {
    if (index === -1) {
      Vue.set(state.addressList, state.addressList.length, payload);

    } else {
      Vue.set(state.addressList, index, payload);
    }
    console.log(state.addressList)
  },

  // 更新默认地址
  [UPDATE_DEFAULT_ADDRESS](state, payload) {
    state.addressList.forEach((element, index) => {
      element.isDefault = element.id === payload
      Vue.set(state.addressList, index, element);
    });
  },

  // 清空地址
  [CLEAR_ADDRESS](state) {
    state.addressList = [];
  },

  // 删除地址
  [DEL_ADDRESS](state, payload) {
    Vue.delete(state.addressList, payload);
  },

  // 更新订单地址
  [UPDATE_ORDER_ADDRESS](state, payload) {
    state.orderAddress = payload;
  },

  // 添加商品到购物车
  [ADD_GOODS_CART](state, payload) {
    let goodsExist = false;
    let temp = payload;
    let id = temp.id;

    temp["checked"] = true;

    state.cartList.forEach((element, index) => {
      if (element.id === id) {
        goodsExist = true;

        temp["cart_num"] = element.cart_num;
        temp["cart_num"]++;

        Vue.set(state.cartList, index, temp);
      }
    });

    if (!goodsExist) {
      temp["cart_num"] = 1;
      Vue.set(state.cartList, state.cartList.length, payload);
    }
  },

  // 更新购物车里某个商品数量
  [UPDATE_GOODS_CART_NUM](state, payload) {
    state.cartList.forEach((element, index) => {
      if (element.id === payload.id) {
        let temp = element;
        let num = element.cart_num;
        num += payload.value;
        temp["cart_num"] = num;

        Vue.set(state.cartList, index, temp);
      }
    });
  },

  // 删除购物车里的商品
  [DEL_GOODS_CART](state, payload) {
    state.cartList.forEach((element, index) => {
      if (element.id === payload) {
        Vue.delete(state.cartList, index);
      }
    });
  },

  // 清空购物车
  [DEL_GOODS_CART_LIST](state) {
    state.cartList = [];
  },

  // 更新购物车里商品对象的checked属性
  [UPDATE_GOODS_CART_CHECKED](state, payload) {
    state.cartList.forEach((element, index) => {
      if (element.id === payload.id) {
        let temp = element;
        temp["checked"] = payload.checked;
        Vue.set(state.cartList, index, temp);
      }
    });
  },

  // 添加优惠券
  [ADD_COUPON](state, payload) {
    Vue.set(state.couponList, state.couponList.length, payload);
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
