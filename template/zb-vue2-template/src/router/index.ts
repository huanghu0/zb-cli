import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routerOption = new Map([
  ["40010201", "/dataQuery/index.vue"],
  ["40010301", "/moduleConfig/index.vue"],
]);

const createRouter = () =>
  new VueRouter({
    routes: [],
  });
const router = createRouter();
const resetRouter = function () {
  const newRouter = createRouter();
  (router as any).matcher = (newRouter as any).matcher; // the relevant part
};
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return (originalPush.call(this, location) as any).catch((err: any) => err);
};
export { router, routerOption, resetRouter };
