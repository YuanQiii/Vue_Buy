<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-19 12:29:47
 * @FilePath: \Vue_Buy\src\views\cart\Cart.vue
-->
<template>
  <div class="cart">
    <van-nav-bar
      class="bar"
      title="购物车"
      left-arrow
      @click-left="onClickLeft"
    />
    <cart-empty v-show="!cartList.length" />
    <cart-list v-show="cartList.length" />
    <van-divider :style="dividerStyle">猜你喜欢</van-divider>
    <cart-like />
  </div>
</template>

<script>
import CartList from "./list/CartList.vue";
import CartEmpty from "./empty/CartEmpty.vue";
import CartLike from "./like/CartLike.vue";
import { mapState } from "vuex";

export default {
  name: "cart",
  components: {
    CartList,
    CartLike,
    CartEmpty,
  },
  data() {
    return {
      dividerStyle: {
        color: "#000000",
        borderColor: "#28BE57",
      },
    };
  },
  computed: {
    ...mapState("cart", ["cartList"]),
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  position: relative;
  background-color: #f5f5f5;
  .bar {
    position: sticky;
    top: 0;
  }
}
</style>