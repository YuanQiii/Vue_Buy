<template>
  <div class="map">

    <div id="container">
    </div>

    <div class="operate">
      <van-search v-model="keywords" placeholder="请输入地址" />

      <van-list class="result-list" v-show="pois.length">
        <van-cell v-for="value in pois" :key="value.id" :title="value.name" @click="updateAddressInfo(value)"/>
      </van-list>

      <van-address-edit
          ref="mapAddressEdit"
          v-show="!pois.length"
          class="address-edit"
          :area-list="areaList"
          :area-columns-placeholder="['请选择', '请选择', '请选择']"
          :address-info="addressInfo"
          :disable-area="true"
          :show-set-default="true"
          @save="onSave"
      />
    </div>
  </div>

</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader';
import areaList from "@/utils/area.js";
import {mapMutations, mapState} from "vuex";

export default {
  name: "MapContainer",
  mounted() {
    window._AMapSecurityConfig = {
      securityJsCode: '074c1290790c5db9d8160348404d6505',
    }
    //DOM初始化完成进行地图初始化
    this.initMap();
  },
  data() {
    return {
      map: null,
      AMap: null,
      marker: null,
      placeSearch: null,
      address: '',
      addressInfo: {
        id: 1,
        name: '',
        tel: '',
        province: '',
        city: '',
        county: '',
        addressDetail: '',
        areaCode: '',
        postalCode: '',
        isDefault: true
      },
      keywords: '',
      pois: [],
      tipsShow: false,
      defaultPosition: [104.065689, 30.657501],
      areaList
    }
  },
  watch: {
    keywords(newValue){
      if(newValue){
        this.placeSearch.search(newValue, (status, result) => {
          if(status === 'complete'){
            this.pois = result.poiList.pois
          }else{
            console.log(result)
          }
        })
      }
    }
  },
  computed: {
    ...mapState("cart", ["addressList"]),
    ...mapState('user', ["userInfo"])
  },
  methods: {
    ...mapMutations("cart", [
      "ADD_ADDRESS",
      "UPDATE_DEFAULT_ADDRESS",
    ]),
    ...mapMutations('user', ['UPDATE_CURRENT_CITY']),
    // 初始化地图
    initMap() {
      AMapLoader.load({
        key: "2cf9e05c0ca9b681abe04d5b50bc88ca",             // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0",      // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.ToolBar'],       // 需要使用的的插件列表
      }).then((AMap) => {
        this.AMap = AMap
        this.getCurrentPosition()
        this.map = new this.AMap.Map("container", {  //设置地图容器id
          viewMode: "3D",    //是否为3D地图模式
          zoom: 15,           //初始化地图级别
        });
        this.map.addControl(new this.AMap.ToolBar());
        this.initMapClick()
      }).catch(e => {
        console.log(e);
      })
    },
    // 初始化地图点击事件
    initMapClick(){
      this.map.on('click', ev => {
        // 触发事件的地理坐标，AMap.LngLat 类型
        let lnglat = ev.lnglat;
        let {lng, lat} = lnglat
        this.handlePosition([lng , lat])
      });
    },
    // 获取精确地址坐标
    getCurrentPosition() {
      this.AMap.plugin('AMap.Geolocation', () => {
        let geolocation = new this.AMap.Geolocation({
          // 是否使用高精度定位，默认：true
          enableHighAccuracy: true,
          // 设置定位超时时间，默认：无穷大
          timeout: 10000,
          // 定位按钮的停靠位置的偏移量
          offset: [10, 20],
          //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
          zoomToAccuracy: true,
          //  定位按钮的排放位置,  RB表示右下
          position: 'RB'
        })

        // data是具体的定位信息
        let onComplete = data => {
          this.handlePosition([data.position.lng, data.position.lat])
        }

        // 定位出错
        let onError = data => {
          this.handlePosition(this.defaultPosition)
        }
        geolocation.getCurrentPosition((status, result) => {
          if (status === 'complete') {
            onComplete(result)
          } else {
            onError(result)
          }
        });
      })
    },
    // 添加标记
    addMark(position) {
      // 删除标记
      if(this.marker){
        this.marker.setMap(null);
      }

      this.marker = new this.AMap.Marker({
        icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
        position,
        offset: new this.AMap.Pixel(-23, -56)
      });

      this.marker.setMap(this.map);
    },
    // 设置地图中心点
    setMapCenter(position) {
      this.map.setCenter(position)
    },
    // 获取地址
    getAddressByPosition(position) {
      this.AMap.plugin(['AMap.Geocoder'], () => {
        new this.AMap.Geocoder().getAddress(position, (status, result) => {
          if (status === 'complete' && result.regeocode) {
            let addressComponent = result.regeocode.addressComponent
            this.addressInfo = Object.assign(this.$refs.mapAddressEdit.data, {
              areaCode: addressComponent.adcode,
              addressDetail: result.regeocode.formattedAddress
                  .replace(addressComponent.province, '')
                  .replace(addressComponent.city, '')
                  .replace(addressComponent.district, '')
            })
            this.address = result.regeocode.formattedAddress;
            this.getPois(addressComponent.city.replace('市', ''))
          } else {
            console.log('根据经纬度查询地址失败')
          }
        })
      })
    },
    // 更新地区和详细地址
    updateAddressInfo(value) {
      let {lng, lat} = value.location
      if(lng && lat){
        this.handlePosition([lng, lat])
      }
      this.keywords = ''
      this.pois = []
    },
    // 获取输入提示信息
    getPois(city = '成都'){
      this.AMap.plugin('AMap.PlaceSearch', () => {
        let autoOptions = {
          city
        }
        this.placeSearch = new this.AMap.PlaceSearch(autoOptions);
      })
    },
    // 处理坐标
    handlePosition(position){
      this.addMark(position)
      this.setMapCenter(position)
      this.getAddressByPosition(position)
    },
    // 保存地址
    onSave(content) {
      if (this.userInfo.token) {
        let address = {
          address: `${content.city}${content.county}${content.addressDetail}`,
          id: new Date().getTime(),
          ...content
        }
        // 如果为默认地址，修改其他地址为非默认地址
        if (address.isDefault) {
          this.UPDATE_DEFAULT_ADDRESS(content.id);
        }
        this.ADD_ADDRESS(address)
        this.UPDATE_CURRENT_CITY(address.city.slice(0, -1))
        this.$router.back()
      } else {
        this.$router.push({
          path: "/login",
        });
      }
    },
  }
}
</script>

<style lang="less" scoped>
.map {
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  #container {
    padding: 0;
    margin: 0;
    width: 100%;
    flex: 1;
  }
  .operate{
    height: 400px;
    margin-bottom: 10px;
    .result-list{
      height: 400px;
      overflow: scroll;
      /deep/ .van-cell{
        line-height: 14px;
      }
    }
  }
}

</style>