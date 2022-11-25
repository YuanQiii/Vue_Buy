<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-18 22:02:26
 * @FilePath: \vue_buy\src\views\login\CaptchaLogin.vue
-->
<template>
  <!-- 验证码登录 -->
  <div class="captcha-login" :style="loginHeight">
    <van-form ref="captchaLoginForm">
      <van-field
          class="tel"
          v-model="tel"
          name="tel"
          type="tel"
          label="手机号"
          placeholder="请输入手机号"
          border
          :rules="telRules"
      />
      <van-field
          v-model="sms"
          center
          label="验证码"
          placeholder="请输入验证码"
          :rules="captchaRules"
      >
        <template #button>
          <van-button
              @click="sendCaptcha"
              size="small"
              type="primary"
              :disabled="captchaDisabled"
          >{{captchaBtnText}}
          </van-button>
        </template>
      </van-field>
      <!-- <van-checkbox
          class="checkbox"
          shape="square"
          label=""
          v-model="rememberMe"
          label-position="right"
      >记住我
      </van-checkbox> -->
      <van-button class="btn" round block type="primary" native-type="submit" @click="login"
      >登录
      </van-button
      >
    </van-form>
  </div>
</template>

<script>
import {captchaApi, captchaLoginApi} from "@/api/index.js";
import {mapMutations} from "vuex";
import {loginLogic} from "./mixin/loginLogic";

export default {
  name: "CaptchaLogin",
  mounted() {
    this.loginHeight = `height: ${document.body.clientHeight}px`;
  },
  mixins: [loginLogic],
  data() {
    return {
      tel: this.$route.query.tel,
      sms: "",
      captcha: "",
      // rememberMe: true,
      loading: false,
      loadingText: "",
      captchaBtnText: "获取验证码",
      captchaDisabled: false,
      loginHeight: "height: 100vh",
    };
  },
  methods: {
    ...mapMutations("user", ["UPDATE_USER_INFO"]),

    // 获取验证码
    sendCaptcha() {
      this.$refs.captchaLoginForm.validate("tel").then(() => {
        captchaApi().then((response) => {
          this.captcha = response.data.data.code;
          this.captchaDialog();
        });

        this.captchaDisabled = true;
        let time = 60;
        this.captchaBtnText = time;
        let interval = setInterval(() => {
          time--;
          if (time !== 0) {
            this.captchaBtnText = time;
          } else {
            this.captchaBtnText = "发送验证码";
            this.captchaDisabled = false;
            clearTimeout(interval);
          }
        }, 1000);
      });
    },

    // 登录
    login() {
      this.$refs.captchaLoginForm.validate().then(() => {
        this.loading = true;
        this.loadingText = "登录中...";
        // 发送登录请求
        // 初始化生日数据
        // 跳转到我的页面
        captchaLoginApi(this.tel, this.sms).then((response) => {
          this.loginSuccess(response)
        });
      });
    },
    captchaDialog() {
      this.$dialog.confirm({
        title: "验证码",
        message: this.captcha,
        confirmButtonText: "复制",
        showCancelButton: false,
        beforeClose: (action, done) => {
          if (action === "confirm") {
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

<style lang="less" scoped>
.captcha-login {
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

  .btn {
    margin: 30px auto auto;
    width: 340px;
  }
}

</style>