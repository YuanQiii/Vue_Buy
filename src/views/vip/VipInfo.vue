<!--
 * @Autor: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-28 09:50:18
 * @FilePath: \vue_buy\src\views\vip\VipInfo.vue
-->

<template>
  <!-- vip数据信息 -->
  <div class="vip-info" ref="VipInfo">
    <div>
      <!-- 顶部导航栏 -->
      <van-nav-bar
        :border="false"
        :fixed="true"
        @click-left="onClickLeft"
        left-arrow
      >
        <template #title>
          <div class="title">绿卡</div>
        </template>
        <template #left>
          <van-icon name="arrow-left" color="#ffffff" />
        </template>
      </van-nav-bar>
      <div class="vipHeader">
        <img src="../../images/mine/vip.png" alt="" />
      </div>
      <div class="vipPrivilege">
        <p class="title">绿卡特权</p>
        <van-grid :border="false">
          <van-grid-item icon="vip-card-o" text="专享券" />
          <van-grid-item icon="discount" text="专享特价" />
          <van-grid-item icon="gem-o" text="2倍积分" />
          <van-grid-item icon="more-o" text="更多特权" />
        </van-grid>
        <div class="becomVipBtn" @click="goToPayPage">5折开通绿卡</div>
      </div>
      <!-- 第1部分 -->
      <div class="coupons">
        <!--今日专享券 -->
        <span class="number">1</span
        ><span class="desc">绿卡专享券 天天领取优惠</span>
        <p class="todayCouns">今日专享券<i>每天0点更新</i></p>
        <div class="quanBox">
          <div
            class="quan"
            v-for="(item, index) in todayTicket"
            :key="index"
            @click="getCoupons"
          >
            <div class="money"><i>¥</i>{{ item.money }}</div>
            <div class="couponsConditions">满{{ item.pay_min }}元使用</div>
            <div class="couponsScope">{{ item.description }}</div>
            <div class="getCopons">立即领取</div>
          </div>
        </div>
        <!--本周专享券-->
        <p class="todayCouns">本周专享券</p>
        <div class="quanBox">
          <div
            class="quan"
            v-for="(item, index) in weekTicket"
            :key="index"
            @click="getCoupons"
          >
            <div class="money"><i>¥</i>{{ item.money }}</div>
            <div class="couponsConditions">满{{ item.pay_min }}元使用</div>
            <div class="couponsScope">{{ item.description }}</div>
            <div class="getCopons">立即领取</div>
          </div>
        </div>
      </div>
      <!-- 第2部分 -->
      <div class="coupons">
        <span class="number">2</span
        ><span class="desc">绿卡专享券 天天领取优惠</span>
        <div class="integralBox">
          <div class="leftBox">
            <div class="leftBoxTitle">您当前购物</div>
            <div class="leftBoxSubTitle">返积分为<i>1倍</i></div>
          </div>
          <div class="rightBox">
            <div class="rightBoxTitle">开通绿卡购物</div>
            <div class="rightBoxSubTitle">返积分为<i>2倍</i></div>
            <div class="line"></div>
            <img src="../../images/mine/rockets.png" alt="" />
          </div>
        </div>
        <div class="integralToFast" @click="goToPayPage">立即开启积分加速</div>
      </div>
      <!-- 第3部分 -->
      <div class="coupons">
        <span class="number">3</span><span class="desc">立即开启积分加速</span>
        <!-- Vip商品列表 -->
        <vip-goods :vipCateDetail="cateDetail" />
      </div>
    </div>
    <!-- 底部按钮 -->
    <transition name="fade" transiton="fade">
      <div class="bottomJoinVip" v-show="isShowBottomBtn">
        <div class="bottomDesc">
          <span class="yearCart">年卡</span><i>88元</i
          ><span class="originPrice">180元</span>
        </div>
        <div class="joinVip" @click="goToPayPage">开通绿卡</div>
      </div>
    </transition>
  </div>
</template>

<script >
import VipGoods from "./VipGoods.vue";

import { vipApi } from "@/api/index.js";

