<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-18 21:51:07
 * @FilePath: \vue_buy\src\views\login\PhoneLogin.vue
-->
<template>
  <!-- 手机登录 -->
  <div class="phone-login" :style="loginHeight">
    <van-form ref="phoneLoginForm">
      <van-field
        class="tel"
        v-model="tel"
        type="tel"
        label="手机号"
        placeholder="请输入手机号"
        border
        :rules="telRules"
      />
      <van-field
        class="password"
        v-model="password"
        type="password"
        label="密码"
        placeholder="测试密码为123456"
        border
        :rules="pwdRules"
      />
      <!-- <van-checkbox
        class="checkbox"
        shape="square"
        label=""
        v-model="rememberMe"
        label-position="right"
        >记住我</van-checkbox
      > -->
      <van-button
        class="btn1"
        round
        block
        type="primary"
        native-type="submit"
        @click="login"
        >登录</van-button
      >
      <van-button
        class="btn2"
        round
        block
        type="info"
        native-type="submit"
        plain
        @click="toCaptchaLogin"
        >验证码登录</van-button
      >
    </van-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { loginLogic } from "./mixin/loginLogic";
import { passwordLoginApi } from "@/api/index.js";

export default {
  name: "PhoneLogin",
  mounted() {
    this.loginHeight = `height: ${document.body.clientHeight}px`;
  },
  mixins: [loginLogic],
  data() {
    return {
      tel: "",
      password: "",
      // rememberMe: true,
      loading: false,
      loadingText: "",
      loginHeight: "height: 100vh",
    };
  },
  methods: {
    ...mapMutations("user", ["UPDATE_USER_INFO"]),
    login() {
      this.$refs.phoneLoginForm.validate().then(() => {
        this.loading = true;
        this.loadingText = "登录中...";
        // 发送登录请求获取用户信息
        // 返回到我的页面
        passwordLoginApi(this.tel, this.password).then((response) => {
          this.loginSuccess(response)
        });
      });
    },
    toCaptchaLogin() {
      this.$router.push({
        path: "CaptchaLogin",
        query: {
          tel: this.tel
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
.phone-login {
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: 40px;
  /deep/ .van-field {
    font-size: 18px;
  }
  .checkbox {
    margin-left: 20px;
    margin-top: 10px;
  }
  .btn1 {
    margin: 30px auto auto;
    width: 340px;
  }
  .btn2 {
    margin: 10px auto auto;
    width: 340px;
  }
}
</style>