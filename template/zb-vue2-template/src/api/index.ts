import http from "./public";
import { AxiosPromise } from "axios";

// 获取项目权限系统数据
export const getPermission = (params?: any): AxiosPromise<any> =>
  http.fetchPost("/permission/info", params);
