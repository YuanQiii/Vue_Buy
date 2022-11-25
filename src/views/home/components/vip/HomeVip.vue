<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-17 21:09:44
 * @FilePath: \vue_buy\src\views\home\components\vip\HomeVip.vue
-->
<template>
  <div class="vip-page" @click="goToVip">
    <van-icon name="vip-card-o" class="icon" size="1.5rem" color="#ffffff" />
    <span class="title">{{ text[0] }}</span>
    <span class="subTitle">{{ text[1] }}</span>
  </div>
</template>

<script>
export default {
  name: "HomeVip",
  data() {
    return {
      text: ["加入会员-每年预计节省806元", "五折开卡>"],
    };
  },
  methods: {
    // 跳转到vip详情页面
    goToVip() {
      this.$router.push({
        name: "VipInfo",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.vip-page {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 8px auto;
  height: 32px;
  background-color: #3bba63;
  width: 95%;
  border-radius: 3.2px;
  opacity: 0.9;
  .icon {
    margin-left: 8px;
  }
  .title {
    margin-left: 8px;
    font-size: 9.6px;
    color: white;
  }
  .subTitle {
    margin-left: auto;
    margin-right: 8px;
    font-size: 9.6px;
    color: white;
  }
}
</style>
