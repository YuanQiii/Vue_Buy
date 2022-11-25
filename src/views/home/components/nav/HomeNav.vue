<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-17 21:05:03
 * @FilePath: \mall-vue\src\views\home\components\nav\HomeNav.vue
-->
<template>
  <div class="home-nav">
    <!-- 商品分类导航 -->
    <van-grid :column-num="5" :border="false">
      <van-grid-item
        v-for="(nav, index) in navList"
        :key="nav.cid"
        :icon="nav.icon_url"
        :text="nav.name"
        @click="goToCategory(index)"
      />
    </van-grid>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "HomeNav",
  props: {
    navList: Array,
  },
  methods: {
    ...mapMutations(["UPDATE_MENU_ACTIVE"]),
    goToCategory(index) {
      this.$router.push({
        name: "category",
      });
      this.UPDATE_MENU_ACTIVE(index + 1);
    },
  },
};
</script>

<style lang="less" scoped>
</style>
