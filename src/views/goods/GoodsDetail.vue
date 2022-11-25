<!--
 * @Autor: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-28 09:50:18
 * @FilePath: \vue_buy\src\views\goods\GoodsDetail.vue
-->
<template>
  <div class="goods-detail">
    <!-- 顶部导航 -->
    <van-nav-bar
      title="商品详情"
      :fixed="true"
      left-arrow
      @click-left="onClickLeft"
    >
    </van-nav-bar>
    <div class="goods-detail-content">
      <!-- 商品图 -->
      <div class="goods-mage">
        <img :src="currentGoodsDetail.small_image" alt="" class="image" />
      </div>
      <!-- 限时抢购  -->
      <div class="flash" v-show="currentGoodsDetail.isFlash">
        <div class="flash-left">
          <span>限时抢购</span>
          <i>抢购中</i>
        </div>
        <div class="flash-right">
          <span>距结束'</span>
          <!-- 倒计时 -->
          <van-count-down :time="time" class="countStyle" format="HH mm ss">
            <template v-slot="timeData">
              <span class="item">{{ timeData.hours }}</span>
              <i>:</i>
              <span class="item">{{ timeData.minutes }}</span>
              <i>:</i>
              <span class="item">{{ timeData.seconds }}</span>
            </template>
          </van-count-down>
        </div>
      </div>
      <!-- 商品名称 -->
      <div class="product-info">
        <div class="title">{{ currentGoodsDetail.name }}</div>
        <div class="sub-title">{{ currentGoodsDetail.spec }}</div>
        <span class="origin-price">{{
          currentGoodsDetail.origin_price | moneyFormat
        }}</span>
        <span class="price">{{ currentGoodsDetail.price }}</span>
        <span class="total-sales"
          >已售:{{ currentGoodsDetail.total_sales }}</span
        >
        <van-divider />
        <div class="shipping-info">
          <van-icon
            name="cluster-o"
          />此商品按500g/份计价,如实收少于500g将退还差价
        </div>
        <van-divider />
        <div class="shipping-info">
          <van-icon name="clock-o" />最快29分钟内送达
        </div>
      </div>
      <!-- 规格 -->
      <div class="specifications">
        <div class="specifications-title">规格</div>
        <van-divider dashed />
        <div class="conditions">
          <span>保存条件</span>
          <span class="conditionsOne">冷藏</span>
        </div>
        <van-divider dashed />
        <div class="conditions">
          <span>保质期</span>
          <span class="conditionsTwo">15天</span>
        </div>
        <van-divider dashed />
      </div>
      <div class="show-goods">
        <img :src="currentGoodsDetail.small_image" alt="" />
        <img :src="goodsImage" alt="" />
      </div>

      <!-- 底部商品导航    -->
      <van-goods-action :safe-area-inset-bottom="true" style="z-index: 100">
        <van-goods-action-icon
          icon="cart-o"
          :badge="goodsNum"
          @click="onClickCar"
        />
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="onClickAddToCar"
        />
      </van-goods-action>
    </div>

    <!-- 回到顶部按钮 -->
    <!-- <v-top /> -->
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import { _addToCart } from "@/utils/addToCart";

export default {
  name: "GoodsDetail",
  data() {
    return {
      // 倒计时时间设置
      time: 30 * 60 * 1000 * 100,
      // 是否是限时抢购
      isFlash: false,
      goodsImage:
        "https://img.ddimg.mobi/3f280ff77ab3d1571213379189.jpg?width=750&height=1869",
    };
  },

  computed: {
    ...mapState("cart", ["cartList"]),
    ...mapState(["currentGoodsDetail"]),

    // 购物车商品数量
    goodsNum() {
      let num = this.cartList.length;
      return num ? num : "";
    },
  },
  methods: {
    ...mapMutations("cart", ["ADD_GOODS_CART"]),
    ...mapMutations(["UPDATE_CURRENT_GOODS_DETAIL"]),
    // 返回
    onClickLeft() {
      this.$router.back();
    },
    // 加入购物车
    onClickAddToCar() {
      _addToCart(this, this.currentGoodsDetail);
    },
    // 跳转到购物车
    onClickCar() {
      this.$router.push({ name: "cart" });
    },
  },
};
</script>
<style lang="less" scoped>
.goods-detail {
  background-color: #f5f5f5;
  .goods-detail-content {
    overflow: hidden;
    margin-top: 43.2px;
    .goods-mage {
      width: 100%;
      .image {
        width: 100%;
        height: 80%;
        content: normal !important;
      }
    }
    .flash {
      display: flex;
      flex: 1;
      width: 100%;
      height: 32px;
      line-height: 32px;
      .flash-left {
        width: 55%;
        background-color: #e25450;
        span {
          font-size: .8rem;
          color: #ffffff;
          padding-left: 16px;
        }
        i {
          padding-left: 9.6px;
          font-size: .5rem;
          color: #ffffff;
        }
      }
      .flash-right {
        width: 45%;
        background-color: #fcefe9;
        height: 32px;
        line-height: 32px;
        padding-left: 8px;
        font-size: .5rem;
        color: #e25450;
        .countStyle {
          display: inline;
          margin-left: 4.8px;
          .item {
            display: inline-block;
            width: 22px;
            margin-right: 5px;
            color: #fff;
            font-size: 12px;
            text-align: center;
            background-color: #e25450;
          }
          i {
            color: #e25450;
            padding-right: 3.2px;
          }
        }
      }
    }
    .product-info {
      background-color: white;
      padding: 8px;
      .title {
        color: black;
        font-size: .8rem;
      }
      .sub-title {
        padding: 8px 0;
        color: grey;
        font-size: .6rem;
      }
      .origin-price {
        color: #e25450;
        padding-right: 8px;
        font-size: .8rem;
      }
      .price {
        color: grey;
        font-size: .5rem;
        text-decoration: line-through;
      }
      .total-sales {
        float: right;
        color: #e25450;
        font-size: .8rem;
      }
      .shipping-info {
        font-size: .6rem;
        height: 12.8px;
        color: grey;
      }
    }
    .specifications {
      width: 100%;
      background-color: white;
      margin-top: 16px;
      padding-left: 8px;
      .specifications-title {
        padding-top: 16px;
        font-size: 1rem;
        color: black;
      }
      .conditions {
        font-size: .6rem;
        height: 16px;
        color: grey;
        .conditionsOne {
          padding-left: 32px;
        }
        .conditionsTwo {
          padding-left: 40px;
        }
      }
    }
    .show-goods {
      width: 100%;
      img {
        width: 100%;
        content: normal !important;
      }
    }
  }
}

</style>
