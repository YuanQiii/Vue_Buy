<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-21 22:40:04
 * @FilePath: \vue_buy\src\views\mine\children\ChildrenItem.vue
-->
<template>
  <div class="children-item" @click="toPage">
    <div class="left">
      <van-icon size="1.3rem" :name="iconName" color="#28be57" />
      <div class="text">{{ text }}</div>
      <div v-if="newIcon" class="new">
        <van-icon class="new-icon" size="1.8rem" name="new-arrival" color="red" />
      </div>
    </div>
    <div class="right">
      <div
        class="num"
        v-if="couponList.length && userName && text === '我的优惠券'"
      >
        {{ couponList.length }}
      </div>
      <div class="arrow">&gt;</div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
export default {
  name: "ChildremItem",
  props: {
    iconName: {
      type: String,
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    newIcon: {
      type: Boolean,
      default: false,
    },
    urlName: {
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapState("cart", ["couponList"]),
    ...mapGetters("user", ["userName"]),
  },
  methods: {
    toPage() {
      if (this.urlName) {
        this.$router.push({
          name: this.urlName,
        });
      }
    },
  },
};
</script>

<style lang="less">
.children-item {
  display: flex;
  background-color: #fff;
  justify-content: space-between;
  margin-bottom: -16px;
  padding: 16px;
  .left {
    display: flex;
    align-items: center;
    .text {
      font-size: 16px;
      margin-left: 4.8px;
    }
    .icon{
      display: flex;
      align-items: center;
    }
  }
  .right {
    display: flex;
    font-size: 16px;
    color: #999;
    .num {
      margin-right: 8px;
    }
  }
}
</style>