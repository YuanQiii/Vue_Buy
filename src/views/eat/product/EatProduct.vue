<!--
 * @Author: your name
 * @Date: 2022-03-21 13:50:14
 * @LastEditTime: 2022-03-21 16:57:09
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue_buy\src\views\eat\product\EatProduct.vue
-->
<template>
  <div class="eat-product">
    <waterfall
      class="waterfall"
      :col="col"
      :data="recipeMenuList"
      @loadmore="loadMore"
      v-if="show"
    >
      <div
        class="cell-item"
        v-for="item in recipeMenuList"
        :key="item.id"
      >
        <img v-lazy="item.image" />
        <div class="item-body">
          <div class="item-desc">{{ item.name }}</div>
          <div class="item-footer">
            <img class="avatar" v-lazy="item.author_avatar" alt="" />
            <div class="name">{{ item.author_name }}</div>
          </div>
        </div>
      </div>
    </waterfall>
  </div>
</template>

<script>
import { recipeMenuListApi } from "@/api/index.js";

export default {
  name: "EatProduct",
  created() {
    this.getRecipeMenuList(this.activeIndex % 30 + 1);
  },
  props: {
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  watch: {
    activeIndex(newValue){
      this.getRecipeMenuList(newValue % 30 + 1);
    }
  },
  data() {
    return {
      col: 2,
      recipeMenuList: [],
      index: 1,
      show: true
    };
  },
  methods: {
    getRecipeMenuList(index) {
      this.show = false
      recipeMenuListApi(index)
        .then((response) => {
          this.recipeMenuList = response.data.data.big_recommend.list
          this.show = true
          this.index = 1
        })
    },
    loadMore() {
      this.index++;
      if (this.index > this.recipeMenuList.length) {
        this.$toast("到底啦~~");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.eat-product {
  margin-top: 16px;
  width: 100vw;
  box-sizing: border-box;
  .vue-waterfall {
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 32px;
  }
  .cell-item {
    width: 100%;
    background: #ffffff;
    overflow: hidden;
    box-sizing: border-box;
    padding: 4.8px;
    img {
      border-radius: 12px;
      width: 100%;
      display: block;
      // 等比缩小图片来适应元素的尺寸 background-size: contain;
      background-image: url("../../../images/placeholderImg/product-img-load.png");
      content: normal !important;
    }
    .item-body {
      padding: 9.6px;
      .item-desc {
        font-size: 12.8px;
        color: #333333;
        line-height: 16px;
        font-weight: bold;
      }
      .item-footer {
        margin-top: 16px;
        position: relative;
        display: flex;
        align-items: center;
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          content: normal !important;
        }
        .name {
          max-width: 150px;
          margin-left: 10px;
          font-size: 12px;
          color: #999999;
        }
      }
    }
  }
}
</style>