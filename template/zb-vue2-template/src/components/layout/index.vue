<template lang="pug">
#layout-component
  .side-bar(:style="{ width: isCollapse ? '65px' : '200px' }")
    .collapse-button(@click="collapse")
      i(:class="[isCollapse ? 'el-icon-caret-right' : 'el-icon-caret-left']")
    el-menu(
      :default-active="active",
      :default-openeds="openData",
      ref="menu",
      size="mini",
      router,
      :collapse="isCollapse",
      :collapse-transition="false"
    )
      template(v-for="(item, index) in menuList")
        el-submenu(
          v-if="item.children && item.children.length > 0",
          :index="item.menuUrl",
          :key="item.oid"
        )
          template(#title)
            i(:class="item.icon || 'el-icon-menu'")
            span(slot="title") {{ item.menuName }}
          el-menu-item(
            v-for="(sub, subIn) in item.children",
            :key="subIn",
            :index="sub.menuUrl"
          ) 
            span {{ sub.menuName }}
        el-menu-item(v-else :index="item.menuUrl", :key="item.oid") 
          i(:class="item.icon || 'el-icon-menu'")
          span(slot="title") {{ item.menuName }}
  .page-main(
    :style="{ width: isCollapse ? 'calc(100% - 65px)' : 'calc(100% - 201px)' }"
  )
    keep-alive(:include="routeList")
      //- 加key可以防止不用路由指向一个组件造成不刷新
      router-view.content(:key="$route.fullPath")
</template>
<script lang="ts">
import { Watch, Vue, Component } from "vue-property-decorator";
import { Getter } from "vuex-class";
@Component
export default class layoutComponent extends Vue {
  active = "";
  isCollapse = false;
  refreshNowPage = false;
  // 这个用来做那种跳详情页返回列表要保证列表静态的时候用，在监听route.path时候把要静态的组件的名字，注意是组件名放进去，然后返回后清除
  routeList = [] as any;

  keepAliveList = [
    {
      name: "original",
      pathList: ["/corpusManage/original", "/corpusManage/original/detail"],
    },
  ];

  @Getter("menuData") menuData: any;
  @Getter("moduleId") moduleId!: any;

  @Watch("$route", { immediate: true })
  routeChanged(to: any, from: any) {
    let path = to.path;
    console.log(to.meta);
    this.$store.commit("changeModuleId", to.meta.moduleId);
    // 这里做的逻辑是保证一个页面含列表页和详情页，进详情页后仍高亮列表对应的菜单,规则可以自己加
    if (path && /^\/bd-params.*detail$/g.test(path)) {
      this.active = path.slice(0, -7);
    } else if (path && /^\/bd-dq.*detail$/g.test(path)) {
      this.active = path.slice(0, -7);
    } else if (path && /^\/bd-params.*viewDetail$/g.test(path)) {
      this.active = path.slice(0, -11);
    } else {
      this.active = path;
    }
    // 这里是做动态keep-alive的操作，比如某些列表页，进详情从详情返回需要keep-alive，其他地方进来刷新
    let routeList: any = [];
    this.keepAliveList.forEach((item: any) => {
      if (item.pathList.includes(path)) {
        routeList.push(item.name);
      }
    });
    this.routeList = routeList;
    console.log(from);
  }

  get menuList() {
    let menuList = this.menuData.filter((item: any) => {
      return item.moduleId === this.moduleId;
    });
    console.log(this.menuData);
    console.log(this.moduleId);
    console.log(menuList);
    return menuList;
  }

  get openData() {
    let temp: any = [];
    this.menuList.forEach((menu: any) => {
      temp.push(menu.menuUrl);
    });
    return temp;
  }

  collapse() {
    this.isCollapse = !this.isCollapse;
  }
}
</script>
<style lang="scss" scoped>
#layout-component {
  height: calc(100% - 60px);
  width: 100%;
  @include flex-div($align: flex-start);
  overflow-y: auto;
}
.side-bar {
  height: 100%;
  background: #fff;
  border-right: 1px solid $boderColor;
  position: sticky;
  top: 0;
  .el-menu {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }
  .collapse-button {
    position: absolute;
    width: 10px;
    height: 80px;
    background: #aaa;
    right: -10px;
    z-index: 2002;
    top: calc(50% - 40px);
    color: #fff;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    cursor: pointer;
    @include flex-div;
    i {
      font-size: 16px;
    }
  }
}
.page-main {
  min-height: 100%;
  padding: 20px;
  box-sizing: border-box;
}
</style>
