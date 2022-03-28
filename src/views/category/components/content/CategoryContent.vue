<!--
 * @Autor: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-28 09:50:18
 * @FilePath: \vue_buy\src\views\category\components\content\CategoryContent.vue
-->

<template>
  <div class="category-content">
    <div>
      <van-tabs
        animated
        swipeable
        ref="menuTabs"
        class="tabbar"
        color="#28BE57"
      >
        <!-- 商品列表分类 -->
        <van-tab
          :title="item.name"
          v-for="(item, index) in categoriesDetailData"
          :key="index"
        >
          <div class="products">
            <!-- 分类商品 -->
            <category-product
              v-for="(item1, index1) in item.products"
              :key="index1"
              :productDetail="item1"
            />
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import CategoryProduct from "./CategoryProduct.vue";
export default {
  components: { CategoryProduct },
  name: "CategoryContent",
  props: {
    currentIndex: {
      type: Number,
      default: 0,
    },

    // 商品数据
    categoriesDetailData: {
      type: Array,
      default: [],
    },
  },

  // 修复导航栏底部条位置错误
  watch: {
    currentIndex() {
      this.$refs.menuTabs.resize();
    },
  },
};
</script>

<style lang="less" scoped>
.category-content {
  .tabbar {
    width: 63vw;
  }
}
</style>