<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-19 12:29:47
 * @FilePath: \vue_buy\src\views\cart\Cart.vue
-->
<template>
  <div class="cart">
    <van-nav-bar
      class="bar"
      title="购物车"
      left-arrow
      @click-left="onClickLeft"
    />

    <!-- 购物车为空 -->
    <cart-empty v-show="!cartList.length" />

    <!-- 购物车列表 -->
    <cart-list v-show="cartList.length" />

    <!-- 推荐商品 -->
    <van-divider id="#cart-divider" :style="dividerStyle" @scroll="handleScroll">猜你喜欢</van-divider>

    <!-- 猜你喜欢 -->
    <cart-like :isFixed="isFixed"/>
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
  mounted(){
    this.io = new IntersectionObserver(e => {
      console.log(e);
      if(e[0].intersectionRatio == 0){
        this.isFixed = true
      }else{
        this.isFixed = false
      }
    });
    this.io.observe(document.getElementById('#cart-divider'));
  },
  data() {
    return {
      // 分割线样式
      dividerStyle: {
        color: "#000000",
        borderColor: "#28BE57",
        height: '24px'
      },
      io: null,
      isFixed: false
    };
  },
  computed: {
    ...mapState("cart", ["cartList"]),
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.back();
    },
    handleScroll(e){
      console.log(123);
    }
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