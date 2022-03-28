<!--
 * @Autor: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-28 09:50:18
 * @FilePath: \vue_buy\src\views\cart\list\CartList.vue
-->

<template>
  <div class="cart-list">
    <cart-goods />
  </div>
</template>

<script>
import CartGoods from "./CartGoods.vue";

export default {
  components: { CartGoods },
  name: "CartList",
};
</script>

<style lang="less" scoped>
</style>