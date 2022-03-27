<!--
 * @Author: your name
 * @Date: 2022-03-24 14:45:21
 * @LastEditTime: 2022-03-24 14:49:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue_buy\src\views\cart\list\CartEmpty.vue
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
    goToHome() {
      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style lang="less" scoped>
.cart-empty {
  .empty {
    padding-left: 1rem;
    padding-right: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .image {
      padding-top: 2rem;
      width: 50%;
      height: 9rem;
      margin: 0 auto;
    }
    .text {
      text-align: center;
      margin-top: 1rem;
    }
    .b {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
      .btn {
        width: 7rem;
      }
    }
  }
}
</style>