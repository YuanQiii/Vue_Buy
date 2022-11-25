<!--
 * @Author: your name
 * @Date: 2022-03-15 20:59:27
 * @LastEditTime: 2022-03-22 09:38:20
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \vue_buy\src\App.vue
-->
<template>
  <div id="app">
    <keep-alive exclude="Order">
      <router-view />
    </keep-alive>
  </div>
</template> 

<script>
window.onload = function () {
  document.addEventListener("touchstart", function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener("gesturestart", function (event) {
    event.preventDefault();
  });
};
</script>


<style lang="less">
#app {
  width: 100%;
  height: 100%;
}

* {
  touch-action: pan-y;
}
</style>