// 商品列表组件
export default {
  name: "VipInfo",
  components: {
    VipGoods,
  },
  created() {
    // 发送获取vip数据请求
    this.getVip();
  },
  data() {
    return {
      todayTicket: [], //今日更新
      weekTicket: [], // 本周更新
      cate: [], // 分类标题
      cateDetail: [],
      currentSubTitle: 0,
      isShowBottomBtn: false,
    };
  },
  mounted() {
    // 添加滚动事件监听
    let box = this.$refs.VipInfo;
    box.addEventListener(
      "scroll",
      () => {
        this.handleScroll();
      },
      false
    );
  },

  methods: {
    // 返回
    onClickLeft() {
      this.$router.back();
    },

    // vip数据请求
    getVip() {
      vipApi().then((response) => {
        let data = response.data;
        if (data.success) {
          // 设置数据
          this.todayTicket = data.data.today_ticket.tickets;
          this.weekTicket = data.data.week_ticket.tickets;
          this.cate = data.data.cate;
          this.cateDetail = data.data.cate_detail;
        }
      });
    },

    // 领取优惠券
    getCoupons() {
      this.$dialog
        .confirm({
          message: "开通绿卡,立享此券",
          confirmButtonText: "开卡领券",
          confirmButtonColor: "#60b86a",
        })
        .then(() => {
          // 跳转到开通会员界面
          this.$router.push({ name: "VipPay" });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 开通绿卡支付
    goToPayPage() {
      this.$router.push({ name: "VipPay" });
    },
    // 监听页面滑动显示和隐藏底部Button
    handleScroll() {
      var scrollTop = this.$refs.VipInfo.scrollTop;
      if (scrollTop > 500) {
        this.isShowBottomBtn = true;
      } else {
        this.isShowBottomBtn = false;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.vip-info {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #f5f5f5;
  z-index: 100;
  overflow: hidden;
  overflow-y: auto;
  overflow-x: hidden;
  .title {
    color: #ffffff;
  }
  .van-nav-bar {
    background-color: #303747;
    font-size: 9.6px;
    .van-icon {
      color: #ffffff;
    }
  }
  .vipHeader {
    width: 100%;
    height: 160px;
    margin-top: 40px;
    img {
      width: 100%;
      height: 100%;
      content: normal !important;
    }
  }
  .vipPrivilege {
    background-color: #ffffff;
    padding-top: 16px;
    padding-bottom: 9.6px;
    .title {
      padding-left: 16px;
      font-size: 16px;
      color: black;
      font-weight: bolder;
    }
    .becomVipBtn {
      margin-top: 8px;
      width: 60%;
      height: 40px;
      line-height: 40px;
      background-color: #303747;
      text-align: center;
      border-radius: 32px;
      margin: 0 auto;
      color: #5fa85f;
      font-size: 14.4px;
      font-weight: bold;
    }
  }
  .coupons {
    margin-top: 16px;
    width: 100%;
    background-color: #ffffff;
    padding-left: 16px;
    padding-top: 16px;
    padding-bottom: 16px;
    .number {
      width: 16px;
      height: 16px;
      line-height: 16px;
      background-color: #60b86a;
      color: white;
      padding: 0 4.8px;
      border-radius: 1.6px;
    }
    .desc {
      font-size: 16px;
      padding-left: 8px;
      color: black;
      font-weight: bolder;
    }
    .todayCouns {
      padding-top: 16px;
      font-size: 11.2px;
      i {
        color: grey;
        padding-left: 6.4px;
      }
    }
    .quanBox {
      display: flex;
      justify-content: flex-start;
      flex-flow: wrap;
      min-height: 64px;
      .quan {
        padding-left: 9.6px;
        position: relative;
        margin-top: 9.6px;
        margin-right: 5%;
        width: 40%;
        height: 80px;
        border-left: 2px dashed #60b86a;
        border-top: 1px solid #60b86a;
        border-bottom: 1px solid #60b86a;
        border-radius: 0 2px 2px 0;
        .getCopons {
          position: absolute;
          right: 0;
          top: 0;
          font-size: 11.2px;
          color: #ffffff;
          writing-mode: vertical-rl;
          border-radius: 0 2px 2px 0;
          width: 22.4px;
          height: 80px;
          line-height: 24px;
          text-align: center;
          background-color: #60b86a;
        }
        .money {
          color: #60b86a;
          font-size: 32px;
          i {
            font-size: 16px;
            margin-right: 4.8px;
          }
        }
        .couponsConditions {
          font-size: 11.2px;
          color: #565656;
        }
        .couponsScope {
          padding-top: 6.4px;
          font-size: 11.2px;
          width: 90%;
          color: #60b86a;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .integralBox {
      margin-top: 9.6px;
      padding-right: 32px;
      display: flex;
      .leftBox {
        width: 38%;
        height: 0;
        border-right: 64px solid transparent;
        border-top: 56px solid #dbdbdb;
        border-radius: 8px 0 0 0;
        .leftBoxTitle {
          margin-top: -52.8px;
          margin-left: 16px;
          font-size: 8px;
          color: black;
        }
        .leftBoxSubTitle {
          margin-left: 16px;
          // padding-top: 1.6px;
          font-size: 11.2px;
          i {
            color: black;
            font-size: 14.4px;
          }
        }
      }
      .rightBox {
        position: relative;
        width: 38%;
        height: 0;
        border-left: 64px solid transparent;
        border-top: 56px solid #6bbe66;
        transform: rotateX(180deg);
        margin-left: -51.2px;
        border-top-right-radius: 8px;
        .rightBoxTitle {
          margin-top: -19.2px;
          font-size: 8px;
          color: black;
          transform: rotateX(-180deg);
        }
        .rightBoxSubTitle {
          margin-top: -33.6px;
          transform: rotateX(-180deg);
          font-size: 11.2px;
          i {
            color: black;
            font-size: 14.4px;
          }
        }
        .line {
          margin-top: -32px;
          margin-left: -130%;
          width: 190%;
          height: 8px;
          background-image: linear-gradient(to left, #fbec53, #7affaf);
          border-radius: 4.8px;
        }
        img {
          top: -36.8px;
          right: -19.2px;
          position: absolute;
          transform: rotateX(-180deg);
          width: 48px;
          height: 48px;
          content: normal !important;
        }
      }
    }
    .integralToFast {
      width: 60%;
      height: 40px;
      line-height: 40px;
      background-color: #303747;
      text-align: center;
      border-radius: 32px;
      margin: 0 auto;
      color: #5fa85f;
      font-size: 14.4px;
      margin-top: 8px;
      font-weight: bold;
    }
    .vipSubTitleWrapper {
      width: 100%;
      height: 44.8px;
      display: inline-block;
      white-space: nowrap;
      border-bottom: solid 0.16px #e8e9e8;
      overflow: hidden;
      background-color: white;
      .vipTitle {
        display: inline-block;
        font-size: 11.68px;
        padding: 16px;
      }
      .selected {
        color: #3cb963;
      }
    }
  }
  .bottomJoinVip {
    position: fixed;
    display: flex;
    bottom: 9.6px;
    height: 40px;
    width: 90%;
    left: 5%;
    right: 5%;
    z-index: 999;
    border-radius: 24px;
    .bottomDesc {
      background-color: #303747;
      width: 70%;
      border-radius: 24px 0 0 24px;
      height: 40px;
      line-height: 40px;
      justify-content: flex-start;
      padding-left: 16px;
      color: white;
      font-size: 12.8px;
      i {
        padding-left: 3.2px;
        padding-right: 3.2px;
        color: #f2525a;
      }
      .originPrice {
        font-size: 9.6px;
        text-decoration: line-through;
      }
    }
    .joinVip {
      text-align: center;
      width: 30%;
      height: 40px;
      line-height: 40px;
      background-color: #3cb963;
      border-radius: 0 24px 24px 0;
      color: white;
      font-size: 12.8px;
    }
    .fade-enter {
      opacity: 0;
    }
    .fade-enter-active {
      transition: opacity 3s;
    }
    .fade-leave-to {
      opacity: 0;
    }
    .fade-leave-active {
      transition: opacity 3s;
    }
  }
}
</style>
