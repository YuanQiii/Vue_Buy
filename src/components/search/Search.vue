<template>
  <!-- 搜索组件 -->
  <div class="search">
    <input class="inp" type="search" placeholder="搜索商品" v-model="value" />
    <van-icon name="search" class="icon" size="1.3rem" />

    <!-- 搜索结果列表 -->
    <div class="result" v-show="filterGoods.length">
      <div
        class="item"
        v-for="(value, index) in filterGoods"
        :key="index"
        @click="goToGoodsDetail(value)"
      >
        {{ value.name }}
      </div>
    </div>
    <div class="result" v-show="!filterGoods.length && value">
      <div class="text">
        暂无搜索结果
      </div>
    </div>
  </div>
</template>

<script>
import { _goToGoodsDetail } from "@/utils/goToGoodsDetail";

export default {
  name: "Search",
  props: {
    // 搜索数据源
    goodsList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      value: "",

      // 搜索结果
      filterGoods: [],
    };
  },
  watch: {
    // 监听输入框关键字
    value(newValue) {
      let arr = [];
      this.goodsList.forEach((element) => {
        if (element.name.includes(newValue) && this.value) {
          arr.push(element);
        }
      });

      this.filterGoods = arr;
    },
  },
  methods: {
    // 跳转到商品详情
    goToGoodsDetail(value) {
      this.value = "";
      _goToGoodsDetail(this, value);
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  position: absolute;
  top: -1.6rem;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
  width: 90vw;
  margin-left: 5vw;
  border-radius: 1rem;
  .inp {
    width: 90vw;
    height: 2rem;
    border-radius: 1rem;
    outline: none;
    border: none;
    padding: 1rem;
  }
  .icon {
    margin-left: -2rem;
  }
  .result {
    position: absolute;
    width: 90vw;
    max-height: 80vh;
    overflow: scroll;
    z-index: 99;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.6);
    border-radius: 1rem;
    margin-top: 0.5rem;

    .item {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-left: 1rem;
      margin-right: 1rem;
      line-height: 3rem;
      border-bottom: solid 1px #000;
    }

    .text{
      line-height: 3rem;
      text-align: center;
    }
  }
}
</style>