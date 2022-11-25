<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-17 17:13:03
 * @FilePath: \mall-vue\src\views\home\components\header\HomeHeader.vue
-->
<template>
  <div class="home-header">
    <!-- 商品搜索组件 -->
    <search :goodsList="goodsList" />
  </div>
</template>

<script>
import Search from "@/components/search/Search.vue";
export default {
  components: {Search },
  name: "HomeHeader",
  props: {
    goodsList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      address: "请选择地址",
    };
  },
  methods: {
    toPage() {
      this.$router.push({
        name: "map",
      });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
