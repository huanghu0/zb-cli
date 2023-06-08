<template lang="pug">
.table-component
  el-table(:data="tableData" :max-height="maxHeight" size="mini"  :header-cell-style="headerCellStyle" :cell-style="cellStyle" style="width:100%;")
    el-table-column(v-for="(item,index) in columnList" :key="index" :label="item.label" :prop="item.prop" :width="item.width")
      //- 表头特殊处理
      template(#header v-if="item.required || item.tooltip") #[font(style="color:red" v-if="item.required") *] {{ item.label }}
        el-tooltip(effect="light"  v-if="item.tooltip" placement="right")
          .tool-tip-content(slot="content") {{item.tooltip}}
          i.el-icon-question
      //- 单cell是Input框
      template(#default="{row, column, $index}" v-if="item.type && item.type === 'input'")
        el-tooltip(effect="light"  :disabled="!row[item.prop]" placement="top")
          .tool-tip-content(slot="content") {{row[item.prop]}}
          el-input(v-model="row[item.prop]" :maxlength="item.maxlength" :show-word-limit="Boolean(item.maxlength)" placeholder="请输入")
    el-table-column(v-if="showOperate" :width="operateWidth" label="操作")
      template(#default="{row, column, $index}")
        slot(:row="row" :index="$index" name="operate")
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
@Component
export default class tableComponent extends Vue {
  @Prop({ default: () => [] }) tableData!: any; // 具体数据

  @Prop({ default: () => [] }) columnList!: any; // 展示列

  @Prop({ default: false }) showOperate!: boolean; // 是否展示操作列

  @Prop({ default: 0 }) operateWidth!: number; // 操作列宽度

  @Prop() headerCellStyle!: object; // 表头单元格样式

  @Prop() cellStyle!: object; // 单元格样式

  @Prop() maxHeight!: number; // 最大高度
}
</script>
<style lang="scss" scoped></style>
