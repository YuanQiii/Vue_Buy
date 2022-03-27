/*
 * @Author: your name
 * @Date: 2022-03-21 17:05:40
 * @LastEditTime: 2022-03-25 15:59:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
  ADD_COUPON
} from "../types";

const state = {
  cartList: [],
  orderAddress: {},
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
      startAt: 1646064000,
      endAt: 1646064000,
      valueDesc: "2.5",
      unitDesc: "元",
    },
  ],
  disabledCouponList: [],
  addressList: [],
};
const getters = {
  totalPrice(state) {
    let total = 0;
    state.cartList.forEach((element) => {
      if (element.checked) {
        total += element.price * element.cart_num * 100;
      }
    });
    console.log("total", total);
    return total;
  },
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
  [ADD_ADDRESS](state, payload, index = -1) {
    if (index == -1) {
      Vue.set(state.addressList, state.addressList.length, payload);
    } else {
      Vue.set(state.addressList, index, payload);
    }
  },
  [DEL_ADDRESS](state, payload) {
    Vue.delete(state.addressList, payload);
  },
  [UPDATE_DEFAULT_ADDRESS](state, payload) {
    state.addressList.forEach((element, index) => {
      if (element.id == payload) {
        element.isDefault = true;
      } else {
        element.isDefault = false;
      }
      Vue.set(state.addressList, index, element);
    });
  },
  [CLEAR_ADDRESS](state) {
    state.addressList = [];
  },
  [ADD_GOODS_CART](state, payload) {
    let goodsExist = false;
    let temp = payload;
    let id = temp.id;

    temp["checked"] = false;

    state.cartList.forEach((element, index) => {
      if (element.id == id) {
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
    console.log(state.cartList);
  },
  [UPDATE_GOODS_CART_NUM](state, payload) {
    state.cartList.forEach((element, index) => {
      if (element.id == payload.id) {
        let temp = element;
        let num = element.cart_num;
        num += payload.value;
        temp["cart_num"] = num;

        Vue.set(state.cartList, index, temp);
      }
    });
    console.log(state.cartList);
  },
  [DEL_GOODS_CART](state, payload) {
    state.cartList.forEach((element, index) => {
      if (element.id == payload) {
        Vue.delete(state.cartList, index);
      }
    });
    console.log(state.cartList);
  },
  [DEL_GOODS_CART_LIST](state) {
    state.cartList = [];
  },
  [UPDATE_GOODS_CART_CHECKED](state, payload) {
    state.cartList.forEach((element, index) => {
      if (element.id == payload.id) {
        let temp = element;
        temp["checked"] = payload.checked;
        Vue.set(state.cartList, index, temp);
      }
    });
    console.log(state.cartList);
  },
  [UPDATE_ORDER_ADDRESS](state, payload) {
    state.orderAddress = payload;
    console.log("state.orderAddress", state.orderAddress);
  },
  [ADD_COUPON](state, payload) {
    Vue.set(state.couponList, state.couponList.length, payload)
  }
};
const actions = {};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
