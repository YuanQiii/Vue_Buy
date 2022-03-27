<!--
 * @Author: your name
 * @Date: 2022-03-23 13:57:24
 * @LastEditTime: 2022-03-23 14:22:49
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue_buy\src\views\mine\coupon\CouponList.vue
-->
<template>
  <div class="coupon-list">
    <van-nav-bar
      title="我的优惠券"
      :fixed="true"
      :border="false"
      @click-left="onClickLeft"
      left-arrow
      style="height: 2.5rem"
    />
    <!--优惠券列表-->
    <van-coupon-list
      :coupons="availableCouponList[0]"
      :disabled-coupons="availableCouponList[1]"
      style="margin-top: 3rem"
      input-placeholder="请输入123兑换"
      @exchange="onExchange"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "CouponList",
  data() {
    return {};
  },
  computed: {
    ...mapState("cart", ["couponList"]),
    availableCouponList() {
      let arr = [[], []];
      this.couponList.forEach((element) => {
        if (element.available) {
          arr[0].push(element);
        } else {
          arr[1].push(element);
        }
      });
      return arr;
    },
  },
  methods: {
    ...mapMutations("cart", ["ADD_COUPON"]),
    // 返回到上个界面
    onClickLeft() {
      this.$router.back();
    },

    onExchange(code) {
      // 兑换优惠券
      if (code == "123") {
        let time = new Date().getTime();
        let yearTime = 31536000000;
        let coupon = {
          id: time,
          available: 1,
          condition: "无使用门槛\n最多优惠2元",
          reason: "",
          value: 200,
          name: "优惠券",
          startAt: time,
          endAt: time + yearTime,
          valueDesc: "2",
          unitDesc: "元",
        };
        this.ADD_COUPON(coupon);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.coupon-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 999;
  .van-nav-bar__title {
    color: black;
  }
  .van-icon {
    color: #dedede;
  }
}
</style>