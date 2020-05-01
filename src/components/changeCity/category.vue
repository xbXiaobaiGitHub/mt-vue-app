<template>
  <div class="category">
    <dl class="m-categroy">
      <dt>按拼音首字母选择：</dt>
      <dd v-for="(item, index) in list" :key="index">
        <!-- 添加锚点 - 点击到指定的城市位置 -->
        <a :href="'#city-' + item">{{item}}</a>
      </dd>
    </dl>
    <dl class="m-categroy-section" v-for="(item, index) in cityGroup" :key="index" :id="'city-' + index">
      <dt>{{index}}</dt>
      <dd>
        <span v-for="city in item" :key="city.id" @click="changeCity(city)">{{city.name}}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import api from '@/api/index.js'

export default {
  data () {
    return {
      list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
      cityList: [],
      cityGroup: {}
    }
  },
  created () {
    api.getCityList().then(res => {
      let obj = {}
      // 根据首字母进行分组
      // 查找是否存在 firstChar 属性，不存在赋空值
      res.data.data.forEach((item, index) => {
        // 转换为导航栏一样的大写
        if (!obj[item.firstChar.toUpperCase()]) {
          obj[item.firstChar.toUpperCase()] = []
        }
        obj[item.firstChar.toUpperCase()].push(item)
      })
      this.cityGroup = obj
    })
  },
  methods: {
    changeCity (item) {
      console.log(item)
      this.$store.dispatch('setPosition', item)
      this.$router.push({ name: 'index' })
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changecity/categroy.scss"
</style>
