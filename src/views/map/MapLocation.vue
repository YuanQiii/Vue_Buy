<template>
  <div>
    <van-icon name="location" />
    <span>{{ currentCity }}</span>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "MapLocation",
  created() {
    this.getCity();
  },
  computed: {
    ...mapState("user", ["currentCity"]),
  },
  methods: {
    ...mapMutations("user", ["UPDATE_CURRENT_CITY"]),
    getCity() {
      let url = "https://pv.sohu.com/cityjson?ie=utf-8";
      this.$jsonp(url)
      let timer = setInterval(() => {
        if(window.returnCitySN !== undefined){
          let city = ''
          let cname = window.returnCitySN.cname

          if(cname.includes('省')){
            city = cname.split('省')[1].slice(0, -1)
          }else{
            city = cname.slice(0, -1)
          }
          
          this.UPDATE_CURRENT_CITY(city)
          clearInterval(timer)
        }
      }, 50);
    },
  },
};
</script>

<style scoped>
</style>
