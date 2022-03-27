<!--
 * @Author: your name
 * @Date: 2022-03-18 14:46:52
 * @LastEditTime: 2022-03-21 17:43:22
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \mall-vue\src\views\category\components\CategoryContent.vue
-->
<template>
  <div id="category-content">
    <div>
      <van-tabs
        v-model="active"
        animated
        swipeable
        ref="menuTabs"
        class="tabbar"
      >
        <van-tab
          :title="item.name"
          v-for="(item, index) in categoriesDetailData"
          :key="index"
        >
          <div class="products">
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
    categoriesDetailData: {
      type: Array,
      default: [],
    },
  },
  watch: {
    currentIndex() {
      this.$refs.menuTabs.resize();
    },
  },
  data() {
    return {
      active: 0,
    };
  },
};
</script>

<style lang="less" scoped>
#category-content {
  .tabbar {
    width: 63vw;
  }
}
</style>