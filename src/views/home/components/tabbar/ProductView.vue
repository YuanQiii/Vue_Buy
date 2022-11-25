<template>
  <div>
    <virtual-list :list-data="productLists" :itemSize="330" :isFixed="isFixed" :preLoadNum="2">
      <template v-slot="{ prop }">
        <product-item :source="prop" />
      </template>
    </virtual-list>
  </div>
</template>
  
<script>
import VirtualList from "@/components/virtual/VirtualList.vue";
import ProductItem from "@/components/product/ProductItem.vue";
export default {
  name: "ProductView",
  components: {
    ProductItem,
    VirtualList,
  },
  props: {
    // 商品数据数组
    productLists: {
      type: Array,
      default: () => [],
    },
    isFixed: {
      type: Boolean,
      default: false,
    },
  }
};
</script>
  
<style lang="less" scoped>

</style>
  