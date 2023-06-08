<template lang="pug">
el-dialog(:visible.sync="dialogVisible" :title="title" :width="width")
  slot(name="main")
  span.dialog-footer(slot="footer")
    el-button(@click="submit" type="primary" size="mini") {{submitText}}
    el-button(@click="dialogVisible = false" size="mini") 取 消    
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class dialogComponent extends Vue {
  @Prop({ default: false }) showDialog!: boolean; // dialog标题

  @Prop({ default: "" }) title!: string; // dialog标题

  @Prop({ default: "30%" }) width!: string; // dialog标题

  @Prop({ default: "确 定" }) submitText!: string; // dialog标题

  submit() {
    this.$emit("submit");
  }

  close() {
    this.$emit("close");
  }

  get dialogVisible() {
    return this.showDialog;
  }
  set dialogVisible(val: any) {
    this.$emit("close");
  }
}
</script>
<style lang="scss" scoped>
.dialog-footer {
  text-align: center;
}
</style>
