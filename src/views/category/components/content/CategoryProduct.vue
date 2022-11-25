
<template>
  <div class="category-product">
    <div class="left" @click="goToGoodsDetail">
      <img class="image" v-lazy="productDetail.small_image" alt="" />
    </div>
    <div class="right" @click="goToGoodsDetail">
      <div class="title">
        {{ productDetail.product_name }}
      </div>
      <div class="spec">
        {{ productDetail.spec }}
      </div>
      <div class="price">
        <p class="new-price">{{ productDetail.price | moneyFormat }}</p>
        <p class="origin-price">
          {{ productDetail.origin_price | moneyFormat }}
        </p>
      </div>
    </div>
    <div class="cart" @click="addToCart(productDetail)">
      <van-icon name="cart-circle" color="#28BE57" size="1.7rem" />
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { _addToCart } from "@/utils/addToCart";
import { _goToGoodsDetail } from "@/utils/goToGoodsDetail";
export default {
  name: "CategoryProduct",
  props: {
    productDetail: {
      type: Object,
      default: {},
    },
  },
  methods: {
    ...mapMutations("cart", ["ADD_GOODS_CART"]),

    // 跳转到商品详情
    goToGoodsDetail() {
      _goToGoodsDetail(this, this.productDetail);
    },

    // 添加到购物车
    addToCart(goods) {
      _addToCart(this, goods);
    },
  },
};
</script>

<style lang="less" scoped>
.category-product {
  display: flex;
  position: relative;
  height: 100px;
  border-bottom: 1px solid #eee;
  .left {
    display: flex;
    align-items: center;
    .image {
      width: 70px;
      content: normal !important;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
    .title {
      width: 185px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .spec {
      font-size: 8px;
      margin-top: 5px;
      width: 185px;
      color: #999;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .price {
      margin-top: 10px;
      .new-price {
        display: inline;
        font-size: 16px;
        color: red;
      }
      .origin-price {
        display: inline;
        padding-left: 8px;
        text-decoration: line-through;
        font-size: 12.8px;
        color: #b2b2b2;
      }
    }
  }
  .cart {
    position: absolute;
    left: 240px;
    top: 60px;
  }
}
</style>