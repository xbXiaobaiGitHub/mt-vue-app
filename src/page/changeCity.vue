<template>
  <div class="page-changeCity">
    <el-row>
      <province />
    </el-row>
    <el-row>
      <hot title="热门城市:" :list="hotList" />
    </el-row>
    <el-row>
      <hot title="最近访问:" :list="recentList" />
    </el-row>
    <el-row>
      <category />
    </el-row>
  </div>
</template>

<script>
import Province from '@/components/changeCity/province.vue'
import hot from '@/components/changeCity/hot.vue'
import Category from '@/components/changeCity/category.vue'
import api from '@/api/index.js'

export default {
  data () {
    return {
      hotList: [],
      recentList: []
    }
  },
  created () {
    api.getHotCity().then(res => {
      // 后台返回的 res.data.data 是 [{id:'', name:'', ...}, {}, ...]
      // 如果不想改变页面的数据绑定格式等内容，即可用 .map() 处理一下
      this.hotList = res.data.data.map(item => item.name)
    })
    api.getRecentCity().then(res => {
      this.recentList = res.data.data.map(item => item.name)
    })
  },
  components: {
    Province,
    hot,
    Category
  }
}
</script>

<style>
</style>
