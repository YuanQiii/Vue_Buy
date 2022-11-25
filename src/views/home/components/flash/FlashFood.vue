<template>
  <div id="flashFood">
    <div class="flash-item-content" v-if="flashSalProductList">
      <swiper class="item-content" :options="swiperOption">
        <swiper-slide v-for="(product, index) in flashSalProductList" :key="index">
          <div class="item-in-covers" @click="goToGoodsDetail(product)">
            <img v-lazy="product.small_image" class="image" />
            <div class="title">{{ product.name }}</div>
            <div class="price">
              <p class="now-price">{{ product.price | moneyFormat }}</p>
              <p class="origin-price">{{ product.origin_price | moneyFormat }}</p>
              <div class="buy-car" @click.stop="addToCart(product)">
                <van-icon class="cart" color="#28BE57" name="cart-circle" />
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { _addToCart } from "@/utils/addToCart.js";
import { _goToGoodsDetail } from "@/utils/goToGoodsDetail.js";
import { mapMutations } from "vuex";

import { swiper, swiperSlide } from "vue-awesome-swiper"
import 'swiper/dist/css/swiper.css'

export default {
  name: "FlashFood",
  components: {
    swiper,
    swiperSlide
  },
  props: {
    flashSalProductList: {
      type: Array,
      default: [],
    },
  },
  data(){
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 10,
        freeMode: true,
        direction: 'horizontal',
      }
    }
  },
  methods: {
    ...mapMutations("cart", ["ADD_GOODS_CART"]),
    // 商品详情页面
    goToGoodsDetail(goods) {
      // 跳转到商品详情页面并且传值
      goods["isFlash"] = true;
      _goToGoodsDetail(this, goods);
    },
    addToCart(goods) {
      return _addToCart(this, goods);
    },
  },
};
</script>
<style lang="less" scoped>
#flashFood {
  .flash-item-content {
    width: 100%;
    overflow: hidden;
    position: relative;
    .move_dot {
      position: fixed;
      z-index: 100;
      top: 16px;
      height: 32px;
      width: 32px;
      border-radius: 50%;
      img {
        animation: 0.88s mymove ease-in-out;
        width: 48px;
        height: 48px;
        border-radius: 50%;
      }
    }
    .item-content {
      display: flex;
      justify-content: flex-start;
    }
    .item-in-covers {
      // 设置子li的宽度 flex: 0 0 96px;
      align-items: center;
      padding-right: 8px;
      margin-left: 5px;
      .image {
        width: 100%;
        border-radius: 50%;
        // 等比缩小图片来适应元素的尺寸 background-size: contain;
        background-image: url("../../../../images/placeholderImg/product-img-load.png");
        content: normal !important;
      }
      .title {
        padding: 3.2px;
        display: inline-block;
        font-size: .6rem;
        height: 28.8px;
        line-height: 16px;
        font-size: .6rem;
        word-break: break-all;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .price {
        position: relative;
        padding-left: 3px;
        .now-price {
          color: #f37078;
          font-size: .9rem;
        }
        .origin-price {
          font-size: .8rem;
          color: #999999;
          text-decoration: line-through;
          margin-top: -10px;
        }
        .buy-car {
          position: absolute;
          top: 0;
          left: 55px;
          .cart {
            font-size: 1.5rem;
            margin-left: -3.2px;
            margin-top: -3.2px;
          }
        }
      }
    }
  }
}

</style>
