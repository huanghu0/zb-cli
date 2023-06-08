import Vue from "vue";
import Vuex from "vuex";
import { routerOption, router, resetRouter } from "../router";
Vue.use(Vuex);
const filterRouter = (
  actionRouter: any,
  list: Array<object>,
  pageData: Array<object>
) => {
  // 这里说下权限系统路由配置规范
  // 正确的应该模块一个路由 /bd-params ,然后一级菜单一个路由 /bd-params/table ,然后有二级菜单的路由是 /bd-params/table/orcle 然后菜单下面可能对应好几个页面，一般刚进来看到的那个列表页地址和二级菜单路由一样/bd-params/table/orcle，如果没有二级菜单就和一级菜单一样
  // 下面需求只针对有两级菜单
  list.forEach((item: any) => {
    let leaf: any = {
      path: item.menuUrl,
      name: item.menuName,
      children: [],
      component: (resolve: any) => require([`@/views/commonPage.vue`], resolve),
      meta: {
        icon: item.icon,
        oid: item.oid,
        menuId: item.oid,
        moduleId: item.moduleId,
      },
    };
    if (item.children.length > 0) {
      item.children.forEach((subItem: any) => {
        pageData.forEach((page: any) => {
          if (page.menuId === subItem.oid) {
            let params: any = {
              path: page.pageUrl,
              name: `${item.menuName}-${subItem.menuName}-${page.pageName}`,
              meta: {
                oid: page.oid,
                menuId: subItem.oid,
                moduleId: subItem.moduleId,
              },
            };
            if (routerOption.get(page.oid)) {
              // 上面的报错就用下面这种
              params.component = (resolve: any) =>
                require([`@/views${routerOption.get(page.oid)}`], resolve);
            }
            leaf.children.push(params);
          }
        });
      });
      if (leaf.children.length > 0) {
        leaf.redirect = item.children[0].menuUrl;
      }
    } else {
      pageData.forEach((page: any) => {
        if (page.menuId === item.oid) {
          let params: any = {
            path: page.pageUrl,
            name: `${item.menuName}-${page.pageName}`,
            meta: {
              oid: page.oid,
              menuId: item.oid,
              moduleId: item.moduleId,
            },
          };
          if (routerOption.get(page.oid)) {
            // 上面的报错就用下面这种
            params.component = (resolve: any) =>
              require([`@/views${routerOption.get(page.oid)}`], resolve);
          }
          leaf.children.push(params);
        }
      });
    }

    actionRouter.push(leaf);
  });
};
export default new Vuex.Store({
  state: {
    menuData: [],
    moduleData: [],
    pageData: [],
    moduleId: "",
  },
  getters: {
    moduleData: (state) => state.moduleData,
    menuData: (state) => state.menuData,
    moduleId: (state) => state.moduleId,
  },
  mutations: {
    changeModuleId(state, data) {
      state.moduleId = data;
    },
    permsDataChange(state, data) {
      let { permsResult } = data;
      state.menuData = permsResult.menu;
      state.pageData = permsResult.page;
      state.moduleData = permsResult.module.map((item: any) => {
        let cur = permsResult.menu.find((k: any) => k.moduleId === item.oid);
        return {
          ...item,
          firstPage: cur ? cur.menuUrl : "/",
        };
      });
      console.log(state.menuData);
    },
    routeChange(state) {
      // 因为有不少二级菜单有多个页面，列表和详情
      let actionRouter = [] as Array<any>;
      let defaultPath = "/404";
      if (state.menuData.length > 0) {
        filterRouter(actionRouter, state.menuData, state.pageData);
        defaultPath =
          actionRouter[0]["children"]["length"] > 0
            ? actionRouter[0]["children"][0]["path"]
            : actionRouter[0]["path"];
      }
      let other = [
        {
          path: "/",
          redirect: defaultPath,
        },
        // {
        //   path: "*",
        //   redirect: "/",
        // },
        {
          path: "/404",
          name: "404",
          component: () => import("@/views/404.vue"),
        },
      ];
      actionRouter = [...other, ...actionRouter];
      resetRouter();
      actionRouter.forEach((item: any) => {
        router.addRoute(item);
      });
      console.log(router);
      router.options.routes =
        router.options.routes && router.options.routes.concat(actionRouter);
    },
  },
  actions: {},
  modules: {},
});
