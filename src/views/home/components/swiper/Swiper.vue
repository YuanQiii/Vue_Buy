<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-17 20:05:38
 * @FilePath: \mall-vue\src\views\home\components\swiper\swiper.vue
-->
<template>
  <div class="swiper">
    <!-- 轮播图组件 -->
    <swiper :options="swiperOption">
      <swiper-slide
        class="swiper-slide"
        v-for="(value, index) in sowingList"
        :key="index"
      >
        <img class="swiper-image" :src="value.icon_url" />
        
      </swiper-slide>
      <!-- <div class="swiper-pagination" slot="pagination"></div> -->
    </swiper>
  </div>
</template>  

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/dist/css/swiper.css";

export default {
  name: "Swiper",
  components: {
    swiper,
    swiperSlide,
  },
  props: {
    sowingList: Array,
  },
  data() {
    return {
      swiperOption: {
        notNextTick: false,
        loop: true,
        touchRatio: 1, // 触摸滑动的顺畅度
        initialSlide: 1, // 默认展示页
        autoplay: true, // 是否自动播放
        speed: 500, // 播放速度
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 5, // 模块之间的间隔
        on: {
          slideChangeTransitionEnd: function () {
            // 处理手动操作轮播图后后不再自动轮播
            this.autoplay.start();
          },
        },
        pagination: {
          el: ".swiper-pagination",
          dynamicBullets: true,
          clickable: true, //允许分页点击跳转,
        },
      },
    };
  },
};
</script>

<style lang="less" scoped>
.swiper {
  padding-top: 50px;
  // height: 214px;
  .swiper-slide {
    display: flex;
    justify-content: center;
  }
  .swiper-image {
    width: 340px;
    border-radius: 10px;
    content: normal !important;
  }
} 

.swiper-pagination{
  z-index: 999;
}

.swiper /deep/ .swiper-pagination-bullet-active {
  background-color: #3cb963;
}
</style>