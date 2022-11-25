<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-17 22:06:24
 * @FilePath: \mall-vue\src\views\home\components\tabbar\TabbarGoodsItem.vue
-->
<template>
  <div id="tabbarItem">
    <van-tabs
      v-model="active"
      ref="tabs"
      offset-top="0"
      color="#28BE57"
      title-active-color="#28BE57"
      sticky
      @scroll="handleTabsScroll"
      swipeable
      animated
      
    >
      <!-- 全部 -->
      <van-tab>
        <div slot="title">
          <span>{{ text[0] }}</span>
        </div>
        <product-view :productLists="tabbarAllProductList" :isFixed="isFixed" />
      </van-tab>
      <!-- 晚餐 -->
      <van-tab>
        <div slot="title">
          <span>{{ text[1] }}</span>
        </div>
        <product-view :productLists="flashSalProductList" :isFixed="isFixed" />
      </van-tab>
      <!-- 人气 -->
      <van-tab>
        <div slot="title">
          <span>{{ text[2] }}</span>
        </div>
        <product-view :productLists="tabbarAllProductList" :isFixed="isFixed" />
      </van-tab>
      <!-- 心选 -->
      <van-tab>
        <div slot="title">
          <span>{{ text[3] }}</span>
        </div>
        <product-view :productLists="flashSalProductList" :isFixed="isFixed" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 商品列表组件
import ProductItem from "./ProductItem.vue";
import ProductView from './ProductView.vue'

export default {
  name: "TabbarGoodsItem",
  components: {
    ProductItem,
    ProductView
  },
  props: {
    tabbarAllProductList: Array,
    flashSalProductList: Array,
  },
  updated() {
    // 修复导航栏底部条位置错误
    this.$refs.tabs.resize();
  },
  data() {
    return {
      active: 0,
      text: ["全部", "晚餐", "人气", "心选"],
      isFixed: false
    };
  },
  methods: {
    handleTabsScroll(e){
      this.isFixed = e.isFixed
    }
  }
};
</script>

<style lang="less" scoped>
#tabbarItem {
  // width: 100%;
  height: 100%;
}
</style>
