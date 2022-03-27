/*
 * @Author: your name
 * @Date: 2022-03-25 16:31:08
 * @LastEditTime: 2022-03-25 16:52:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue_buy\src\utils\addToCart.js
 */
import store from "@/store";

export function _addToCart(_this, goods) {
  if (store.state.user.userInfo.token) {
    store.commit("cart/ADD_GOODS_CART", goods);
    _this.$toast("成功添加到购物车");
  } else {
    _this.$router.push({
      name: "login",
    });
  }
}
