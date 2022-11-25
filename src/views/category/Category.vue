
<template>
  <div class="category">
    <!-- 骨架屏 -->
    <category-skeleton v-if="skeletonShow" />

    <div v-else>
      <!--左侧分类导航-->
      <van-tree-select
          class="tree"
          height="92vh"
          :items="categoriesMenu"
          :main-active-index="menuActive"
          @click-nav="clickNav"
      >
        <template #content>
          <div
              :class="isLoaded ? 'menu left' : 'menu right'"
              v-for="(item, index) in categoriesMenu"
              :key="item.text"
          >
            <!-- 商品内容导航 -->
            <category-content
                v-if="index === menuActive"
                :currentIndex="menuActive"
                :categoriesDetailData="categoriesDetailData"
            />
          </div>
        </template>
      </van-tree-select>
      <van-sticky>

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
  },
  data() {
    return {
      skeletonShow: true,
      isLoaded: false,
      categoriesData: [],
      categoriesDetailData: [],
      categoriesGoodsList: [],
    };
  },
  computed: {
    // 左侧选中的导航索引
    menuActive(){
      return this.$store.state.menuActive;
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
          this.categoriesData = response.data.data.cate;
          this.skeletonShow = false;
        })
    },

    // 获取商品列表
    getCategoriesDetail(index) {
      CategoriesDetailApi(index + 1)
        .then((response) => {
          this.categoriesDetailData = response.data.data.cate;
          this.isLoaded = true
        })
    },
    // 切换导航，更新索引和商品列表
    clickNav(index) {
      this.isLoaded = false
      this.UPDATE_MENU_ACTIVE(index);
      this.getCategoriesDetail(index);
    },
  },
};
</script>

<style lang="less" scoped>
.category /deep/ .van-tree-select__nav{
  flex: .65;

}

/deep/ .van-sidebar-item--select::before{
  background-color: rgb(40, 190, 87);
}

.menu{
  transition: .3s;
}
.left{
  margin-left: 0;
}
.right{
  margin-left: 300px;
}
</style>