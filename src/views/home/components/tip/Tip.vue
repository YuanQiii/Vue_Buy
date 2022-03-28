<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-17 20:26:50
 * @FilePath: \mall-vue\src\views\home\components\tip\tip.vue
-->
<template>
  <div class="tip">
    <div class="text">
      <div class="tipBox">
        <img class="image" src="../../../../images/icon/transport.png" alt="" />
        <span class="tipText">{{ text[0] }}</span>
      </div>
      <div class="tipBox">
        <img class="image" src="../../../../images/icon/money.png" alt="" />
        <span class="tipText">{{ text[1] }}</span>
      </div>
      <div class="tipBox">
        <img class="image" src="../../../../images/icon/seal.png" alt="" />
        <span class="tipText">{{ text[2] }}</span>
      </div>
    </div>
    <div class="ad">
      <img class="image" :src="homeAd" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Tip",
  props: {
    // 父组件传递过来的数据
    homeAd: String,
  },
  data() {
    return {
      text: ["最快29分钟内送达", "0元起送 0配送费", "安心退"],
    };
  },
};
</script>

<style lang="less" scoped>
.tip {
  .text {
    display: flex;
    justify-content: space-around;
    margin-top: 0.4rem;
    margin-bottom: -0.4rem;
    .tipBox {
      font-size: 0.5rem;
      z-index: 9;
      position: relative;
      color: #45c763;
      .image {
        width: 1rem;
        height: 1rem;
        position: relative;
        top: 0.2rem;
        margin-right: 0.3rem;
      }
    }
  }
  .ad {
    .image {
      width: 100vw;
      margin-top: 1.2rem;
    }
  }
}
</style>
