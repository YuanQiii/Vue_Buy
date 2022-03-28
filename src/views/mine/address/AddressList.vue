<!--
 * @Autor: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-28 09:50:18
 * @FilePath: \vue_buy\src\views\mine\address\AddressList.vue
-->

<template>
  <!-- 地址列表 -->
  <div class="my-address">
    <!--导航栏-->
    <van-nav-bar
      title="我的地址"
      left-arrow
      :fixed="true"
      :border="true"
      @click-left="onClickLeft"
    />
    <!-- 没有数据的占位图 -->
    <div class="noDataPlaceHold" v-show="!addressList.length">
      <img src="./../../../images/order/noAddress.png" alt="" />
      <span class="desc">还没有添加过地址呢,添加一个吧😄</span>
    </div>
    <!-- 联系人 -->
    <van-address-list
      v-model="chosenAddressId"
      :list="addressList"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelectAddress"
      style="margin-top: 3rem"
      add-button-text="添加地址"
      default-tag-text="默认"
    >
    </van-address-list>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapState } from "vuex";

export default {
  name: "AddressList",
  computed: {
    ...mapState("cart", ["addressList", "orderAddress"]),
    ...mapGetters("cart", ["defaultAddressId"]),

    // 选中地址id
    choose() {
      return this.$route.params.choose;
    },
    chosenAddressId: {
      get() {
        return this.orderAddress.id;
      },
      set(value) {
        if (!this.choose) {
          // 更新默认地址
          this.UPDATE_DEFAULT_ADDRESS(value);
        }
      },
    },
  },
  methods: {
    ...mapMutations("cart", ["UPDATE_ORDER_ADDRESS", "UPDATE_DEFAULT_ADDRESS"]),

    // 返回
    onClickLeft() {
      this.$router.back();
    },

    // 订单页面选择地址后返回
    onSelectAddress(item) {
      if (this.choose) {
        this.UPDATE_ORDER_ADDRESS(item);
        this.$router.back();
      }
    },

    // 添加地址
    onAdd() {
      this.$router.push({
        name: "AddressEdit",
        params: {
          mode: "add",
          info: {},
        },
      });
    },

    // 编辑地址
    onEdit(item, index) {
      this.$router.push({
        name: "AddressEdit",
        params: {
          mode: "edit",
          info: item,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.my-address {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  z-index: 200;
  .noDataPlaceHold {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 40%;
    }
    .desc {
      color: grey;
      font-size: 0.6rem;
    }
  }
  /*转场动画*/
  .router-slider-enter-active,
  .router-slider-leave-active {
    transition: all 0.3s;
  }
  .router-slider-enter,
  .router-slider-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }
  .van-address-list__add {
    bottom: 1rem;
  }
  .van-button--large {
    left: 15%;
    width: 70%;
    border-radius: 2rem;
    background-color: #45c763;
    border: none;
  }
}
</style>