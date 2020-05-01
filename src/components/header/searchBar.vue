<template>
  <div class="search-panel">
    <el-row class="m-header-searchbar">
      <el-col :span="3" class="left">
        <img src="https://s0.meituan.net/bs/fe-web-meituan/fa5f0f0/img/logo.png" alt="" />
      </el-col>
      <el-col :span="15" class="center">
        <div class="wrapper">
          <!-- 输入搜索关键词时，调用事件 使用 @input -->
          <el-input v-model="searchWord" placeholder="请输入内容" @focus="focus" @blur="blur" @input="input"></el-input>
          <el-button type="primary" icon="el-icon-search"></el-button>
          <dl class="hotPlace" v-if="isHotPlace">
            <dt>热门搜索</dt>
            <dd v-for="(item, index) in hotPlaceList" :key="index">
              <!-- 路由 http://xxxxx/s/火锅  params 是火锅 会在路由里配置下  -->
              <router-link :to="{name: 'goods', params: {name: item}}">{{item}}</router-link>
            </dd>
          </dl>
          <dl class="searchList" v-if="isSearchList">
            <dd v-for="(item, index) in searchList" :key="index"><router-link :to="{name: 'goods', params: {name: item}}">{{item}}</router-link></dd>
          </dl>
        </div>
        <p class="suggest">
          <a href="#" v-for="(item, index) in suggestList" :key="index">{{item}}</a>
        </p>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import api from '@/api/index.js'

export default {
  data () {
    return {
      searchWord: '',
      isFocus: false,
      hotPlaceList: [],
      searchList: [],
      suggestList: []
    }
  },
  created () {
    api.searchHotWords().then(res => {
      this.hotPlaceList = res.data.data
      this.suggestList = res.data.data
    })
  },
  computed: {
    isHotPlace: function () {
      return this.isFocus && !this.searchWord
    },
    isSearchList: function () {
      return this.isFocus && this.searchWord
    }
  },
  methods: {
    focus () {
      this.isFocus = true
    },
    blur () {
      // 解决 输入搜索的东西 出来搜索关键词的下拉列 点击下拉列时 先执行了 blur 导致点击失效的问题
      // 添加定时器
      let self = this
      setTimeout(function () {
        self.isFocus = false
      }, 200)
    },
    input () {
      let val = this.searchWord
      // 一般情况下，后端都会给你把搜索数据根据你传参做筛选过滤的，但这里没有，所以需要自己手动过滤一下
      api.getSearchList().then(res => {
        // 过滤，匹配存在关键字的结果 - 因为后端没有提供过滤的结果
        this.searchList = res.data.data.list.filter((item, index) => {
          return item.indexOf(val) > -1
        })
      })
    }
  }
}
</script>
