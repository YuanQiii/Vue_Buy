<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-18 22:02:26
 * @FilePath: \vue_buy\src\views\login\CaptchaLogin.vue
-->
<template>
  <!-- 验证码登录 -->
  <div class="captcha-login" :style="loginHeight">
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
        @click.native="login"
        class="btn"
        type="primary"
      >
        登录
      </van-button>
    </div>
  </div>
</template>

<script>
import { captchaApi, captchaLoginApi } from "@/api/index.js";
import { mapMutations } from "vuex";
import Moment from "moment";

export default {
  name: "CaptchaLogin",
  mounted() {
    this.loginHeight = `height: ${document.body.clientHeight}px`;
  },
  data() {
    return {
      tel: "",
      sms: "",
      phoneErrorMessage: "",
      captchaErrorMessage: "",
      reg: /^1(3\d|4[5-9]|5[0-35-9]|6[567]|7[0-8]|8\d|9[0-35-9])\d{8}$/,
      loading: false,
      loadingText: "",
      captchaBtnText: "发送验证码",
      captchaDisabled: false,
      captcha: "",
      loginHeight: "height: 100vh",
    };
  },
  methods: {
    ...mapMutations("user", ["UPDATE_USER_INFO"]),

    // 检查手机号格式
    checkPhone() {
      if (this.reg.test(this.tel)) {
        this.phoneErrorMessage = "";
        return true;
      } else {
        this.phoneErrorMessage = "请输入正确的手机号";
        return false;
      }
    },

    // 检查验证码是否正确
    checkCaptcha() {
      if (this.captcha == this.sms) {
        this.captchaErrorMessage = "";
        return true;
      } else {
        this.captchaErrorMessage = "请输入正确的验证码";
        return false;
      }
    },

    // 获取验证码
    sendCaptcha() {
      if (this.checkPhone()) {
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

    // 登录
    login() {
      if (this.checkPhone() && this.checkCaptcha()) {
        this.loading = true;
        this.loadingText = "登录中...";

        // 发送登录请求
        // 初始化生日数据
        // 跳转到我的页面
        if (this.sms == this.captcha) {
          captchaLoginApi(this.tel, this.sms).then((response) => {
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
      }
    },
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
  },
};
</script>

<style>
.captcha-login {
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