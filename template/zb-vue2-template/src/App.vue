<template lang="pug">
#app
  router-view
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({})
export default class App extends Vue {
  // 这边例子先连资产平台的权限做演示
  created() {
    // 这里是判断环境修改自己写的css的主体色
    // if (!window.location.origin.includes("http://172.31.68.62")) {
    //   document
    //     .getElementsByTagName("body")[0]
    //     .style.setProperty("--primaryColor", "#ff760c");
    //   document
    //     .getElementsByTagName("body")[0]
    //     .style.setProperty("--primaryBgColor", "#ffeada");
    // }
  }
}
</script>
<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  min-width: 1000px;
}
</style>
