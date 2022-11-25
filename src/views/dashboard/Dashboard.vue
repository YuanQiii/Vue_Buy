<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-15 21:52:02
 * @FilePath: \vue_buy\src\views\dashboard\Dashboard.vue
-->
<template>
  <div>
    <div class="contain" id="contain">
      <transition name="router-slider" mode="out-in">
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </div>
    <!-- 底部导航 -->
    <van-tabbar
      :value="homeActive"
      class="active_tab"
      active-color="#28BE57"
      swipeable
      animated
    >
      <van-tabbar-item
        v-for="(value, index) in tabbars"
        :key="index"
        :icon="value.icon"
        :badge="value.badge"
        @click="tab(value.name)"
        ><span>{{ value.title }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "DashBoard",
  computed: {
    ...mapState(["homeActive"]),
    ...mapState("cart", ["cartList"]),

    // 购物车商品数量
    goodsNum() {
      let num = this.cartList.length;
      return num ? num : "";
    },

    // 导航数组
    tabbars() {
      return [
        {
          name: "home",
          title: "主页",
          icon: "home-o",
          badge: "",
        },
        {
          name: "category",
          title: "分类",
          icon: "apps-o",
          badge: "",
        },
        {
          name: "eat",
          title: "吃货",
          icon: "birthday-cake-o",
          badge: "",
        },
        {
          name: "cart",
          title: "购物车",
          icon: "shopping-cart-o",
          badge: this.goodsNum,
        },
        {
          name: "mine",
          title: "我的",
          icon: "user-o",
          badge: "",
        },
      ];
    },
  },
  methods: {
    // 跳转界面
    tab(name) {
      this.$router.push({ name });
    },
  },
};
</script>

<style lang="less" scoped>
.contain {
  display: block;
  width: 100vw;
  height: 92vh;
  overflow: scroll;
}

.active_tab {
  width: 100vw;
  height: 8vh;
}
/*转场动画*/
.router-slider-enter-active,
.router-slider-leave-active {
  transition: all 0.15s;
}
.router-slider-enter,
.router-slider-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}

/*转场动画*/
.router-slider-enter,
.router-slider-leave-active {
  transform: translate3d(0, 0, 1rem);
  opacity: 0;
}
</style>
