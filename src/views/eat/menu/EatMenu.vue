<!--
 * @Author: your name
 * @Date: 2022-03-21 10:54:45
 * @LastEditTime: 2022-03-21 14:07:21
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue_buy\src\views\eat\menu\EatMenu.vue
-->
<template>
  <div class="eat-menu">
    <van-tabs
      :active="active"
      @change="tabsChnage"
      class="tabs"
      color="#28BE57"
    >
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
    getTabIndex(value) {
      let active = 0;
      this.recipeAllScene.forEach((element, index) => {
        if (element.name == value) {
          active = index;
        }
      });
      return active;
    },
    dropdownChange(value) {
      this.active = this.getTabIndex(value);
      this.dropdownText = value;
    },
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