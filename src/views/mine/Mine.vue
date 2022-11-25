<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-19 12:05:52
 * @FilePath: \vue_buy\src\views\mine\Mine.vue
-->
<template>
  <div class="mine">
    <!-- 用户信息 -->
    <mine-info />

    <!-- 订单 -->
    <mine-order />

    <!-- 其他选项 -->
    <children-item
      v-for="(item, index) in children"
      :key="index"
      :iconName="item.iconName"
      :text="item.text"
      :num="item.num"
      :newIcon="item.newIcon"
      :urlName="item.urlName"
    />
  </div>
</template>

<script>
import ChildrenItem from "./children/ChildrenItem.vue";
import MineInfo from "./info/MineInfo.vue";
import MineOrder from "./order/MineOrder.vue";
export default {
  components: { MineInfo, MineOrder, ChildrenItem },
  name: "Mine",
  data() {
    return {
      children: [
        {
          iconName: "gold-coin",
          text: "我的优惠券",
          newIcon: false,
          urlName: "CouponList",
        },
        {
          iconName: "todo-list",
          text: "我的收货地址",
          newIcon: false,
          urlName: "AddressList",
        },
        {
          iconName: "vip-card",
          text: "我的绿卡",
          newIcon: true,
          urlName: "VipInfo",
        },
        {
          iconName: "phone-circle",
          text: "联系客服",
          newIcon: false,
          urlName: "",
        },
        {
          iconName: "comment-circle",
          text: "意见反馈",
          newIcon: false,
          urlName: "",
        },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.mine {
  background-color: #eee;
}
</style>