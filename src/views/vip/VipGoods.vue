<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-22 21:33:25
 * @FilePath: \vue_buy\src\views\vip\VipGoods.vue
-->
<template>
  <div class="vip-goods">
    <!-- VIP商品列表 -->
    <section class="r_list" ref="r_list">
      <div>
        <ul>
          <li v-for="(item, index) in vipCateDetail" :key="index" class="list">
            <div class="list_item flex">
              <p>
                <img :src="item.small_image" alt="" />
              </p>
              <div>
                <p class="name">{{ item.product_name }}</p>
                <p class="des">{{ item.spec }}</p>
                <p class="originPrice">{{ item.origin_price | moneyFormat }}</p>
                <p class="price">
                  {{ item.price | moneyFormat }}
                  <van-tag
                    plain
                    mark
                    color="#5fa85f"
                    @click.native="goToVipPage"
                    >开通绿卡</van-tag
                  >
                </p>
                <div class="iconCartWrapper">
                  <van-icon name="cart-circle" size="1.6rem" color="#cccccc" />
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="bottomTip">更多特权敬请期待...</div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "VipGoods",
  props: {
    vipCateDetail: Array,
  },
  methods: {
    // 跳转到vip购买页面
    goToVipPage() {
      this.$router.push({ name: "VipPay" });
    },
  },
};
</script>

<style lang="less" scoped>
.vip-goods {
  .r_list {
    overflow: hidden;
    margin-right: 32px;
    // 防止抖动 -webkit-transform: translateZ(0);
    transform: translateZ(0);
    .productCategoryTitle {
      display: inline-block;
      font-size: 12px;
      border-left: 3px solid #d9dde1;
      height: 5.12px;
      width: 100%;
      color: rgb(147, 153, 159);
      background-color: #f3f5f7;
    }
    .flex {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .list {
      img {
        width: 65px;
        height: 65px;
        border-radius: 0.64px;
        content: normal !important;
      }
      .list_item {
        justify-content: flex-start;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        position: relative;
        & > div {
          margin-left: 3.2px;
          .name {
            font-size: 13.4px;
            color: rgb(7, 17, 27);
            margin-bottom: 2.56px;
          }
          .des, .sale {
            padding: 3.2px;
            line-height: 12.8px;
            font-size: 10.4px;
            color: rgb(147, 153, 159);
            margin-bottom: 2.56px;
          }
          .sale {
            margin-bottom: 0;
            span {
              margin-left: 3.84px;
            }
          }
          .originPrice {
            margin-top: 8px;
            font-size: 11px;
            color: #8f8f8f;
          }
          .price {
            font-size: 14.4px;
            margin-top: -3.2px;
            color: #5fa85f;
          }
          .add {
            position: absolute;
            right: 0;
            bottom: 4.48px;
          }
          .iconCartWrapper {
            position: absolute;
            top: 80px;
            right: 6.4px;
          }
          .icon {
            fill: #999;
            width: 16px;
            height: 16px;
          }
          .iconCart {
            display: block;
            width: 24px;
            height: 24px;
          }
        }
      }
    }
    .bottomTip {
      padding-top: 12.8px;
      color: grey;
      font-size: 12.8px;
      text-align: center;
    }
  }
}
</style>
