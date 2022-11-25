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
        <van-image
            width="60"
            height="60"
            fit="cover"
            round
            :src="avtImage"
            class="avatar-image"
        />
      </div>
      <div class="right" v-if="userName">
        <div class="text">{{ userName }}</div>
        <van-icon class="arrow" name="arrow" color="#ffffff" />
      </div>
      <div class="right" v-else>
        <div class="text" @click="goToLogin">立即登录</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
export default {
  name: "MineInfo",
  computed: {
    ...mapGetters("user", ["userName"]),
    ...mapState("user", ["userInfo"]),
    avtImage(){
      let temp = 'https://pic1.zhimg.com/50/v2-6afa72220d29f045c15217aa6b275808_hd.jpg?source=1940ef5c'
      let url = this.userInfo.avatar
      return url ? url : temp
    }
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
  height: 120px;
  .title {
    color: #fff;
    text-align: center;
    margin-bottom: 16px;
    padding-top: 16px;
  }
  .content {
    display: flex;
    .avatar-image{
      margin-left: 16px;
    }
    //.left {
    //  width: 64px;
    //  height: 64px;
    //  background-color: #fff;
    //  border-radius: 50%;
    //  margin-left: 16px;
    //  .image {
    //    width: 64px;
    //    height: 64px;
    //    border-radius: 50%;
    //  }
    //}
    .right {
      display: flex;
      width: 75vw;
      .text {
        display: block;
        width: 60vw;
        color: #fff;
        font-size: 16px;
        margin-left: 16px;
        margin-top: 20.8px;
      }
      .arrow {
        margin-top: 25.6px;
        margin-left: 8vw;
      }
    }
  }
}
</style>