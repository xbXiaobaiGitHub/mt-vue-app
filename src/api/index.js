import axios from '@/axios.js'

// 单独文件 api - 给每个页面请求分类起来
// 每个页面里需要调用哪个接口请求, 引用相应 api/xxx.js 即可

var api = {
  // 热门搜索 请求
  searchHotWords (params) {
    return axios.get('/api/meituan/header/searchHotWords.json', params)
  },
  getSearchList () {
    return axios.get('/api/meituan/header/search.json')
  },
  getMenuList () {
    return axios.get('/api/meituan/index/nav.json')
  },
  resultsByKeywords () {
    return axios.get('/api/meituan/index/resultsByKeywords.json')
  },
  getProductsList () {
    return axios.get('/api/meituan/list/goodsList.json')
  },
  getHotCity () {
    return axios.get('/api/meituan/city/hot.json')
  },
  getRecentCity () {
    return axios.get('/api/meituan/city/recents.json')
  },
  getProvinceList () {
    return axios.get('/api/meituan/city/province.json')
  },
  getCurPosition () {
    return axios.get('/api/meituan/city/getPosition.json')
  },
  getCityList () {
    return axios.get('/api/meituan/city/cityList.json')
  },
  login (params) {
    // 因为 axios 在传参数的时候 是以 { ... } 开始的
    // 如果现在没有加 {} 这个, 那么在传参数的时候, 就需要再在 参数外套多一个 {}
    // 比如 { params: { userName: '', password: ''} }
    return axios.get('/api/meituan/login', params)
  },
  register (params) {
    return axios.get('/api/meituan/register', params)
  }
}

export default api
