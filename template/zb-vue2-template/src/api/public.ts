import axios, { AxiosPromise } from "axios";
import { baseUrl } from "@/api/env";

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response: any) => {
    // 对响应数据做点什么
    if (response.data.code === 4000009) {
      const url: string = response.data.message;
      window.location.href = url;
    }
    return response;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

export default {
  deleteEmptyKey(params: any) {
    const obj = {} as any;
    Object.keys(params).forEach((it) => {
      if (params[it] || params[it] === 0 || params[it] === false) {
        obj[it] = params[it];
      }
    });
    return obj;
  },
  fetchGet(url: string, params = {}, alwaysResolve = false): AxiosPromise {
    return new Promise((resolve: any, reject: any) => {
      axios
        .get(baseUrl + url, { params })
        .then((res) => {
          if (res.data.code == "200" || alwaysResolve) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  fetchPost<T>(
    url: string,
    params = {},
    _this: any = null,
    alwaysResolve = false,
    ifDeleteEmptyKey = true
  ): AxiosPromise<T> {
    let eParams: any;
    if (ifDeleteEmptyKey) {
      eParams = this.deleteEmptyKey(params);
    } else {
      eParams = params;
    }
    if (_this) {
      return new Promise((resolve: any, reject: any) => {
        axios
          .post(baseUrl + url, eParams, {
            cancelToken: new axios.CancelToken((c) => {
              // eslint-disable-next-line no-param-reassign
              _this.cancelAjax = c;
              console.log(_this.cancelAjax);
            }),
          })
          .then((res) => {
            if (res.data.code == "200" || alwaysResolve) {
              resolve(res.data);
            } else {
              reject(res.data);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
    return new Promise((resolve: any, reject: any) => {
      axios
        .post(baseUrl + url, eParams)
        .then((res) => {
          if (res.data.code == "200" || alwaysResolve) {
            resolve(res.data);
          } else {
            reject(res.data);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
