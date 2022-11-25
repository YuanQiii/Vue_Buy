<!--
 * @Author: your name
 * @Date: 2022-03-24 14:45:21
 * @LastEditTime: 2022-03-28 11:43:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue_buy\src\views\cart\empty\CartEmpty.vue
-->
<template>
  <div class="cart-empty">
    <div class="empty">
      <img class="image" src="../../../images/cart/empty.png" />
      <div class="text">购物车空空滴~</div>
      <div class="b">
        <van-button class="btn" round type="primary" @click="goToHome"
          >去逛逛</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartEmpty",
  methods: {
    // 跳转到首页
    goToHome() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style lang="less" scoped>
.cart-empty {
  .empty {
    padding-left: 16px;
    padding-right: 16px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .image {
      content: normal !important;
      padding-top: 32px;
      width: 50%;
      height: 144px;
      margin: 0 auto;
    }
    .text {
      text-align: center;
      margin-top: 16px;
    }
    .b {
      display: flex;
      justify-content: center;
      margin-top: 16px;
      .btn {
        width: 112px;
      }
    }
  }
}
</style>