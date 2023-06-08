import http from "./public";
import { AxiosPromise } from "axios";

// 模板测试
export const patternTest = (params?: any): AxiosPromise<any> =>
  http.fetchPost("/pattern/test", params);

// 模板新增
export const patternCreate = (params?: any): AxiosPromise<any> =>
  http.fetchPost("/pattern/create", params);

// 模板分页列表
export const getPatternList = (params?: any): AxiosPromise<any> =>
  http.fetchPost("/pattern/list", params);

// 模板更新
export const patternUpdate = (params?: any): AxiosPromise<any> =>
  http.fetchPost("/pattern/update", params);

// 获取模板详情
export const getPatternDetail = (params?: any): AxiosPromise<any> =>
  http.fetchPost("/pattern/query", params);
