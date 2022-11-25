<!--
 * @Author: YuanQiii
 * @GitHub: https://github.com/YuanQiii
 * @Date: 2022-03-23 21:42:05
 * @FilePath: \vue_buy\src\views\order\OrderTimeInterval.vue
-->
<template>
  <div class="order-interval-list">
    <!-- 时间选择器 -->
    <van-popup
      v-model="showDateTimePopView"
      round
      lock-scroll
      closeable
      @closed="closePopView"
      :style="{ height: '70%' }"
      position="bottom"
    >
      <!-- 头部 -->
      <div class="itemHeader">
        <span class="timeTitle">选择送达时间:</span>
      </div>
      <div class="listWrapper">
        <div class="leftContent">
          <li
            class="categoryItem"
            v-for="(date, index) in leftDateData"
            :class="{ selected: currentIndex === index }"
            @click="clickLeftLi(index)"
            :key="index"
          >
            {{ date.time }}
          </li>
        </div>
        <div class="rightContent">
          <!-- 今天 -->
          <li
            v-for="(time, index) in timeList.today"
            @click="clickTodayTimeList(index, time)"
            :class="{ checked: todayIndex === index }"
            :key="index.id"
            v-show="!currentIndex"
          >
            {{ time }}
            <van-icon
              name="success"
              style="margin-left: 40%"
              v-show="todayIndex === index"
            />
          </li>
          <!-- 明天 -->
          <li
            v-for="(time, index) in timeList.tomorrow"
            :key="index.id"
            :class="{ checked: tomorrowIndex === index }"
            @click="clickTomorrowTimeList(index, time)"
            v-show="currentIndex"
          >
            {{ time }}
            <van-icon
              name="success"
              style="margin-left: 40%"
              v-show="tomorrowIndex === index"
            />
          </li>
        </div>
      </div>
      <div class="sureButton" @click="sureCheckTime">确定</div>
    </van-popup>
  </div>
</template>
<script>
const dayjs = require("dayjs");
// require('dayjs/locale/zh-cn')
const customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)


export default {
  name: "OrderTimeInterval",
  props: {
    showDateTimePopView: Boolean,
  },
  data() {
    return {
      currentIndex: 0,
      chooseDeliveryTime: "",
      todayIndex: 0,
      tomorrowIndex: 0,
      currentItem: 0,
    };
  },
  computed: {
    // 今天时间和明天时间
    leftDateData() {
      let today = "今天";
      let tomory = "明天";
      return [{ time: today }, { time: tomory }];
    },
    //  时间段
    timeList() {
      // let times = Moment(new Date()).format().split("T")[0];
      // 当前时间
      var nowTime = dayjs(new Date()).format("HH:mm");
      // 把时间分割出来
      let hour = Number(nowTime.split(":")[0]);
      // 把分钟延迟15分钟
      let min = Number(nowTime.split(":")[1]) + 15;
      // 和30作比较设置配送时间
      if (min < 30) {
        min = 30;
      } else {
        hour += 1;
        min = "00";
      }
      let newTime = hour + ":" + min;
      let todayTimeArray = this.timeIntervalList(newTime, "23:00");
      let tomorrowTimeArray = this.timeIntervalList("07:00", "23:00");
      return { today: todayTimeArray, tomorrow: tomorrowTimeArray };
    },
  },
  methods: {
    // 时间区间段换算
    timeIntervalList(startTime, endTime) {
      let tempDate = startTime
      let dateArr = []
      while(tempDate !== '23:00'){
        let before = tempDate
        if(tempDate.split(':')[1] === '00'){
          let temp = `${tempDate.split(':')[0]}:30`
          tempDate = temp
          dateArr.push(`${before} - ${temp}`)
        }else{
          let num = Number(tempDate.split(':')[0]) + 1
          if(num < 10){
            num = `0${num}`
          }
          let temp = `${num}:00`
          tempDate = temp
          dateArr.push(`${before} - ${temp}`)
        }
      }
      return dateArr
    },
    // 点击今天
    clickTodayTimeList(index, time) {
      this.todayIndex = index;
      this.chooseDeliveryTime = time;
    },
    // 点击明天
    clickTomorrowTimeList(index, time) {
      this.tomorrowIndex = index;
      this.chooseDeliveryTime = time;
    },
    // 确认选择时间
    sureCheckTime() {
      let date = this.currentIndex === 0 ? "今天" : "明天";
      if (this.chooseDeliveryTime.length < 1) {
        // 设置默认值
        let fristTodayData = this.timeList.today[0];
        let secondDayData = this.timeList.tomorrow[0];
        this.chooseDeliveryTime =
          this.currentIndex === 0 ? fristTodayData : secondDayData;
      }
      this.$emit("changeData", false, date + this.chooseDeliveryTime);
    },
    clickLeftLi(index) {
      this.currentIndex = index;
    },
    closePopView() {
      let date = this.currentIndex === 0 ? "今天" : "明天";
      this.$emit("changeData", false, date + this.chooseDeliveryTime);
    },
  },
};
</script>

<style lang="less" scoped>
.order-interval-list {
  .itemHeader {
    height: 40px;
    line-height: 40px;
    border-bottom: solid 0.16px #e8e9e8;
    .timeTitle {
      font-size: 12.8px;
      margin-left: 40%;
    }
  }
  .integralToMoney {
    color: red;
  }
  .listWrapper {
    display: flex;
    position: absolute;
    top: 44px;
    bottom: 48px;
    width: 100%;
    overflow: hidden;
    .leftContent {
      background-color: #f4f4f4;
      width: 85px;
      flex: 0 0 85px;
      .categoryItem {
        text-align: left;
        height: 32px;
        line-height: 32px;
        padding: 4.8px;
        font-size: 11.2px;
        list-style-type: none;
        border-bottom: solid 0.16px #e8e9e8;
        position: relative;
      }
    }
    .selected {
      background: #fff;
      font-weight: bold;
      font-size: 14px;
      color: #333333;
    }
    .rightContent {
      left: 83.2px;
      right: 0;
      top: 0px;
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      li {
        list-style-type: none;
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding-left: 11.2px;
        border-bottom: solid 0.16px #e8e9e8;
      }
      .checked {
        color: #3bba63;
      }
    }
  }
  .sureButton {
    display: flex;
    position: absolute;
    justify-content: center;
    justify-items: center;
    bottom: 0px;
    width: 90%;
    margin-left: 5%;
    border-radius: 40px;
    height: 40px;
    line-height: 40px;
    margin-bottom: 4px;
    background-color: #3bba63;
    color: white;
  }
}
</style>