<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-18 21:47:08
 * @FilePath: \StudentSummery-Vue\src\components\login\Login.vue
-->
<template>
  <div class="login">
    <van-nav-bar title="用户登录" left-arrow @click-left="onClickLeft" />

    <van-tabs v-model="active" swipeable animated line-width="4rem">
      <van-tab class="tab">
        <template #title> <div class="text">密码登录</div> </template>
        <phone-login />
      </van-tab>
      <van-tab class="tab">
        <template #title> <div class="text">验证码登录</div> </template>
        <captcha-login />
      </van-tab>
      <van-tab class="tab">
        <template #title> <div class="text">注册</div> </template>
        <register @initLogin="initLogin" />
      </van-tab>
    </van-tabs>

    <div class="tip">
      <div class="text1">温馨提示：</div>
      <div class="text1">
        未注册的手机号，登录时将自动注册，且代表同意<span
          class="text2"
          @click="popup('用户协议')"
          >用户协议</span
        >、<span class="text2" @click="popup('隐私策略')">隐私策略</span>
      </div>
    </div>
  </div>
</template>

<script>
import CaptchaLogin from "./CaptchaLogin.vue";
import PhoneLogin from "./PhoneLogin.vue";
import Register from "./Register.vue";
export default {
  components: { PhoneLogin, CaptchaLogin, Register },
  name: "Login",
  data() {
    return {
      active: 0,
    };
  },
  methods: {
    initLogin() {
      this.active = 0;
    },
    popup(text) {
      this.$toast(text);
    },
    onClickLeft() {
      this.$router.back();
    },
  },
};
</script>


<style lang="less" scoped>
.login {
  width: 100vw;
  height: 100vh;
  .text {
    width: 5rem;
    text-align: center;
  }
  .tip {
    padding: 1rem;
    font-size: 1rem;
    color: #999;
    .text2 {
      color: blue;
    }
  }
}
</style>
