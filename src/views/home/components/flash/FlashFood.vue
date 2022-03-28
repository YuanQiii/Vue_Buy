<template>
  <div id="flashFood">
    <div class="flash-item-content" v-if="flashSalProductList">
      <ul class="item-content" ref="ulContent">
        <li
          class="item-in-covers"
          v-for="(product, index) in flashSalProductList"
          :key="index"
          ref="productItem"
          @click="goToGoodsDetail(product)"
        >
          <img v-lazy="product.small_image" class="image" />
          <span class="title">{{ product.name }}</span>
          <div class="price">
            <p class="now-price">{{ product.price | moneyFormat }}</p>
            <p class="origin-price">{{ product.origin_price | moneyFormat }}</p>
            <div class="buy-car" @click.stop="addToCart(product)">
              <van-icon class="cart" color="#28BE57" name="cart-circle" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// 引入第三方组件
import BScroll from "better-scroll";
import { _addToCart } from "@/utils/addToCart.js";
import { _goToGoodsDetail } from "@/utils/goToGoodsDetail.js";
import { mapMutations } from "vuex";

export default {
  name: "FlashFood",
  props: {
    flashSalProductList: {
      type: Array,
      default: [],
    },
  },
  updated() {
    this.$nextTick(() => {
      let contentWidth = 0;
      let el = this.$refs.productItem;
      for (let i = 0; i < el.length; i++) {
        contentWidth += el[i].clientWidth;
      }
      // 给ul设置值
      this.$refs.ulContent.style.width = contentWidth + "px";
      if (!this.scroll) {
        // 名字一定要唯一 和父组件独立
        this.scroll = new BScroll(".flash-item-content", {
          probeType: 2,
          startX: 0,
          click: true,
          scrollX: true,
          scrollY: false,
          eventPassthrough: "vertical",
        });
      } else {
        this.scroll.refresh();
      }
    });
  },
  methods: {
    ...mapMutations("cart", ["ADD_GOODS_CART"]),
    // 商品详情页面
    goToGoodsDetail(goods) {
      // 跳转到商品详情页面并且传值
      goods["isFlash"] = true;
      let tempGoods = goods;
      _goToGoodsDetail(this, tempGoods);
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
      top: 1rem;
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      img {
        animation: 0.88s mymove ease-in-out;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
      }
    }
    .item-content {
      display: flex;
      justify-content: flex-start;
    }

    .item-in-covers {
      // 设置子li的宽度
      flex: 0 0 6rem;
      align-items: center;
      padding-right: 0.5rem;
      .image {
        width: 100%;
        border-radius: 50%;
        // 等比缩小图片来适应元素的尺寸
        background-size: contain;
        background-image: url("../../../../images/placeholderImg/product-img-load.png");
      }
      .title {
        padding: 0.2rem;
        display: inline-block;
        font-size: 0.6258rem;
        height: 1.8rem;
        line-height: 1rem;
        font-size: 0.625rem;
        word-break: break-all;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .price {
        position: relative;
        padding-left: 0.5rem;
        .now-price {
          color: #f37078;
          font-size: 0.928rem;
        }
        .origin-price {
          font-size: 0.6875rem;
          color: #999999;
          text-decoration: line-through;
        }
        .buy-car {
          position: absolute;
          right: 0.6rem;
          top: 0.1rem;
          width: 1.5rem;
          height: 1.5rem;
          .cart {
            font-size: 1.5rem;
            margin-left: -0.2rem;
            margin-top: -0.2rem;
          }
        }
      }
    }
  }
}
</style>
