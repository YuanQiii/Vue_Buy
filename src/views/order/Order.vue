<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-23 21:38:54
 * @FilePath: \vue_buy\src\views\order\Order.vue
-->
<template>
  <div class="order">
    <van-nav-bar
      title="填写订单"
      left-arrow
      :fixed="true"
      @click-left="onClickLeft"
    />

    <!-- 选择收货地址 -->
    <van-contact-card
      :type="addressType"
      add-text="选择收货地址"
      :name="orderAddress.name"
      :tel="orderAddress.tel"
      @click="chooseAddress"
      style="margin-top: 3rem"
    />

    <van-cell-group>
      <!-- 送货时间 -->
      <van-cell
        title="送达时间"
        :value="deliveryTime"
        is-link
        @click="showTimePickView"
      >
        <template slot="label">
          <span class="custom-title">超过十分钟可获得积分补偿</span>
          <van-icon name="question-o" />
        </template>
      </van-cell>
      <!-- 送货时间区间选择器 -->
      <OrderTimeInterval
        ref="timeInterval"
        :showDateTimePopView="showDateTimePopView"
        @changeData="changeData(arguments)"
      ></OrderTimeInterval>

      <!-- 商品信息 -->
      <div class="goods-list">
        <div
          class="item"
          v-for="(item, index) in cartList"
          :key="index"
          @click="goToGoodsDetail(item)"
        >
          <div class="left">
            <div>
              <img class="image" :src="item.small_image" alt="" />
            </div>
            <div class="info">
              <div class="name">{{ item.name }}</div>
              <div>
                <span class="single">单价：{{ item.price | moneyFormat }}</span>
                <span class="num">数量：{{ item.cart_num }}</span>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="total">
              {{ (item.price * item.cart_num) | moneyFormat }}
            </div>
          </div>
        </div>
      </div>
    </van-cell-group>

    <!-- 支付方式选择 -->
    <van-radio-group v-model="radio">
      <van-cell-group title="支付方式">
        <van-cell clickable @click="radio = '1'">
          <template slot="title">
            <img
              src="./../../images/order/wx.png"
              alt=""
              width="25px"
              height="25px"
              style="vertical-align: middle; padding-right: 5px"
            />
            <span>微信支付</span>
          </template>
          <van-radio slot="right-icon" name="1" checked-color="#07c160" />
        </van-cell>
        <van-cell clickable @click="radio = '2'">
          <template slot="title">
            <img
              src="./../../images/order/zfb.png"
              alt=""
              width="25px"
              height="25px"
              style="vertical-align: middle; padding-right: 5px"
            />
            <span>支付宝支付</span>
          </template>
          <van-radio slot="right-icon" name="2" checked-color="#07c160" />
        </van-cell>
        <van-cell clickable @click="radio = '3'">
          <template slot="title">
            <img
              src="./../../images/order/hb.png"
              alt=""
              width="25px"
              height="25px"
              style="vertical-align: middle; padding-right: 5px"
            />
            <span>花呗支付</span>
          </template>
          <van-radio slot="right-icon" name="3" checked-color="#07c160" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>

    <!-- 优惠券 -->
    <van-coupon-cell
      :coupons="availableCouponList[0]"
      :disabled-coupons="availableCouponList[1]"
      :chosen-coupon="chosenCoupon"
      @click="showList = true"
    />

    <!-- 支付宝积分 -->
    <van-cell>
      <div slot="title">
        <div class="text">使用{{ userInfo.integral }}支付宝积分支付</div>
        <div class="money">{{ integralToPrice | moneyFormat }}</div>
      </div>

      <van-switch
        slot="right-icon"
        v-model="checked"
        @input="onInput"
        active-color="#07c160"
      />
    </van-cell>

    <!-- 优惠券列表 -->
    <van-popup
      v-model="showList"
      round
      position="bottom"
      style="height: 600px; padding-top: 4px"
    >
      <van-coupon-list
        :coupons="couponList"
        :chosen-coupon="chosenCoupon"
        :disabled-coupons="disabledCouponList"
        :show-exchange-bar="exchangeShow"
        @change="onChange"
      />
    </van-popup>

    <!-- 备注 -->
    <van-cell-group style="margin-top: 0.6rem">
      <van-field
        label="备注"
        type="textarea"
        placeholder="选填,可以告诉我们您的特殊需求"
        rows="1"
        autosize
      />
    </van-cell-group>

    <!-- 商品金额 -->
    <van-cell-group style="margin-top: 0.6rem">
      <van-cell title="商品金额">
        <div class="money">{{ (totalPrice / 100) | moneyFormat }}</div>
      </van-cell>
      <van-cell title="配送费">
        <div class="money">0.00</div>
      </van-cell>
      <van-cell title="积分" v-show="isShowPreferential">
        <div class="integralToMoney">- {{ integralToPrice | moneyFormat }}</div>
      </van-cell>
    </van-cell-group>

    <!-- 提交订单 -->
    <van-submit-bar
      :price="actualPrice"
      :label="payTypes[radio]"
      button-text="提交订单"
      @submit="onSubmit"
    />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

