/*
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-25 21:22:51
 * @FilePath: \vue_buy\src\utils\goToGoodsDetail.js
 */
import store from "@/store";

// 跳转到商品详情
export function _goToGoodsDetail(_this, goods) {
  store.commit("UPDATE_CURRENT_GOODS_DETAIL", goods);
  _this.$router.push({
    name: "goodsDetail",
  });
}
