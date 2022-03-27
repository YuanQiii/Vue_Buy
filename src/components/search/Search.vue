<template>
  <div class="search">
    <input class="inp" type="search" placeholder="搜索商品" v-model="value" />
    <van-icon name="search" class="icon" size="1.3rem" />
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
  </div>
</template>

<script>
import { _goToGoodsDetail } from "@/utils/goToGoodsDetail";

export default {
  name: "Search",
  props: {
    goodsList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      value: "",
      filterGoods: [],
    };
  },
  watch: {
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
  }
}
</style>