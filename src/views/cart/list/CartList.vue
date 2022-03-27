<!--
 * @Author: your name
 * @Date: 2022-03-21 16:55:47
 * @LastEditTime: 2022-03-25 09:49:38
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue_buy\src\views\cart\list\CartList.vue
-->
<template>
  <div class="cart-list">
    <cart-goods />
  </div>
</template>

<script>
import { mapState } from "vuex";
import CartGoods from "./CartGoods.vue";

export default {
  components: { CartGoods },
  name: "CartList",
};
</script>

<style lang="less" scoped>
</style>