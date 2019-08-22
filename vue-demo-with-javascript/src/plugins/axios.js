import Vue from 'vue'
import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import router from '../router'
import tokenUtils from '../utils/token-utils'

// 基本配置
axios.defaults.baseURL = '/vue-demo-webapi'
axios.defaults.responseType = 'json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.timeout = 10000

// request拦截器
axios.interceptors.request.use(
  config => {
    config.headers['access-token'] = tokenUtils.getToken()
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response拦截器
axios.interceptors.response.use(
  response => {
    // 判断返回流的情况
    const contentType = response.headers['content-type']
    if (contentType.indexOf('application/octet-stream') >= 0) {
      return response
    }

    // 成功返回数据
    const res = response.data
    if (res.success === 1) {
      return res
    }
    if (res.error.code.indexOf('03') !== -1 && res.error.code.indexOf('03') === 0) {
      MessageBox.alert('token错误，错误码：' + res.error.code + '，错误信息：' + res.error.message, '请重新登录', {
        confirmButtonText: '确定',
        callback: () => {
          router.push({name: 'login'})
        }
      })
    } else {
      // 失败提示信息
      Message.error({
        // message: '发生错误. 错误码{' + res.error.code + '}. ' + '错误信息: ' + res.error.message,
        dangerouslyUseHTMLString: true,
        message: '<p>' +
          '<div>发生错误.</div>' +
          '<div>错误码: <strong>' + res.error.code + '</strong></div>' +
          '<div>错误信息: <strong>' + res.error.message + '</strong></div>' +
          '</p>',
        duration: 5000
      })
    }
    return Promise.reject(res.error)
  },
  error => {
    Message.error({
      message: '网络错误'
    })
    return Promise.reject(error)
  }
)

Vue.prototype.axios = axios
export default axios
