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
    margin-right: 2rem;
    // 防止抖动
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    .productCategoryTitle {
      display: inline-block;
      font-size: 0.73rem;

      border-left: 3px solid #d9dde1;
      height: 0.32rem;
      width: 100%;
      font-size: 0.73rem;
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
        width: 4.0625rem;
        height: 4.0625rem;
        border-radius: 0.04rem;
      }
      .list_item {
        justify-content: flex-start;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);

        position: relative;
        & > div {
          margin-left: 0.2rem;
          .name {
            font-size: 0.8375rem;
            color: rgb(7, 17, 27);
            margin-bottom: 0.16rem;
          }
          .des,
          .sale {
            padding: 0.2rem;
            line-height: 0.8rem;
            font-size: 0.65rem;
            color: rgb(147, 153, 159);
            margin-bottom: 0.16rem;
          }
          .sale {
            margin-bottom: 0;
            span {
              margin-left: 0.24rem;
            }
          }
          .originPrice {
            margin-top: 0.5rem;
            font-size: 0.6875rem;
            color: #8f8f8f;
          }
          .price {
            font-size: 0.9rem;
            margin-top: -0.2rem;
            color: #5fa85f;
          }
          .add {
            position: absolute;
            right: 0;
            bottom: 0.28rem;
          }
          .iconCartWrapper {
            position: absolute;
            top: 5rem;
            right: 0.4rem;
          }
          .icon {
            fill: #999;
            width: 1rem;
            height: 1rem;
          }
          .iconCart {
            display: block;
            width: 1.5rem;
            height: 1.5rem;
          }
        }
      }
    }
    .bottomTip {
      padding-top: 0.8rem;
      color: grey;
      font-size: 0.8rem;
      text-align: center;
    }
  }
}
</style>
