<!--
 * @Autor: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-28 09:50:18
 * @FilePath: \vue_buy\src\views\eat\menu\EatMenu.vue
-->

<template>
  <div class="eat-menu">
    <!-- 菜单导航 -->
    <van-tabs
        v-model="index"
        @change="tabsChange"
        animated
        class="tabs"
        color="#28BE57"
    >
      <van-tab
          :title="item.name"
          v-for="item in recipeAllScene"
          :key="item.name"
      ></van-tab>
    </van-tabs>
    <!-- 菜单导航下拉列表 -->
    <van-dropdown-menu class="dropdown-menu" active-color="#28BE57">
      <van-dropdown-item
          @change="dropdownChange"
          :title="dropdownTitle"
          :value="dropdownText"
          :options="dropdownOption"
      />
    </van-dropdown-menu>
  </div>
</template>

<script>
export default {
  name: "EatMenu",
  props: {
    recipeAllScene: {
      type: Array,
      default: () => [],
    },
    activeIndex: {
      type: Number,
      default: 0
    }
  },
  computed: {
    // 菜单下拉列表参数
    dropdownOption() {
      let list = [];
      this.recipeAllScene.forEach((element) => {
        list.push({
          text: element.name,
          value: element.name,
        });
      });
      return list;
    },
    index: {
      get(){
        return this.localActiveIndex
      },
      set(value){
        this.localActiveIndex = value
        this.$emit('update:activeIndex', this.localActiveIndex)
      }
    }
  },
  data() {
    return {
      dropdownTitle: "全部菜单",
      dropdownText: "家常菜",
      localActiveIndex: this.activeIndex
    };
  },
  methods: {
    // 获取选中菜单名对应的导航索引
    getTabIndex(value) {
      let active = 0;
      this.recipeAllScene.forEach((element, index) => {
        if (element.name === value) {
          active = index;
        }
      });
      return active;
    },

    // 菜单下拉更新导航索引
    dropdownChange(value) {
      this.index = this.getTabIndex(value);
      this.dropdownText = value;
    },

    // 更新导航索引对应的菜单名
    tabsChange(title, name) {
      this.dropdownText = name;
    },
  },
};
</script>

<style lang="less" scoped>
.eat-menu {
  width: 375px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .tabs {
    width: 360px;
  }

  .dropdown-menu {
    width: 360px;
    margin-top: 8px;
    /deep/ .van-dropdown-menu__bar{
      height: 34px;
    }
  }
}

</style>