<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-15 20:59:27
 * @FilePath: \vue_buy\src\views\home\Home.vue
-->
<template>
  <div id="home">
    <!-- 骨架屏幕  数据未加载时显示占位-->
    <home-skeleton v-show="isShowLoading" />
    <div v-show="!isShowLoading">
      <!-- 背景图片 -->
      <div class="bg">
        <img class="image" src="../../images/home/backImage.png" alt="" />
      </div>

      <!-- 搜索组件 -->
      <van-sticky offset-top="35px">
        <home-header :goodsList="goodsList" />
      </van-sticky>

      <!-- 轮播图和文字广告 -->
      <div>
        <swiper :sowingList="sowingList" />
        <tip :homeAd="homeAd" />
      </div>

      <div>
        <!-- 商品分类导航 -->
        <home-nav :navList="navList" />

        <!-- 绿卡广告 -->
        <home-vip />
      </div>

      <!-- 限时抢购 -->
      <flash-buy :flashSalProductList="flashSalProductList" />

      <!-- 商品列表 -->
      <tabbar-goods-item
          :tabbarAllProductList="tabbarAllProductList"
          :flashSalProductList="flashSalProductList"
        />
    </div>
  </div>
</template>

<script>
import HomeSkeleton from "./components/skeleton/HomeSkeleton.vue";

import { HomeApi } from "@/api/index.js";
import HomeHeader from "./components/header/HomeHeader.vue";
import Swiper from "./components/swiper/Swiper.vue";
import Tip from "./components/tip/Tip.vue";
import HomeNav from "./components/nav/HomeNav.vue";
import HomeVip from "./components/vip/HomeVip.vue";
import FlashBuy from "./components/flash/FlashBuy.vue";
import TabbarGoodsItem from "./components/tabbar/TabbarGoodsItem.vue";

export default {
  name: "Home",
  components: {
    HomeSkeleton,
    HomeHeader,
    Swiper,
    Tip,
    HomeNav,
    HomeVip,
    FlashBuy,
    TabbarGoodsItem,
  },
  created() {
    this.getHomeData();
  },
  data() {
    return {
      sowingList: [], // 首页轮播图数据
      isShowLoading: true, // 是否加载动画
      navList: [],
      flashSalProductList: [], // 限时抢购
      tabbarAllProductList: [],
      specialZone: {}, // 特色专区数据
      homeAd: "", // 首页广告
    };
  },
  computed: {
    goodsList() {
      return this.flashSalProductList.concat(this.tabbarAllProductList);
    },
  },
  methods: {
    getHomeData() {
      HomeApi().then((response) => {
        let data = response.data.data;
        this.sowingList = data.list[0].icon_list;
        this.navList = data.list[2].icon_list;
        this.flashSalProductList = data.list[3].product_list;
        this.tabbarAllProductList = data.list[12].product_list;
        this.isShowLoading = false;
        this.specialZone = data.special_zone;
        this.homeAd = data.home_ad.image_url;
      });
    }
  },
};
</script>
<style lang="less" scoped>
#home {
  position: relative;
  .bg {
    .image {
      position: absolute;
      height: 300px;
      content: normal !important;
    }
  }
}
</style>
