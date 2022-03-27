<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-17 20:05:38
 * @FilePath: \mall-vue\src\views\home\components\Swiper\Swiper.vue
-->
<template>
  <div id="swiper">
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
      @change="onChange"
    >
      <van-swipe-item v-for="(value, index) in sowingList" :key="index">
        <img class="image" :src="value.icon_url" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "Swiper",
  props: {
    sowingList: Array,
  },
  methods: {
    onChange(index) {
      //   console.log(index);
    },
  },
};
</script>

<style lang="less" scoped>
#swiper {
  .my-swipe {
    width: 95vw;
    margin-top: 2rem;
    margin-left: 2.5vw;
    border-radius: 0 0 40px 40px;
    .image {
      width: 95vw;
      height: 15rem;
      margin-top: 1rem;
    }
  }
}
</style>