<template lang="pug">
#common 
  header-component
  layout-component
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import headerComponent from "@/components/header/index.vue";
import layoutComponent from "@/components/layout/index.vue";
@Component({
  components: { headerComponent, layoutComponent },
})
export default class commonPage extends Vue {
  // 这边例子先连资产平台的权限做演示
}
</script>
<style lang="scss" scoped>
#common {
  height: 100%;
  width: 100%;
}
</style>
