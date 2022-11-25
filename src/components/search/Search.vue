<template>
  <!-- 搜索组件 -->
  <div class="search">
    <div class="top">
      <map-location class="location" @click.native="toPage" /> |
      <input class="inp" type="search" placeholder="搜索商品" v-model.trim="value" />
      <van-icon name="search" class="icon" size="1.3rem" />
    </div>

    <!-- 搜索结果列表 -->
    <div class="result" v-show="filterGoods.length">
      <div
        class="item"
        v-for="(item, index) in filterGoods"
        v-html="brightenKeyword(item.name, value)"
        :key="index"
        @click="goToGoodsDetail(item)"
      >
      </div>
    </div>
    <div class="result" v-show="filterGoods.length === 0 && value && isHandle">
      <div class="text">
        暂无搜索结果
      </div>
    </div>
  </div>
</template>

<script>
import { _goToGoodsDetail } from "@/utils/goToGoodsDetail";
import {debounce} from "@/utils/debounce";
import MapLocation from "@/views/map/MapLocation";

export default {
  name: "Search",
  components: {MapLocation},
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
      isHandle: false,
      // 搜索结果
      filterGoods: [],
    };
  },
  watch: {
    // 监听输入框关键字
    value(newValue) {
      this.isHandle = false
      let fn = debounce(this.handleKeyword, 300)
      fn(newValue)
      setTimeout(() => {
        this.isHandle = true
      }, 300)
    },
  },
  methods: {
    // 跳转到商品详情
    goToGoodsDetail(value) {
      this.value = "";
      _goToGoodsDetail(this, value);
    },
    handleKeyword(newValue){
      this.filterGoods = this.goodsList.filter(element => {
        return element.name.includes(newValue) && this.value
      })
    },
    // 高亮搜索词
    brightenKeyword(value, keyword) {
      return value.replace(keyword, `<span style="color: red;">${keyword}</span>`)
    },
    toPage(){
      this.$router.push({
        name: 'map'
      })
    }
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
  background-color: #fff;
  .top{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .location{
      margin-right: 10px;
      margin-left: 10px;
      color: rgb(133,133,133);
    }
    .inp {
      flex: 1;
      height: 2rem;
      border-radius: 1rem;
      outline: none;
      border: none;
      padding: 1rem;
    }
    .icon {
      position: absolute;
      left: 300px;
    }
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