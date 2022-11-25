<template>
  <!-- 商品信息缩略组件 -->
  <div class="product-item" @click.stop="goToGoodsDetail(source)">
    <img class="itemImg" v-lazy="source.small_image" alt="" />
    <p class="itemTitle">{{ source.name }}</p>
    <div class="itemSubTitle">
      <span class="temp">{{ source.spec }}</span>
    </div>

    <div class="itemPrice">
      <span class="price">
        {{ source.price | moneyFormat }}
      </span>
      <span class="originPrice">{{ source.origin_price | moneyFormat }}</span>
      <!-- 阻止点击事件冒泡 -->
      <span class="buyCar" @click.stop="addCart(source)">
        <van-icon name="cart-circle" size="1.5rem" color="#28BE57" />
      </span>
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
        return {};
      },
    },
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
.product-item {
  width: 50vw;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}
.itemImg {
  width: 100%;
  content: normal !important;
  // 等比缩小图片来适应元素的尺寸 background-size: contain;
  background-image: url("../../images/placeholderImg/product-img-load.png");
}
.itemTitle {
  padding-left: 8px;
  padding-right: 8px;
  line-height: 12px;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.itemSubTitle {
  color: gray;
  font-size: 12px;
  margin-bottom: 24px;
  width: 180px;
}

.temp {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 164px;
  margin-left: 8px;
  margin-right: 8px;
  display: inline-block;
}

.itemPrice {
  display: flex;
  align-items: center;
  .price {
    padding-left: 8px;
    color: #f37078;
    font-size: 15px;
  }
  .originPrice {
    font-size: 12px;
    color: #999999;
    text-decoration: line-through;
    margin-left: 5px;
  }
}

.buyCar {
  margin-left: 30%;
}
</style>
  