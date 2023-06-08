<template lang="pug">
#header-component
  //- 菜单左侧留白
  .header-left
  .logo 图数据查询平台
  .module-box
    .leftButton
      i.el-icon-d-arrow-left(@click="turnLeft" v-show="(showButton && left !== 0) || left < 0")
    .module-list(ref="moduleList")
      .module-content(ref="moduleContent" id="moduleContent" :style="{left: left + 'px' }")
        .module-item(v-for="(item, index) in moduleData" :key="index")
          a(:class="[moduleId === item.oid ? 'on' : '']" :to="item.firstPage" @click="changeModule(item)") {{ item.moduleName }}
    .rightButton
      i.el-icon-d-arrow-right(@click="turnRight" v-show="showButton && left !== moduleListWidth - moduleContentWidth")
  //- 菜单右侧留白
  .header-right
</template>
<script lang="ts">
import { Watch, Vue, Ref, Component } from "vue-property-decorator";
import { Getter } from "vuex-class";
@Component
export default class headerComponent extends Vue {
  showButton = false;
  left = 0;
  moduleListWidth = 0;
  moduleContentWidth = 0;

  @Getter("moduleData") moduleData: any;

  @Getter("moduleId") moduleId!: string;

  @Ref() readonly moduleList!: any;
  @Watch("moduleData", { deep: true, immediate: true })
  changePlatNames(val: Array<object>) {
    this.moduleContentWidth = val.length * 140;
    this.$nextTick(() => {
      this.ifShowButton();
    });
  }

  mounted() {
    this.$nextTick(() => {
      window.addEventListener("resize", this.ifShowButton);
    });
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.ifShowButton);
  }

  changeModule(item: any) {
    this.$router.push({
      path: item.firstPage,
    });
  }

  ifShowButton() {
    this.moduleListWidth = this.moduleList.clientWidth;
    this.showButton = this.moduleListWidth < this.moduleContentWidth;
  }

  turnLeft() {
    if (this.left < -140) {
      this.left += 140;
    } else if (this.left < 0) {
      this.left = 0;
    } else {
      this.$message.info("已经到底了");
    }
  }

  turnRight() {
    let difference = this.moduleContentWidth - this.moduleListWidth;
    console.log(difference + this.left);
    if (difference + this.left > 140) {
      this.left -= 140;
    } else if (difference + this.left > 0) {
      this.left -= difference + this.left;
    } else {
      this.$message.info("已经到底了");
    }
  }
}
</script>
<style lang="scss" scoped>
#header-component {
  min-width: 100%;
  height: 60px;
  background: #3a4e64;
  position: sticky;
  top: 0;
  z-index: 3000;
  @include flex-div();
}
.header-left {
  width: 150px;
}
.logo {
  font-size: $fontLogo;
  color: #fff;
  width: 230px;
  font-weight: bold;
}
.module-box {
  flex: 1 1 auto;
  margin-left: 100px;
  @include flex-div();
  height: 100%;
  .module-list {
    flex: 1 1 auto;
    position: relative;
    overflow: hidden;
    height: 100%;
    .module-content {
      position: absolute;
      @include flex-div($align: flex-start);
      .module-item {
        text-align: center;
        line-height: 55px;
        width: 140px;
        font-size: $fontHead;
        a {
          color: #d7d7d7;
          cursor: pointer;
          display: inline-block;
          max-width: 130px;
          overflow: hidden;
        }
        a.on {
          color: #fff;
          border-bottom: 5px solid #55aeb1;
        }
      }
    }
  }
  .leftButton,
  .rightButton {
    width: 40px;
    color: white;
    font-size: 24px;
    line-height: 60px;
    i {
      cursor: pointer;
    }
  }
  .rightButton {
    text-align: right;
  }
}
.header-right {
  width: 230px;
  justify-self: flex-end;
}
</style>
