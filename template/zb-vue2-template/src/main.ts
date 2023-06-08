import Vue from "vue";
import App from "./App.vue";
import { router } from "./router";
import store from "./store";
import "@/assets/css/reset.scss";
import "@/assets/css/element-reset.scss";
import {
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Message,
  MessageBox,
  Button,
  Input,
  InputNumber,
  Radio,
  Select,
  Option,
  OptionGroup,
  RadioGroup,
  Form,
  FormItem,
  Tooltip,
  Row,
  Col,
  Table,
  TableColumn,
  Pagination,
  Dialog,
} from "element-ui";
// 这里是判断环境，修改element对应主体色文件，有多主体要自己加scss文件再引用，因为element颜色文件有色也是变量，你用变量改变量，会报错
// if (window.location.origin.includes("http://172.31.68.62")) {
require("@/assets/css/element-theme-green.scss");
// } else {
//   require("@/assets/css/element-theme-origin.scss");
// }
// import { getPermission } from "@/api/index";
import staticMenu from "./staticMenu";
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Button);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Radio);
Vue.use(Select);
Vue.use(Option);
Vue.use(OptionGroup);
Vue.use(RadioGroup);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Row);
Vue.use(Col);
Vue.use(Tooltip);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.config.productionTip = false;
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
let init = true;
router.beforeEach(async (to, from, next) => {
  if (init) {
    try {
      // let res = await getPermission();
      // let { data } = res;
      let data = staticMenu; // 本地静态文件
      if (data) {
        store.commit("permsDataChange", data);
        store.commit("routeChange");
        init = false;
        // 解决第一次动态路由加载不出来路由问题
        next({ ...(to as any), replace: true });
      } else {
        store.commit("routeChange");
        throw "权限不存在";
      }
    } catch (err) {
      init = false;
      // 这里可以加个逻辑给处理失败时候，拼接一个错误提示页面的路由，然后跳转那个页面（和没权限是两回事）
      // 比如next({path:"/noPerms"}) 这样的，看需求需要
      next({ path: "/404" });
      Vue.prototype.$message.warning((err as any).message || err || "网络错误");
    }
  } else {
    let url = to.path;
    let curIndex = store.state.pageData.findIndex((item: any) => {
      return item.pageUrl === url;
    });
    // 这里有两种处理方式，没权限的页面如果想希望直接跳转到首页，就打开store/index.ts里面的path:'*'然后注释掉404的部分
    if (curIndex > -1 || url === "/404" || url === "/") {
      if (store.state.pageData.length > 0 && url === "/404") {
        next(store.state.pageData[0]["pageUrl"]);
      } else {
        next();
      }
    } else {
      Vue.prototype.$message({
        type: "error",
        message: "您没有该页面的权限或页面不存在",
      });
      next(from.path || "/404");
    }
  }
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
