<!--
 * @Author: your name
 * @Date: 2022-03-18 14:44:38
 * @LastEditTime: 2022-03-28 11:27:36
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \mall-vue\src\views\category\components\skeleton\Skeleton.vue
-->
<template>
  <div class="category-skeleton">
    <content-loader
      :width="414"
      :height="836"
      :speed="2"
      primaryColor="#f3f3f3"
      secondaryColor="#ecebeb"
    >
      <rect x="7" y="17" rx="5" ry="5" width="400" height="24" />
      <rect x="11" y="55" rx="0" ry="0" width="102" height="790" />
      <rect x="75" y="555" rx="0" ry="0" width="0" height="30" />
      <rect x="140" y="58" rx="0" ry="0" width="260" height="70" />
      <rect x="140" y="157" rx="0" ry="0" width="260" height="70" />
      <rect x="140" y="258" rx="0" ry="0" width="260" height="70" />
      <rect x="140" y="356" rx="0" ry="0" width="260" height="70" />
      <rect x="140" y="456" rx="0" ry="0" width="260" height="70" />
      <rect x="140" y="556" rx="0" ry="0" width="260" height="70" />
      <rect x="140" y="654" rx="0" ry="0" width="260" height="70" />
      <rect x="140" y="757" rx="0" ry="0" width="260" height="70" />
    </content-loader>
  </div>
</template>

<script >
import { ContentLoader } from "vue-content-loader";

export default {
  name: "CategorySkeleton",
  components: {
    ContentLoader,
  },
  data() {
    return {
      width: 414,
    };
  },
};
</script>

<style lang="less" scoped></style>