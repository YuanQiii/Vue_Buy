<!--
 * @Author: your name
 * @Date: 2022-03-23 14:24:24
 * @LastEditTime: 2022-03-25 16:14:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue_buy\src\views\mine\address\AddressList.vue
-->
<template>
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
    choose() {
      return this.$route.params.choose;
    },
    chosenAddressId: {
      get() {
        return this.orderAddress.id;
      },
      set(value) {
        if (!this.choose) {
          this.UPDATE_DEFAULT_ADDRESS(value);
        }
      },
    },
  },
  methods: {
    ...mapMutations("cart", ["UPDATE_ORDER_ADDRESS", "UPDATE_DEFAULT_ADDRESS"]),
    onClickLeft() {
      this.$router.back();
    },
    onSelectAddress(item) {
      if (this.choose) {
        this.UPDATE_ORDER_ADDRESS(item);
        this.$router.back();
      }
    },
    onAdd() {
      this.$router.push({
        name: "AddressEdit",
        params: {
          mode: "add",
          info: {},
        },
      });
    },
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