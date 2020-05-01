<template>
  <div>
    <span class="name">按省份选择：</span>
    <m-select :list="provinceList"
      title="省份"
      :value="province"
      :showWrapperActive="provinceActive"
      @change_active="changeProvinceActive"
      @change="changeProvince"
      className="province" />
    <m-select :list="cityList"
      title="城市"
      :value="city"
      :showWrapperActive="cityActive"
      @change_active="changeCityActive"
      @change="changeCity"
      :disabled="cityDisabled"
      className="city" />
      <!-- @change 自定义的点击事件 -->
    <span>直接搜索：</span>
    <!-- multiple // 多选
      filterable 过滤
      remote 远程 - 远程搜索
      :remote-method="remoteMethod" 远程搜索时要执行的方法 拿到后端返回的搜索下拉结果
    -->
    <el-select
      v-model="searchWord"
      filterable
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading">
      <el-option
        v-for="item in searchList"
        :key="item"
        :label="item"
        :value="item">
      </el-option>
    </el-select>
  </div>
</template>

<script>
import MSelect from './select.vue'
import api from '@/api/index.js'

export default {
  data () {
    return {
      provinceList: [],
      province: '省份', // 默认值
      cityList: [],
      city: '城市', // 默认值
      provinceActive: false,
      cityActive: false,
      searchList: ['哈尔滨', '佳木斯', '牡丹江', '鹤岗'],
      searchWord: '',
      loading: false,
      cityDisabled: true
    }
  },
  components: {
    MSelect
  },
  created () {
    api.getProvinceList().then(res => {
      this.provinceList = res.data.data.map(item => {
        // 将数据处理下
        item.name = item.provinceName
        return item
      })
    })
  },
  methods: {
    changeProvinceActive (flag) {
      this.provinceActive = flag
      // 当 省份 选择时，城市下拉要隐藏
      if (flag) {
        this.cityActive = false
      }
    },
    changeCityActive (flag) {
      this.cityActive = flag
      if (flag) {
        this.provinceActive = false
      }
    },
    changeProvince (item) {
      this.province = item.name
      // 省份改变的时候 城市可以选择
      this.cityDisabled = false
      this.cityList = item.cityInfoList
    },
    changeCity (item) {
      this.city = item.name
      // 点击城市时，当前页面左上角位置显示为 所选城市名
      // 设置 store 中 state里的变量值 方法名及变量值
      this.$store.dispatch('setPosition', item)
      // 点击城市之后 需要跳转到首页
      this.$router.push({ name: 'index' })
    },
    remoteMethod (val) {
      console.log(val) // 拿到的是输入的值
      // 请求后端接口
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changecity/iselect.scss"
</style>
