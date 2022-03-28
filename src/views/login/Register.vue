<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-18 23:43:00
 * @FilePath: \vue_buy\src\views\login\Register.vue
-->
<template>
  <!-- 注册 -->
  <div class="register">
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
      placeholder="请输入密码"
      clearable
      border
      :error-message="passwordErrorMessage"
      error-message-align="center"
    />
    <van-field
      v-model="sms"
      center
      clearable
      label="验证码"
      placeholder="请输入短信验证码"
      :error-message="captchaErrorMessage"
    >
      <template #button>
        <van-button
          @click="sendCaptcha"
          size="small"
          type="primary"
          :disabled="captchaDisabled"
          >{{ captchaBtnText }}</van-button
        >
      </template>
    </van-field>
    <div class="btn">
      <van-button
        :loading="loading"
        :loading-text="loadingText"
        loading-type="spinner"
        @click.native="register"
        class="btn"
        type="primary"
      >
        注册
      </van-button>
    </div>
  </div>
</template>

<script>
import { captchaApi, registerApi } from "@/api/index.js";
import { mapMutations } from "vuex";

export default {
  name: "Register",
  data() {
    return {
      tel: "",
      sms: "",
      password: "",
      phoneErrorMessage: "",
      passwordErrorMessage: "",
      captchaErrorMessage: "",
      reg: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
      loading: false,
      loadingText: "",
      captchaBtnText: "发送验证码",
      captchaDisabled: false,
      captcha: "",
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

    // 检查手机号格式
    checkCaptcha() {
      if (this.captcha == this.sms) {
        this.captchaErrorMessage = "";
        return true;
      } else {
        this.captchaErrorMessage = "请输入正确的验证码";
        return false;
      }
    },

    // 检查密码格式
    checkPassword() {
      if (this.password.length < 6) {
        this.passwordErrorMessage = "密码长度最小6位";
        return false;
      } else {
        this.passwordErrorMessage = "";
        return true;
      }
    },

    // 获取验证码
    sendCaptcha() {
      if (this.checkPhone() && this.checkPassword()) {
        captchaApi().then((response) => {
          let data = response.data;
          if (data.success_code == 200) {
            this.captcha = data.data.code;
            this.captchaDialog();
          }
        });

        this.captchaDisabled = true;
        let time = 60;
        this.captchaBtnText = time;
        let interval = setInterval(() => {
          time--;
          if (time != 0) {
            this.captchaBtnText = time;
          } else {
            this.captchaBtnText = "发送验证码";
            this.captchaDisabled = false;
            clearTimeout(interval);
          }
        }, 1000);
      }
    },

    // 注册
    register() {
      if (this.checkPhone() && this.checkPassword() && this.checkCaptcha()) {
        this.loading = true;
        this.loadingText = "注册中...";

        registerApi(this.tel, this.password, this.sms).then((response) => {
          let data = response.data;
          if (data.success_code == 200) {
            this.successDialog();
          }
        });
      }
    },

    // 验证码一键复制
    captchaDialog() {
      this.$dialog.confirm({
        title: "验证码",
        message: this.captcha,
        confirmButtonText: "复制",
        showCancelButton: false,
        beforeClose: (action, done) => {
          if (action == "confirm") {
            this.$copyText(this.captcha.toString()).then((e) => {
              done();
            });
          }
        },
      });
    },
    successDialog() {
      this.$dialog.confirm({
        title: "",
        message: "注册成功",
        confirmButtonText: "确认",
        showCancelButton: false,
        beforeClose: (action, done) => {
          if (action == "confirm") {
            this.$emit("initLogin");
            done();
          }
        },
      });
    },
  },
};
</script>

<style>
.register {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 30vh;
  align-items: center;
}
.btn {
  margin-top: 1rem;
  width: 70vw;
}
</style>