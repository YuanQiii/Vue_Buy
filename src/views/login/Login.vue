<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-18 21:47:08
 * @FilePath: \vue_buy\src\views\login\Login.vue
-->
<template>
  <div class="login" ref="login">
    <!-- 顶部导航 -->
    <van-nav-bar title="用户登录" left-arrow @click-left="onClickLeft"/>


    <transition name="login-slider" mode="out-in">
      <keep-alive>
        <router-view />
      </keep-alive>
    </transition>


    <div class="tip" :style="offsetTop">
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

export default {
  components: {PhoneLogin, CaptchaLogin},
  name: "Login",
  mounted() {
    this.offsetTop = `margin-top: -${document.body.clientHeight * 0.6}px`;
  },
  // 接着在父组件内
// watch $route 决定使用哪种过渡
  watch: {
    '$route'(to, from) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    }
  },
  data() {
    return {
      offsetTop: "margin-top: -60vh",
      transitionName: '',
    };
  },
  methods: {
    // 弹窗
    popup(text) {
      this.$toast(text);
    },
    // 返回
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
  overflow: hidden;

  .text {
    width: 5rem;
    text-align: center;
  }

  .tip {
    padding: 1rem;
    font-size: 1rem;
    color: #999;
    margin-top: -70vh;

    .text2 {
      color: blue;
    }
  }
  /*转场动画*/
  .login-slider-enter-active,
  .login-slider-leave-active {
    transition: all 0.15s;
  }
  .login-slider-enter,
  .login-slider-leave-active {
    transform: translate3d(2rem, 0, 0);
    opacity: 0;
  }

  /*转场动画*/
  .login-slider-enter,
  .login-slider-leave-active {
    transform: translate3d(0, 0, 1rem);
    opacity: 0;
  }
}

</style>
