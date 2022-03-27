<!--
 * @Author: your name
 * @Date: 2022-03-18 14:43:33
 * @LastEditTime: 2022-03-22 13:41:29
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \mall-vue\src\views\category\Category.vue
-->
<template>
  <div class="category">
    <category-skeleton v-if="skeletonShow" />

    <div v-else>
      <search :goodsList="categoriesGoodsList" class="search" />
      <van-sticky offset-top="2rem">
        <van-tree-select
          class="tree"
          height="90vh"
          :items="categoriesMenu"
          :main-active-index.sync="menuActive"
          @click-nav="clickNav"
        >
          <template #content>
            <div
              class="menu"
              v-for="(item, index) in categoriesMenu"
              :key="index"
            >
              <category-content
                :currentIndex="menuActive"
                :categoriesDetailData="categoriesDetailData"
                v-show="index == menuActive"
              />
            </div>
          </template>
        </van-tree-select>
      </van-sticky>
    </div>
  </div>
</template> 

<script>
import { mapMutations } from "vuex";
import { CategoriesApi, CategoriesDetailApi } from "@/api/index.js";
import CategoryContent from "./components/content/CategoryContent.vue";

import CategorySkeleton from "./components/skeleton/CategorySkeleton.vue";
import Search from "@/components/search/Search.vue";

export default {
  components: { CategorySkeleton, Search, CategoryContent },
  created() {
    this.getCategories();
    this.getCategoriesDetail(0);
    this.getCategoriesGoods();
  },
  data() {
    return {
      skeletonShow: true,
      categoriesData: [],
      categoriesDetailData: [],
      categoriesGoodsList: [],
    };
  },
  computed: {
    menuActive: {
      get() {
        return this.$store.state.menuActive;
      },
      set(value) {
        this.UPDATE_MENU_ACTIVE(value);
      },
    },
    categoriesMenu() {
      let tempArr = [];
      this.categoriesData.forEach((element) => {
        tempArr.push({ text: element.name });
      });
      return tempArr;
    },
  },
  methods: {
    ...mapMutations(["UPDATE_MENU_ACTIVE"]),
    getCategories() {
      CategoriesApi()
        .then((response) => {
          if (response.status == 200) {
            this.categoriesData = response.data.data.cate;
            this.skeletonShow = false;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCategoriesDetail(index) {
      CategoriesDetailApi(index + 1)
        .then((response) => {
          if (response.status == 200) {
            this.categoriesDetailData = response.data.data.cate;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getCategoriesGoods() {
      for (let index = 1; index < 19; index++) {
        CategoriesDetailApi(index).then((response) => {
          let arr = [];
          response.data.data.cate.forEach((element) => {
            arr.push(...element.products);
          });
          this.categoriesGoodsList = this.categoriesGoodsList.concat(arr);
        });
      }
    },
    clickNav(index) {
      this.UPDATE_MENU_ACTIVE(index);
      this.getCategoriesDetail(index);
    },
  },
};
</script>

<style lang="less" scoped>
.category {
  position: relative;
  .search {
    position: absolute;
    top: -3rem;
  }
  .tree {
    margin-top: 4rem;
  }
}
</style>