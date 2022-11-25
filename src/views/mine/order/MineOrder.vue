<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-21 22:02:35
 * @FilePath: \vue_buy\src\views\mine\order\MineOrder.vue
-->
<template>
  <div class="mine-order">
    <div class="top" @click="goToOrder(0)">
      <div class="order">
        <van-icon size="1.3rem" name="label" color="#28be57" />
        <div class="text">我的订单</div>
      </div>
      <div class="text">查看全部订单 &gt;</div>
    </div>
    <div class="bottom">
      <div class="item" @click="goToOrder(0)">
        <van-icon size="1.5rem" name="cart-circle-o" />
        <div class="text">待支付</div>
      </div>
      <div class="item" @click="goToOrder(1)">
        <van-icon size="1.5rem" name="gift-o" />
        <div class="text">待收货</div>
      </div>
      <div class="item" @click="goToOrder(2)">
        <van-icon size="1.5rem" name="smile-comment-o" />
        <div class="text">待评价</div>
      </div>
      <div class="item" @click="goToOrder(3)">
        <van-icon size="1.5rem" name="cash-back-record" />
        <div class="text">售后/退款</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MineOrder",
  methods: {
    goToOrder(index) {
      this.$router.push({
        name: "MineOrderStatus",
        params: {
          index,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.mine-order {
  padding: 16px;
  background-color: #fff;
  .top {
    display: flex;
    justify-content: space-between;
    font-size: 16px;
    color: #999;
    .order {
      display: flex;
      align-items: center;
      .text {
        color: #000;
      }
    }
  }
  .bottom {
    margin-top: 16px;
    padding-left: 16px;
    padding-right: 16px;
    display: flex;
    justify-content: space-between;
    text-align: center;
    .text {
      font-size: 16px;
      color: #999;
    }
  }
}
</style>