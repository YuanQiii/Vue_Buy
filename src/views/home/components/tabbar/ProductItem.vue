<template>
  <!-- 商品信息缩略组件 -->
  <div class="produce-item">
    <!-- <div
      class="item"
      v-for="(product, index) in productLists"
      :key="index"
      @click.stop="goToGoodsDetail(product)"
    >
      <img v-lazy="product.small_image" alt="" />
      <p class="itemTitle">{{ product.name }}</p>
      <p class="itemSubTitle">{{ product.spec }}</p>
      <span class="price">
        {{ product.price | moneyFormat }}
      </span>
      <span class="originPrice">{{ product.origin_price | moneyFormat }}</span>

      <div class="buyCar" @click.stop="addCart(product)">
        <van-icon name="cart-circle" size="1.5rem" color="#28BE57" />
      </div>
    </div> -->

    <div
      class="item"
      @click.stop="goToGoodsDetail(source)"
    >
      <img v-lazy="source.small_image" alt="" />
      <p class="itemTitle">{{ source.name }}</p>
      <p class="itemSubTitle">{{ source.spec }}</p>
      <span class="price">
        {{ source.price | moneyFormat }}
      </span>
      <span class="originPrice">{{ source.origin_price | moneyFormat }}</span>

      <!-- 阻止点击事件冒泡 -->
      <div class="buyCar" @click.stop="addCart(source)">
        <van-icon name="cart-circle" size="1.5rem" color="#28BE57" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { _addToCart } from "@/utils/addToCart";
import { _goToGoodsDetail } from "@/utils/goToGoodsDetail";

export default {
  name: "ProductItem",
  props: {
    source: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  watch: {
    source(newValue){
      console.log('source', newValue);
    }
  },
  methods: {
    ...mapMutations("cart", ["ADD_GOODS_CART"]),
    // 商品详情页面
    goToGoodsDetail(goods) {
      // 跳转到商品详情页面并且传值
      _goToGoodsDetail(this, goods);
    },
    // 添加到购物车
    addCart(product) {
      _addToCart(this, product);
    },
  },
};
</script>

<style lang="less" scoped>
.produce-item {
  background-color: #f5f5f5;
  height: auto;
  padding-left: 2%;
  padding-top: 10px;
  width: 180px;
}
.item {
  position: relative;
  // display: inline-block;
  // width: 48%;
  // margin-right: 2%;


  margin-bottom: 7px;
  background-color: white;
  padding-bottom: 10px;
}
.item img {
  width: 100%;
  height: 100%;
  // 等比缩小图片来适应元素的尺寸 background-size: contain;
  background-image: url("../../../../images/placeholderImg/product-img-load.png");
  content: normal !important;
}
.item .itemTitle {
  padding-left: 8px;
  padding-right: 8px;
  line-height: 16px;
  font-size: 10px;
  word-break: break-all;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.item .itemSubTitle {
  padding-left: 8px;
  padding-right: 8px;
  color: gray;
  padding-top: 3.2px;
  font-size: 7.2px;
  line-height: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  margin-bottom: 24px;
}
.item .price {
  padding-left: 8px;
  color: #f37078;
  font-size: 14.848px;
}
.tagEat {
  margin-left: 8px;
  padding: 1.44px;
  color: orangered;
  width: 40px;
  height: 1.6px;
  border-radius: 3.2px;
  font-size: 4.8px;
  border: 0.8px solid red;
}
.originPrice {
  font-size: 11px;
  color: #999999;
  text-decoration: line-through;
}
.buyCar {
  position: absolute;
  right: 16px;
  bottom: 8px;
}

</style>
