<template>
  <div
    ref="list"
    class="infinite-list-container"
    :style="listStyle"
    @scroll="handleScroll"
  >
    <div
      class="infinite-list-phantom"
      :style="{ height: listHeight + 'px' }"
    ></div>
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div
        ref="items"
        class="infinite-list-item"
        v-for="item in visibleData"
        :key="item.id"
        :style="{ height: itemSize + 'px' }"
      >
        <slot :prop="item"></slot>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "VirtualList",
  mounted() {
    this.screenHeight = document.documentElement.clientHeight;
    this.start = 0;
    this.end = this.start + this.visibleCount;
  },
  props: {
    //所有列表数据
    listData: {
      type: Array,
      default: () => [],
    },
    //每项高度
    itemSize: {
      type: Number,
      default: 200,
    },
    isFixed: {
      type: Boolean,
      default: false,
    },
    // 加载屏数
    preLoadNum: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      //可视区域高度
      screenHeight: 0,
      //偏移量
      startOffset: 0,
      //起始索引
      start: 0,
      //结束索引
      end: null,

      oldScrollTop: 0,
    };
  },
  computed: {
    //列表总高度
    listHeight() {
      return this.listData.length * Math.ceil(this.itemSize / 2);
    },
    //可显示的列表项数
    visibleCount() {
      let temp =
        Math.ceil(this.screenHeight / this.itemSize) * 2 * this.preLoadNum;
      console.log(temp);
      return temp;

      // return Math.ceil(this.screenHeight / Math.ceil(this.itemSize / 2)) * this.preLoadNum;
    },
    //偏移量对应的style
    getTransform() {
      return `translate3d(0,${this.startOffset}px,0)`;
    },
    //获取真实显示列表数据
    visibleData() {
      return this.listData.slice(
        this.start,
        Math.min(this.end, this.listData.length)
      );
    },
    // 列表是否滑动
    listStyle() {
      return `overflow: ${this.isFixed ? "auto" : "hidden"}`;
    },
  },
  methods: {
    handleScroll() {
      //当前滚动位置
      let scrollTop = this.$refs.list.scrollTop;

      // 判断滑动方向
      if (scrollTop > this.oldScrollTop) {
        // 向下滚动

        // 此时的开始索引
        this.start = Math.floor(scrollTop / this.itemSize) * 2;
        //此时的结束索引
        this.end = this.start + this.visibleCount * 2;
        //此时的偏移量
        this.startOffset = scrollTop - (scrollTop % this.itemSize);
      } else {
        // 向上滚动

        // 此时的开始索引
        let temp = (scrollTop / this.itemSize);
        if (String(temp).includes(".")) {
          temp = String(temp).split(".")[0] * 1 + 1; 
        }
        this.start = temp * 2;
        //此时的结束索引
        this.end = this.start + this.visibleCount * 2;
        //此时的偏移量
        if(this.start > 0){
          this.startOffset =
          scrollTop - ((scrollTop % this.itemSize) - this.itemSize);
        }else{
          this.startOffset = 0
        }
      }

      this.oldScrollTop = scrollTop;
    },
  },
};
</script>
  
  
<style scoped>
.infinite-list-container {
  height: 100%;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}

.infinite-list-item {
  display: flex;
  justify-content: center;
  align-content: center;
}
</style>