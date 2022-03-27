<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-18 21:51:07
 * @FilePath: \StudentSummery-Vue\src\components\login\PhoneLogin.vue
-->
<template>
  <div class="phone-login">
    <van-field
      class="tel"
      v-model="tel"
      type="tel"
      label="手机号"
      placeholder="请输入手机号"
      clearable
      border
      :error-message="phoneErrorMessage"
      error-message-align="center"
    />
    <van-field
      class="password"
      v-model="password"
      type="password"
      label="密码"
      placeholder="请输入密码，测试密码为123456"
      clearable
      border
      :error-message="passwordErrorMessage"
      error-message-align="center"
    />
    <div class="btn">
      <van-button
        :loading="loading"
        :loading-text="loadingText"
        loading-type="spinner"
        @click.native="login"
        class="btn"
        type="primary"
        >登录</van-button
      >
    </div>
  </div>
</template>

<script>
import { passwordLoginApi } from "@/api/index.js";
import { mapMutations } from "vuex";
import Moment from "moment";

export default {
  name: "PhoneLogin",
  props: {},
  data() {
    return {
      tel: "",
      password: "",
      testPassword: "123456",
      phoneErrorMessage: "",
      passwordErrorMessage: "",
      reg: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
      loading: false,
      loadingText: "",
    };
  },
  methods: {
    ...mapMutations("user", ["UPDATE_USER_INFO"]),

    checkPhone() {
      if (this.reg.test(this.tel)) {
        this.phoneErrorMessage = "";
        return true;
      } else {
        this.phoneErrorMessage = "请输入正确的手机号";
        return false;
      }
    },
    checkPassword() {
      if (this.password.length < 6) {
        this.passwordErrorMessage = "密码长度最小6位";
        return false;
      } else if (this.password != this.testPassword) {
        this.passwordErrorMessage = "密码错误";
        return false;
      } else {
        this.passwordErrorMessage = "";
        return true;
      }
    },
    login() {
      if (this.checkPhone() && this.checkPassword()) {
        this.loading = true;
        this.loadingText = "登录中...";

        passwordLoginApi(this.tel, this.password).then((response) => {
          let data = response.data;
          if (data.success_code == 200) {
            data.data.phone = this.tel;
            data.data.birthday = Moment(new Date()).format("YYYY-MM-DD");
            this.UPDATE_USER_INFO(data.data);
            this.$router.replace({
              name: "mine",
            });
          }
        });
      }
    },
  },
};
</script>

<style>
.phone-login {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 30vh;
  align-items: center;
}
.tel {
  margin-top: 1rem;
}
.password {
  margin-top: 0.5rem;
}
.btn {
  margin-top: 1rem;
  width: 70vw;
}
</style>