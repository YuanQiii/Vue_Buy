<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-19 12:29:15
 * @FilePath: \vue_buy\src\views\eat\Eat.vue
-->
<template>
  <div class="eat">
    <!-- 骨架屏 -->
    <eat-skeleton v-show="skeletonShow" />

    <!-- 菜单组件 -->
    <eat-menu :recipeAllScene="recipeAllScene" />

    <!-- 菜单列表 -->
    <eat-product />
  </div>
</template>

<script>
import { recipeAllSceneApi } from "@/api/index.js";
import EatSkeleton from "./skeleton/EatSkeleton.vue";
import EatMenu from "./menu/EatMenu.vue";
import EatProduct from "./product/EatProduct.vue";

export default {
  name: "Eat",
  components: { EatSkeleton, EatMenu, EatProduct },
  created() {
    this.getRecipeAllScene();
  },
  data() {
    return {
      skeletonShow: true,
      recipeAllScene: [],
    };
  },
  methods: {
    // 获取菜单数据
    getRecipeAllScene() {
      recipeAllSceneApi()
        .then((response) => {
          let data = response.data;
          if (data.code == 200) {
            this.recipeAllScene = data.data.list;
            this.skeletonShow = false;
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
</style>