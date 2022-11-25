<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-17 21:20:04
 * @FilePath: \mall-vue\src\views\home\components\flash\FlashBuy.vue
-->
<template>
  <div class="flash-buy">
    <div class="title-content">
      <div class="title">限时抢购</div>
      <van-count-down :time="time" class="count-style" format="HH mm ss">
        <template v-slot="timeData">
          <span class="item">{{ timeData.hours }}</span>
          <span class="item">{{ timeData.minutes }}</span>
          <span class="item">{{ timeData.seconds }}</span>
        </template>
      </van-count-down>
    </div>
    <!-- 限时抢购商品 遍历父组件传来的数据并传递给子组件-->
    <FlashFood :flashSalProductList="flashSalProductList" />
  </div>
</template>

<script>
import FlashFood from "./FlashFood";

export default {
  name: "FlashBuy",
  components: {
    FlashFood,
  },
  props: {
    flashSalProductList: Array,
  },
  data() {
    return {
      // 倒计时时间设置
      time: 30 * 60 * 1000 * 100,
    };
  },
};
</script>

<style lang="less" scoped>
.flash-buy {
  margin-top: 20px;
  background-color: white;
  .title-content {
    margin-left: 10px;
  }
}
.title {
  display: inline-block;
  border-left: 4px #3cb963 solid;
  padding-left: 5px;
  height: 21px;
  line-height: 21px;
  vertical-align: middle;
  font-size: 1.2rem;
  float: left;
}
.item {
  display: inline-block;
  width: 22px;
  margin-right: 5px;
  color: #fff;
  font-size: 12px;
  text-align: center;
  background-color: black;
}
.count-style {
  float: left;
  margin-left: 11.2px;
}

</style>
