<!--
 * @Autor: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-28 09:50:18
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
      :input-placeholder="'请输入 ' + keyword + ' 兑换'"
      @exchange="onExchange"
    />
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "CouponList",
  data(){
    return {
      keyword: '优惠券'
    }
  },
  computed: {
    ...mapState("cart", ["couponList"]),

    // 可用与不可用优惠券分类
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
      if (code === this.keyword) {
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