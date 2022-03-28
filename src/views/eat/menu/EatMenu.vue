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
      :active="active"
      @change="tabsChnage"
      class="tabs"
      color="#28BE57"
    >
      <!-- 菜单导航下拉列表 -->
      <van-dropdown-menu class="dropdown-menu" active-color="#28BE57">
        <van-dropdown-item
          @change="dropdownChange"
          :title="dropdownTitle"
          :value="dropdownText"
          :options="dropdownOption"
        />
      </van-dropdown-menu>

      <van-tab
        :title="item.name"
        v-for="(item, index) in recipeAllScene"
        :key="index"
      ></van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "EatMenu",
  props: {
    recipeAllScene: {
      type: Array,
      default: [],
    },
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
  },
  data() {
    return {
      active: 0,
      dropdownTitle: "全部菜单",
      dropdownText: "家常菜",
    };
  },
  methods: {
    // 获取选中菜单名对应的导航索引
    getTabIndex(value) {
      let active = 0;
      this.recipeAllScene.forEach((element, index) => {
        if (element.name == value) {
          active = index;
        }
      });
      return active;
    },

    // 菜单下拉更新导航索引
    dropdownChange(value) {
      this.active = this.getTabIndex(value);
      this.dropdownText = value;
    },

    // 更新导航索引对应的菜单名
    tabsChnage(title, name) {
      this.dropdownText = name;
    },
  },
};
</script>

<style lang="less" scoped>
.eat-menu {
  .tabs {
  }
  .dropdown-menu {
    width: 90vw;
    margin-top: 0.5rem;
    margin-left: 4vw;
  }
}
</style>