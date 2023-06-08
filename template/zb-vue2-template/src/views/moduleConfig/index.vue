<template lang="pug">
#data-query {{ test }}
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "moduleConfig",
  components: {},
})
export default class moduleConfig extends Vue {
  test = "12344455";
}
</script>
<style lang="scss" scoped></style>
