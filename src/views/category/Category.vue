
<template>
  <div class="category">
    <!-- 骨架屏 -->
    <category-skeleton v-if="skeletonShow" />

    <div v-else>
      <!-- 搜索组件 -->
      <search :goodsList="categoriesGoodsList" class="search" />

      <van-sticky offset-top="2rem">
        <!-- 左侧分类导航 -->
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
              <!-- 商品内容导航 -->
              <category-content
                v-if="index == menuActive"
                :currentIndex="menuActive"
                :categoriesDetailData="categoriesDetailData"
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
    // 获取分类商品信息
    this.getCategories();
    this.getCategoriesDetail(this.menuActive);
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
    // 左侧选中的导航索引
    menuActive: {
      get() {
        return this.$store.state.menuActive;
      },
      set(value) {
        // 更新索引
        this.UPDATE_MENU_ACTIVE(value);
      },
    },

    // 组合导航数组
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

    // 获取导航分类数据
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

    // 获取商品列表
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

    // 获取全部商品数据
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

    // 切换导航，更新索引和商品列表
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