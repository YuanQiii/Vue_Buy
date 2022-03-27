<!--
 * @Author: your name
 * @Date: 2022-03-21 17:24:24
 * @LastEditTime: 2022-03-21 17:36:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
    getCartYouLike() {
      cartYouLikeApi().then((response) => {
        let data = response.data;
        if (data.success) {
          this.productList = data.data.product_list;
        }
      });
    },
  },
};
</script>

<style>
</style>