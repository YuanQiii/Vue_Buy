<!--
 * @Autor: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-28 09:50:18
 * @FilePath: \vue_buy\src\views\mine\address\AddressEdit.vue
-->

<template>
  <!-- 收货地址编辑 -->
  <div class="address-edit">
    <!--导航栏-->
    <van-nav-bar
      :title="modeName"
      left-arrow
      :fixed="true"
      :border="true"
      @click-left="onClickLeft"
    />

    <van-address-edit
      v-if="editShow"
      class="edit"
      :area-list="areaList"
      :address-info="info"
      :show-delete="deleteShow"
      show-set-default
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
  </div>
</template>

<script>
import areaList from "@/utils/area.js";
import { mapMutations, mapState } from "vuex";

export default {
  name: "AddressEdit",
  activated() {
    this.editShow = true;
  },
  deactivated() {
    this.editShow = false;
  },
  data() {
    return {
      areaList,
      editShow: true,
    };
  },
  computed: {
    ...mapState("cart", ["addressList"]),

    // 地址编辑模式
    modeName() {
      return this.mode === "add" ? "添加地址" : "编辑地址"
    },
    mode() {
      return this.$route.params.mode;
    },
    info() {
      return this.$route.params.info;
    },
    addressId() {
      return this.$route.params.id;
    },

    // 删除按钮回调函数
    deleteShow() {
      return this.mode !== "add"
    },
  },
  methods: {
    ...mapMutations("cart", [
      "ADD_ADDRESS",
      "DEL_ADDRESS",
      "UPDATE_ORDER_ADDRESS",
      "UPDATE_DEFAULT_ADDRESS",
    ]),
    onClickLeft() {
      this.$router.back();
    },
    onSave(value) {
      if (this.mode === "add") {
        this.updateAddress(value);
      } else {
        let index = this.getAddressIndex();
        this.DEL_ADDRESS(index);
        this.updateAddress(value, index);
      }
      this.$router.back();
    },
    onDelete() {
      let index = this.getAddressIndex();
      this.DEL_ADDRESS(index);
      this.$router.back();
    },
    updateAddress(value) {
      value.address =
        value.province + value.city + value.county + value.addressDetail;
      value.id = this.getAddressId();

      // 唯一地址设置为默认
      if (!this.addressList.length) {
        value.isDefault = true;
        this.UPDATE_ORDER_ADDRESS(value);
      }

      // 如果为默认地址，修改其他地址为非默认地址
      if (value.isDefault) {
        this.UPDATE_DEFAULT_ADDRESS(value.id);
      }
      this.ADD_ADDRESS(value);
    },
    getAddressId() {
      return new Date().getTime();
    },
    getAddressIndex() {
      let temp = 0;
      this.addressList.forEach((element, index) => {
        if (element.id === this.addressId) {
          temp = index;
        }
      });
      return temp;
    },
  },
};
</script>

<style lang="less" scoped>
.edit {
  margin-top: 48px;
}
</style>