import axios from 'axios'

// 配置 默认 统一的 基础请求域名
axios.defaults.baseURL = 'http://open.duyiedu.com'
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.params = {
    // 代表: 之前传的参数数据放在这, 后面拼接上还需要的 appkey 参数值
    ...config.params,
    appkey: 'chenmanting_1556115839245'
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default axios