// 送货时间区间组件
import OrderTimeInterval from "./OrderTimeInterval";

export default {
  name: "Order",
  components: {
    OrderTimeInterval,
  },
  data() {
    return {
      radio: "1", // 支付方式
      checked: false, // 积分兑换开关
      isShowPreferential: false, // 展示积分兑换
      showList: false, // 展示优惠列表
      exchangeShow: false,
      deliveryTime: "请选择送达时间",
      showDateTimePopView: false,
      chosenCoupon: -1,
      payTypes: ["", "微信支付", "支付宝支付", "花呗支付"],
    };
  },
  computed: {
    ...mapState("cart", [
      "orderAddress",
      "cartList",
      "couponList",
      "disabledCouponList",
    ]),
    ...mapState("user", ["userInfo"]),
    ...mapGetters("cart", ["totalPrice"]),

    // 根据订单地址数组长度获取到地址页面类型
    addressType() {
      return Object.keys(this.orderAddress).length ? "edit" : "add";
    },

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

    // 计算积分兑换人民币
    integralToPrice() {
      if (this.userInfo.integral > 0) {
        return this.userInfo.integral / 100;
      }
      return 0;
    },

    // 实际价格
    actualPrice() {
      // 如果用户使用积分兑换或使用优惠券
      let finalPrice;
      if (this.checked) {
        let discountsPrice = this.integralToPrice
          .toFixed(2)
          .toString()
          .replace(".", "");
        finalPrice = this.totalPrice - discountsPrice;
      } else {
        finalPrice = this.totalPrice;
      }
      // 是否选择优惠券
      if (this.chosenCoupon > -1) {
        return finalPrice - this.couponList[this.chosenCoupon].value;
      } else {
        return finalPrice;
      }
    },
  },

  methods: {
    // 跳转到商品详情
    goToGoodsDetail(goods) {
      this._goToGoodsDetail(this, goods);
    },

    // 返回到上个界面
    onClickLeft() {
      this.$router.back();
    },
    // 提交订单
    onSubmit() {
      console.log(this.deliveryTime);
      if (!Object.keys(this.orderAddress).length) {
        this.$toast("请选择收货地址");
      } else if (this.deliveryTime === "请选择送达时间") {
        this.$toast(this.deliveryTime);
      } else {
        this.$toast(`${this.deliveryTime}
提交订单`);
      }
    },
    // switch开关
    onInput() {
      let discountsPrice = this.integralToPrice * 100;
      // 判断积分使用条件是否满足
      if (discountsPrice > this.totalPrice) {
        // 不能使用积分
        this.$dialog
          .alert({
            message: "您的实际价格小于积分兑换价格,建议您在多买几件",
          })
          .then(() => {
            this.checked = false;
          });
      } else {
        this.isShowPreferential = !this.isShowPreferential;
      }
    },
    // 选择地址
    chooseAddress() {
      this.$router.push({
        name: "AddressList",
        params: {
          choose: true,
        },
      });
    },
    // 选择优惠券
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },

    // 显示时间选择器
    showTimePickView() {
      this.showDateTimePopView = true;
    },

    // 更新送货时间选择
    changeData() {
      this.showDateTimePopView = arguments[0][0];
      this.deliveryTime = arguments[0][1];
    },
  },
};
</script>
<style lang="less" scoped>
.order {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  margin-bottom: 80px;
  .goods-list {
    .item {
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .left {
        display: flex;
        align-items: center;
        .image {
          width: 64px;
          margin-right: 16px;
          margin-left: -16px;
          content: normal !important;
        }
        .info {
          width: 50vw;
          font-size: 8px;
          color: #999;
          .name {
            font-size: 12.8px;
            color: #000;
          }
        }
      }
    }
  }
  /*转场动画*/
  .router-slider-enter-active,
  .router-slider-leave-active {
    transition: all 0.3s;
  }
  .router-slider-enter,
  .router-slider-leave-active {
    transform: translate3d(32px, 0, 0);
    opacity: 0;
  }

  img {
    content: normal !important;
  }
}
</style>
