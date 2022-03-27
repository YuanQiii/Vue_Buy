
<template>
  <div class="vip-info" ref="VipInfo">
    <div>
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
    <transition name="fade">
      <div class="bottomJoinVip" v-show="isShowBottomBtn" transiton="fade">
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

import { vipApi } from "@/api/index";

// 商品列表组件
export default {
  name: "VipInfo",
  components: {
    VipGoods,
  },
  created() {
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
    // 初始化数据
    // this._initData();
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

    // 数据请求
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
    font-size: 0.6rem;
    .van-icon {
      color: #ffffff;
    }
  }
  .vipHeader {
    width: 100%;
    height: 10rem;
    margin-top: 2.5rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .vipPrivilege {
    background-color: #ffffff;
    padding-top: 1rem;
    padding-bottom: 0.6rem;
    .title {
      padding-left: 1rem;
      font-size: 1rem;
      color: black;
      font-weight: bolder;
    }
    .becomVipBtn {
      margin-top: 0.5rem;
      width: 60%;
      height: 2.5rem;
      line-height: 2.5rem;
      background-color: #303747;
      text-align: center;
      border-radius: 2rem;
      margin: 0 auto;
      color: #5fa85f;
      font-size: 0.9rem;
      font-weight: bold;
    }
  }
  .coupons {
    margin-top: 1rem;
    width: 100%;
    background-color: #ffffff;
    padding-left: 1rem;
    padding-top: 1rem;
    padding-bottom: 1rem;
    .number {
      width: 1rem;
      height: 1rem;
      line-height: 1rem;
      background-color: #60b86a;
      color: white;
      padding: 0 0.3rem;
      border-radius: 0.1rem;
    }
    .desc {
      font-size: 1rem;
      padding-left: 0.5rem;
      color: black;
      font-weight: bolder;
    }
    .todayCouns {
      padding-top: 1rem;
      font-size: 0.7rem;
      i {
        color: grey;
        padding-left: 0.4rem;
      }
    }
    .quanBox {
      display: flex;
      justify-content: start;
      flex-flow: wrap;
      min-height: 4rem;
      .quan {
        padding-left: 0.6rem;
        position: relative;
        margin-top: 0.6rem;
        margin-right: 5%;
        width: 40%;
        height: 5rem;
        border-left: 2px dashed #60b86a;
        border-top: 1px solid #60b86a;
        border-bottom: 1px solid #60b86a;
        border-radius: 0 2px 2px 0;
        .getCopons {
          position: absolute;
          right: 0;
          top: 0;
          font-size: 0.7rem;
          color: #ffffff;
          writing-mode: vertical-rl;
          border-radius: 0 2px 2px 0;
          width: 1.4rem;
          height: 5rem;
          line-height: 1.5rem;
          text-align: center;
          background-color: #60b86a;
        }
        .money {
          color: #60b86a;
          font-size: 2rem;
          i {
            font-size: 1rem;
            margin-right: 0.3rem;
          }
        }
        .couponsConditions {
          font-size: 0.7rem;
          color: #565656;
        }
        .couponsScope {
          padding-top: 0.4rem;
          font-size: 0.7rem;
          width: 90%;
          color: #60b86a;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
    .integralBox {
      margin-top: 0.6rem;
      padding-right: 2rem;
      display: flex;
      .leftBox {
        width: 38%;
        height: 0;
        border-right: 4rem solid transparent;
        border-top: 3.5rem solid #dbdbdb;
        border-radius: 0.5rem 0 0 0;
        .leftBoxTitle {
          margin-top: -3.3rem;
          margin-left: 1rem;
          font-size: 0.5rem;
          color: black;
        }
        .leftBoxSubTitle {
          margin-left: 1rem;
          // padding-top: 0.1rem;
          font-size: 0.7rem;
          i {
            color: black;
            font-size: 0.9rem;
          }
        }
      }
      .rightBox {
        position: relative;
        width: 38%;
        height: 0;
        border-left: 4rem solid transparent;
        border-top: 3.5rem solid #6bbe66;
        transform: rotateX(180deg);
        margin-left: -3.2rem;
        border-top-right-radius: 0.5rem;
        .rightBoxTitle {
          margin-top: -1.2rem;
          font-size: 0.5rem;
          color: black;
          transform: rotateX(-180deg);
        }
        .rightBoxSubTitle {
          margin-top: -2.1rem;
          transform: rotateX(-180deg);
          font-size: 0.7rem;
          i {
            color: black;
            font-size: 0.9rem;
          }
        }
        .line {
          margin-top: -2rem;
          margin-left: -130%;
          width: 190%;
          height: 0.5rem;
          background-image: linear-gradient(to left, #fbec53, #7affaf);
          border-radius: 0.3rem;
        }
        img {
          top: -2.3rem;
          right: -1.2rem;
          position: absolute;
          transform: rotateX(-180deg);
          width: 3rem;
          height: 3rem;
        }
      }
    }
    .integralToFast {
      width: 60%;
      height: 2.5rem;
      line-height: 2.5rem;
      background-color: #303747;
      text-align: center;
      border-radius: 2rem;
      margin: 0 auto;
      color: #5fa85f;
      font-size: 0.9rem;
      margin-top: 0.5rem;
      font-weight: bold;
    }
    .vipSubTitleWrapper {
      width: 100%;
      height: 2.8rem;
      display: inline-block;
      white-space: nowrap;
      border-bottom: solid 0.01rem #e8e9e8;
      overflow: hidden;
      background-color: white;
      .vipTitle {
        display: inline-block;
        font-size: 0.73rem;
        padding: 1rem;
      }
      .selected {
        color: #3cb963;
      }
    }
  }
  .bottomJoinVip {
    position: fixed;
    display: flex;
    bottom: 0.6rem;
    height: 2.5rem;
    width: 90%;
    left: 5%;
    right: 5%;
    z-index: 999;
    border-radius: 1.5rem;
    .bottomDesc {
      background-color: #303747;
      width: 70%;
      border-radius: 1.5rem 0 0 1.5rem;
      height: 2.5rem;
      line-height: 2.5rem;
      justify-content: flex-start;
      padding-left: 1rem;
      color: white;
      font-size: 0.8rem;
      i {
        padding-left: 0.2rem;
        padding-right: 0.2rem;
        color: #f2525a;
      }
      .originPrice {
        font-size: 0.6rem;
        text-decoration: line-through;
      }
    }
    .joinVip {
      text-align: center;
      width: 30%;
      height: 2.5rem;
      line-height: 2.5rem;
      background-color: #3cb963;
      border-radius: 0 1.5rem 1.5rem 0;
      color: white;
      font-size: 0.8rem;
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
