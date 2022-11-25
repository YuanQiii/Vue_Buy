/*
 * @Autor: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-28 09:50:18
 * @FilePath: \vue_buy\src\utils\addToCart.js
 */

import store from "@/store";

// 添加到购物车
export function _addToCart(_this, goods) {
  if (store.state.user.userInfo.token) {
    store.commit("cart/ADD_GOODS_CART", goods);
    _this.$toast("成功添加到购物车");
  } else {
    _this.$router.push({
      path: "/login",
    });
  }
}
