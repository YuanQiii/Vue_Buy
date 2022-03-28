<!--
 * @Autor: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-28 09:50:18
 * @FilePath: \vue_buy\src\views\cart\like\CartLike.vue
-->

<template>
  <div class="cart-like">
    <produce-item :productLists="productList" />
  </div>
</template>

<script>
import { cartYouLikeApi } from "@/api/index";
import ProduceItem from "@/views/home/components/tabbar/ProduceItem.vue";

export default {
  name: "CartLike",
  components: {
    ProduceItem,
  },
  created() {
    this.getCartYouLike();
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

<style>
</style>