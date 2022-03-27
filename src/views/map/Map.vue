<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-17 18:04:02
 * @FilePath: \mall-vue\src\views\map\Map.vue
-->
<template>
  <div class="map">
    <div class="baidu-map">
      <baidu-map
        class="bm-view"
        :center="center"
        :zoom="zoom"
        :inertial-dragging="true"
        :scroll-wheel-zoom="true"
        @ready="handler"
      >
        <!-- <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list> -->
        <bm-geolocation
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT"
          :showAddressBar="true"
          :autoLocation="true"
        ></bm-geolocation>
        <bm-local-search
          :keyword="keyword"
          :auto-viewport="true"
          :location="location"
          @searchcomplete="searchcomplete"
        ></bm-local-search>
      </baidu-map>
    </div>
  </div>
</template>

<script>
import { BmlMarkerClusterer } from "vue-baidu-map";
export default {
  name: "Map",
  components: {
    BmlMarkerClusterer,
  },
  data() {
    return {
      center: "成都",
      zoom: 15,
      location: "成都",
      keyword: "欣园",
    };
  },
  methods: {
    handler({ BMap, map }) {
      console.log(BMap, map);
    },
    searchcomplete(results) {
      console.log(results);
    },
  },
};
</script>

<style lang="less" scoped>
.bm-view {
  margin-top: 5rem;
  width: 100%;
  height: 50vh;
}
</style>