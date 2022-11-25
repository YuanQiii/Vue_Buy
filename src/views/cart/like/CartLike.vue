<!--
 * @Autor: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-28 09:50:18
 * @FilePath: \vue_buy\src\views\cart\like\CartLike.vue
-->

<template>
  <div class="cart-like">
    <virtual-list :list-data="productList" :itemSize="330" :isFixed="isFixed">
      <template v-slot="{ prop }">
        <product-item :source="prop" />
      </template>
    </virtual-list>
  </div>
</template>

<script>
import { cartYouLikeApi } from "@/api/index.js";
import VirtualList from "@/components/virtual/VirtualList.vue"
import ProductItem from "@/components/product/ProductItem.vue";

export default {
  name: "CartLike",
  components: {
    ProductItem,
    VirtualList
  },
  created() {
    this.getCartYouLike();
  },
  props: {
    isFixed: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      productList: [],
    };
  },
  methods: {
    // 获取推荐商品数据
    getCartYouLike() {
      cartYouLikeApi()
        .then((response) => {
          let data = response.data;
          if (data.success) {
            this.productList = data.data.product_list;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="less" scoped>
.cart-like{
  height: 100vh;
}
</style>