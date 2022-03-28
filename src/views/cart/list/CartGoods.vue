<!--
 * @Autor: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-28 09:50:18
 * @FilePath: \vue_buy\src\views\cart\list\CartGoods.vue
-->
<template>
  <!-- 购物车列表 -->
  <div class="cart-goods">
    <div class="box" v-for="(goods, index) in cartList" :key="index">
      <van-checkbox
        checked-color="#28BE57"
        :value="goods.checked"
        @input="changeCheck(goods)"
      />
      <div class="info">
        <img class="image" :src="goods.small_image" />
        <div class="detail">
          <div class="name">
            {{ goods.name }}
          </div>
          <div class="price">
            {{ goods.price | moneyFormat }}
          </div>
          <div class="option">
            <van-button
              class="btn"
              size="small"
              type="primary"
              @click="decreaseNum(goods.id)"
              ><van-icon name="minus"
            /></van-button>
            <div class="text">{{ goods.cart_num }}</div>
            <van-button
              class="btn"
              size="small"
              type="primary"
              @click="increaseNum(goods.id)"
              ><van-icon name="plus"
            /></van-button>
          </div>
        </div>
      </div>

      <!-- 结算按钮 -->
      <van-submit-bar
        class="all"
        :price="totalPrice"
        button-text="结算"
        v-show="cartList.length"
        @submit="onSubmit"
      >
        <!-- 全选按钮 -->
        <van-checkbox v-model="checkedAll" checked-color="#45c763"
          >全部</van-checkbox
        >
      </van-submit-bar>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from "vuex";
export default {
  name: "CartGoods",
  computed: {
    ...mapState("cart", ["cartList"]),
    ...mapGetters("cart", ["totalPrice"]),
    checkedAll: {
      get() {
        // 判断购物车是否全选
        return this.cartList.every((element) => element.checked);
      },
      set(value) {
        // 更新购物车里全部商品对象的checked属性
        this.cartList.forEach((element) => {
          this.UPDATE_GOODS_CART_CHECKED({
            id: element.id,
            checked: value,
          });
        });
      },
    },
  },
  methods: {
    ...mapMutations("cart", [
      "UPDATE_GOODS_CART_NUM",
      "DEL_GOODS_CART",
      "UPDATE_GOODS_CART_CHECKED",
    ]),

    // 更新单个商品对象的checked属性
    changeCheck(goods) {
      this.UPDATE_GOODS_CART_CHECKED({
        id: goods.id,
        checked: !goods.checked,
      });
    },

    // 跳转到订单页面
    onSubmit() {
      if (this.totalPrice > 0) {
        this.$router.push({
          name: "order",
        });
      } else {
        this.$toast("请选择需要结算的商品");
      }
    },

    // 增加商品数量
    increaseNum(id) {
      this.UPDATE_GOODS_CART_NUM({
        id,
        value: 1,
      });
    },

    // 减少商品数量，为0时删除商品
    decreaseNum(id) {
      let num = 0;

      this.cartList.forEach((element) => {
        if (element.id == id) {
          num = element.cart_num;
        }
      });

      if (num == 1) {
        this.$dialog.confirm({
          message: "确定删除该商品吗？",
          beforeClose: (action, done) => {
            if (action == "confirm") {
              this.DEL_GOODS_CART(id);
            }
            done();
          },
        });
      } else {
        this.UPDATE_GOODS_CART_NUM({
          id,
          value: -1,
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart-goods {
  .box {
    width: 100vw;
    background-color: #fff;
    position: relative;
    padding-left: 1rem;
    padding-right: 1rem;
    margin-top: 1rem;
    display: flex;
    .info {
      display: flex;
      .image {
        width: 6rem;
        margin-left: 1rem;
      }
      .detail {
        margin-left: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .name {
          font-size: 0.9rem;
        }
      }
      .option {
        position: absolute;
        top: 3.4rem;
        left: 70vw;
        display: flex;
        .text {
          line-height: 1.5rem;
          width: 2rem;
          text-align: center;
          background-color: #eee;
          margin-left: 0.5rem;
          margin-right: 0.5rem;
        }
        .btn {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
    .all {
      margin-bottom: 7vh;
    }
  }
}
</style>