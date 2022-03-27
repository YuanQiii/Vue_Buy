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
      @loadmore="loadmore"
    >
      <div
        class="cell-item"
        v-for="(item, index) in recipeMenuList"
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
    this.getRecipeMenuList(1);
  },
  data() {
    return {
      col: 2,
      recipeMenuList: [],
      index: 1,
    };
  },
  methods: {
    getRecipeMenuList(index) {
      recipeMenuListApi(index)
        .then((response) => {
          let data = response.data;
          if (data.success) {
            this.recipeMenuList = this.recipeMenuList.concat(
              data.data.big_recommend.list
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadmore() {
      this.index++;
      if (this.index > 31) {
        this.$toast("到底啦~~");
      } else {
        this.getRecipeMenuList(this.index);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.eat-product {
  margin-top: 1rem;
  width: 100vw;
  box-sizing: border-box;
  background-color: #f5f5f5f5;
  .vue-waterfall {
    overflow-x: hidden;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 2rem;
  }
  .cell-item {
    width: 100%;
    background: #ffffff;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0.3rem;
    img {
      border-radius: 12px;
      width: 100%;
      display: block;
      // 等比缩小图片来适应元素的尺寸
      background-size: contain;
      background-image: url("../../../images/placeholderImg/product-img-load.png");
    }
    .item-body {
      padding: 0.6rem;
      .item-desc {
        font-size: 0.8 rem;
        color: #333333;
        line-height: 1rem;
        font-weight: bold;
      }
      .item-footer {
        margin-top: 1rem;
        position: relative;
        display: flex;
        align-items: center;
        .avatar {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
        }
        .name {
          max-width: 150px;
          margin-left: 10px;
          font-size: 0.75rem;
          color: #999999;
        }
      }
    }
  }
}
</style>