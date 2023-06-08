import axios from "axios";
import NProgress from "nprogress";
import { message } from "antd";

import { BASE_URL as baseUrl } from "./config";

axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.timeout = 295000

axios.interceptors.request.use((config) => {
  NProgress.start();
  return config
},(err) => {
  console.log(err);
})

axios.interceptors.response.use(
  (res) => {
    NProgress.done();
    console.log(res,'res')
    return res;
  },
  (err) => {
    NProgress.done();
    console.log(err,'err')
    return err;
  }
);

function fetchPost(url,params = {}){
  return new Promise((resolve,reject) => {
    axios
      .post(baseUrl + url,params)
      .then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
  })
}

function fetchGet(url,params = {}){
  return new Promise((resolve,reject) => {
    axios
      .get(baseUrl + url,{ params })
      .then((res) => {
        resolve(res)
      }).catch((err) => {
        reject(err)
      })
  })
}

function fetchPut(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .put(baseUrl + url, params)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function fetchDelete(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .delete(baseUrl + url, { data: params })
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function fetchFormdata(url, params = {}) {
  return new Promise((resolve, reject) => {
    let config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }
    axios
      .post(baseUrl + url, params, config)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function fetchPostForm(url, params = {}) {
  return new Promise((resolve, reject) => {
    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    axios
      .post(baseUrl + url, params, config)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

function fetchPostBlob(url, params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(baseUrl + url, params, {
        responseType: 'blob'
      })
      .then((res) => {
        if (res.headers['content-disposition']) {
          let name = res.headers['content-disposition'].split('filename=')[1]
          name = decodeURI(name)
          let fileUrl = window.URL.createObjectURL(new Blob([res.data]))
          let a = document.createElement('a')
          a.download = name
          a.href = fileUrl
          a.click()
          window.URL.revokeObjectURL(fileUrl)
          resolve(res.data)
        } else {
          const fr = new FileReader()
          fr.readAsText(res.data)
          fr.onload = (e) => {
            let text = JSON.parse(e.target.result)
            reject(text.message || '下载失败')
          }
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function fetchGetBlob(url) {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + url, {
        responseType: 'blob'
      })
      .then((res) => {
        if (res.headers['content-disposition']) {
          let name = res.headers['content-disposition'].split('filename=')[1]
          name = decodeURI(name)
          let fileUrl = window.URL.createObjectURL(new Blob([res.data]))
          let a = document.createElement('a')
          a.download = name
          a.href = fileUrl
          a.click()
          window.URL.revokeObjectURL(fileUrl)
          resolve(res.data)
        } else {
          const fr = new FileReader()
          fr.readAsText(res.data)
          fr.onload = (e) => {
            let text = JSON.parse(e.target.result)
            reject(text.message || '下载失败')
          }
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}







export {
  fetchPost,
  fetchGet,
  fetchDelete,
  fetchFormdata,
  fetchPostBlob,
  fetchGetBlob,
  fetchPut,
  fetchPostForm,
}

