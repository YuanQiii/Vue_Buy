<!--
 * @Autor: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-28 09:50:18
 * @FilePath: \vue_buy\src\views\mine\info\MineInfo.vue
-->

<template>
  <div class="mine-info">
    <div class="title">我的</div>
    <div class="content" @click="goToInfo">
      <div class="left">
        <img class="image" src="../../../images/mine/avt.png" alt="" />
      </div>
      <div class="right" v-if="userName">
        <div class="text">昵称：{{ userName }}</div>
        <van-icon class="arrow" name="arrow" color="#ffffff" />
      </div>
      <div class="right" v-else>
        <div class="text" @click="goToLogin">立即登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "MineInfo",
  computed: {
    ...mapGetters("user", ["userName"]),
  },
  methods: {
    // 跳转到登录
    goToLogin() {
      this.$router.push({
        name: "login",
      });
    },
    // 跳转到用户详情
    goToInfo() {
      this.$router.push({
        name: "MineInfoDetail",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.mine-info {
  background-color: #28be57;
  height: 15vh;
  .title {
    color: #fff;
    text-align: center;
    margin-bottom: 1rem;
    padding-top: 1rem;
  }
  .content {
    display: flex;
    .left {
      width: 4rem;
      height: 4rem;
      background-color: #fff;
      border-radius: 50%;
      margin-left: 1rem;
      .image {
        width: 4rem;
        height: 4rem;
        border-radius: 50%;
      }
    }
    .right {
      display: flex;
      width: 75vw;

      .text {
        display: block;
        width: 60vw;
        color: #fff;
        font-size: 1rem;
        margin-left: 1rem;
        margin-top: 1.3rem;
      }

      .arrow {
        margin-top: 1.6rem;
        margin-left: 8vw;
      }
    }
  }
}
</style>