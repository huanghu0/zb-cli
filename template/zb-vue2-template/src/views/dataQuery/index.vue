<template lang="pug">
#data-query {{ test }}
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "dataQuery",
  components: {},
})
export default class dataQuery extends Vue {
  test = "123";
}
</script>

<style lang="scss" scoped></style>
