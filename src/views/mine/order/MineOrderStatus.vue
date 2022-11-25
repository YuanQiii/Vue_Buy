<!--
 * @Author: your name
 * @Date: 2022-03-24 12:49:42
 * @LastEditTime: 2022-03-24 13:01:54
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue_buy\src\views\mine\order\MineOrderStatus.vue
-->
<template>
  <div class="mine-order-status">
    <van-nav-bar
      title="我的订单"
      :border="false"
      :fixed="true"
      @click-left="onClickLeft"
      left-arrow
      style="height: 2.5rem"
    />
    <van-tabs
      v-model="active"
      animated
      swipeable
      sticky
      :border="false"
      :offset-top="47"
      ref="tabs"
      type="line"
      color="#28BE57"
      title-active-color="#28BE57"
      animated:yes
    >
      <!-- 全部 -->
      <van-tab>
        <div slot="title">
          <span>{{ itemsTitle[0] }}</span>
        </div>
        <div>
          <img src="../../../images/mine/noData.jpeg" alt="" />
          <div class="desc">暂时还没有相关订单</div>
        </div>
      </van-tab>
      <!-- 待支付 -->
      <van-tab>
        <div slot="title">
          <span>{{ itemsTitle[1] }}</span>
        </div>
        <div>
          <img src="../../../images/mine/noData.jpeg" alt="" />
          <div class="desc">暂时还没有相关订单</div>
        </div>
      </van-tab>
      <!-- 待收货 -->
      <van-tab>
        <div slot="title">
          <span>{{ itemsTitle[2] }}</span>
        </div>
        <div>
          <img src="../../../images/mine/noData.jpeg" alt="" />
          <div class="desc">暂时还没有相关订单</div>
        </div>
      </van-tab>
      <!-- 待评价-->
      <van-tab>
        <div slot="title">
          <span>{{ itemsTitle[3] }}</span>
        </div>
        <div>
          <img src="../../../images/mine/noData.jpeg" alt="" />
          <div class="desc">暂时还没有相关订单</div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
export default {
  name: "MineOrderStatus",
  data() {
    return {
      itemsTitle: ["全部", "待支付", "待收货", "待评价"],
    };
  },
  computed: {
    active: {
      get() {
        return this.$route.params.index;
      },
      set() {},
    },
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.mine-order-status {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  background-color: #f5f5f5;
  .van-icon {
    color: #dedede;
  }
  .desc {
    text-align: center;
  }
  .title {
    img {
      content: normal !important;
    }
  }
}
</style>
