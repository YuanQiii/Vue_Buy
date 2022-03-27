<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-19 12:29:15
 * @FilePath: \Vue_Buy\src\views\eat\Eat.vue
-->
<template>
  <div class="eat">
    <eat-skeleton v-show="skeletonShow" />
    <eat-menu :recipeAllScene="recipeAllScene" />
    <eat-product />
  </div>
</template>

<script>
import EatSkeleton from "./skeleton/EatSkeleton.vue";

import { recipeAllSceneApi } from "@/api/index.js";
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