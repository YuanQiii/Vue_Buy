<!--
 * @Author: your name
 * @Date: 2022-03-23 10:16:43
 * @LastEditTime: 2022-03-25 16:30:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue_buy\src\views\mine\info\MineInfoDetail.vue
-->
<template>
  <div class="mine-info-detail">
    <van-nav-bar title="个人资料" left-arrow @click-left="onClickLeft" />

    <div class="avt">
      <img src="../../../images/mine/avt.png" />
    </div>

    <van-field
      v-model="userName"
      label="昵称"
      placeholder="请输入昵称"
      maxlength="16"
    />
    <van-field :value="userInfo.phone" label="手机号" disabled maxlength="11" />
    <van-cell
      is-link
      center
      title="性别"
      :value="userInfo.gender"
      @click="genderShow = true"
      arrow-direction="down"
    />
    <van-action-sheet
      v-model="genderShow"
      close-on-click-action
      :actions="genderActions"
      @select="GenderOnSelect"
    />
    <van-cell
      is-link
      center
      title="生日"
      :value="birthday"
      @click="birthdayShow = true"
      arrow-direction="down"
    />
    <van-popup v-model="birthdayShow" round position="bottom">
      <van-datetime-picker
        v-model="birthday"
        type="date"
        @confirm="confirm"
        @cancel="cancel"
        :formatter="formatter"
        :max-date="maxDate"
        :min-date="minDate"
      />
    </van-popup>

    <van-button round class="btn" type="danger" @click.native="loginOut"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

// 引入时间格式化组件Moment
import Moment from "moment";

export default {
  name: "MineInfoDetail",
  data() {
    return {
      genderShow: false,
      birthdayShow: false,
      minDate: new Date(1980, 0, 1),
      maxDate: new Date(2025, 10, 1),
      genderActions: [
        {
          name: "男",
        },
        {
          name: "女",
        },
        {
          name: "保密",
        },
      ],
    };
  },
  computed: {
    ...mapState("user", ["userInfo"]),
    userName: {
      get() {
        return this.$store.state.user.userInfo.userName;
      },
      set(value) {
        this.UPDATE_USER_NAME(value);
      },
    },
    birthday: {
      get() {
        return this.$store.state.user.userInfo.birthday;
      },
      set() {},
    },
  },
  methods: {
    ...mapMutations("user", [
      "UPDATE_USER_INFO",
      "UPDATE_USER_NAME",
      "UPDATE_USER_PHONE",
      "UPDATE_USER_GENDER",
      "UPDATE_USER_BIRTHDAY",
    ]),
    ...mapMutations("cart", [
      "DEL_GOODS_CART_LIST",
      "UPDATE_ORDER_ADDRESS",
      "CLEAR_ADDRESS",
    ]),
    onClickLeft() {
      this.$router.back();
    },
    GenderOnSelect(value) {
      this.UPDATE_USER_GENDER(value.name);
    },
    // 格式化DateTime pickView
    formatter(type, value) {
      if (type === "year") {
        return `${value}`;
      } else if (type === "month") {
        return `${value}`;
      } else if (type === "day") {
        return `${value}`;
      }
      return value;
    },
    confirm(value) {
      let brithday = Moment(value).format("YYYY-MM-DD");
      this.UPDATE_USER_BIRTHDAY(brithday);
      this.birthdayShow = false;
    },
    cancel() {
      this.birthdayShow = false;
    },
    loginOut() {
      this.$dialog.confirm({
        message: "确认退出登录吗？",
        beforeClose: (action, done) => {
          if (action == "confirm") {
            this.clearData();
            this.$router.replace({
              name: "mine",
            });
          }
          done();
        },
      });
    },
    clearData() {
      this.UPDATE_USER_INFO({});
      this.DEL_GOODS_CART_LIST();
      this.UPDATE_ORDER_ADDRESS({});
      this.CLEAR_ADDRESS();
    },
  },
};
</script>

<style lang="less" scoped>
.avt {
  text-align: center;
}
.btn {
  width: 80vw;
  margin-left: 10vw;
  margin-top: 3rem;
}
</style>