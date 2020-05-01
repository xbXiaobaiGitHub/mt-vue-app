<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="menuLeave">
      <dt>全部分类</dt>
      <!-- 添加鼠标移入事件 mouseenter, 鼠标移出事件 mouseleave 绑定在导航条处-->
      <dd v-for="(item, index) in menuList" :key="index" @mouseenter="menuEnter(item)">
        <i :class="item.type"></i>
        {{item.name}}
        <span class="arrow"></span>
      </dd>
    </dl>
    <!-- 判断是否存在 二级导航详情curDetail 数据 存在即显示，省去css的判断及事件的多余写法 -->
    <!-- 解决鼠标移至详情消失的问题，添加定时器做延迟触发 detailEnter -->
    <div v-if="curDetail" class="detail" @mouseenter="detailEnter" @mouseleave="detailLeave">
      <!-- 此时的 template 只作为模板 不会渲染进页面里 -->
      <!-- 注意：template 里不能添加 key 值，可将其写在 h4 标签中 -->
      <template v-for="(item, index) in curDetail.items">
        <h4 :key="index">{{item.title}}</h4>
        <span v-for="(v, i) in item.items" :key="v + '_' + i">{{v}}</span>
      </template>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'

export default {
  data () {
    return {
      curDetail: null,
      menuList: [{
        title: '美食',
        icon: 'food',
        children: [{
          title: '美食',
          children: ['代金券', '甜点饮品', '火锅自助', '小吃快餐', '日韩料理', '西餐', '聚餐宴请', '烧烤烤肉']
        }]
      }, {
        title: '外卖',
        icon: 'takeout',
        children: [{
          title: '外卖',
          children: ['美团外卖']
        }]
      }, {
        title: '酒店',
        icon: 'hotel',
        children: [{
          title: '酒店星级',
          children: ['经典型', '舒适/三星', '高档/四星', '豪华/五星']
        }]
      }]
    }
  },
  created () {
    api.getMenuList().then(res => {
      this.menuList = res.data.data
    })
  },
  methods: {
    menuEnter (item) {
      // console.log(item)
      this.curDetail = item
    },
    menuLeave () {
      var self = this
      this.timer = setTimeout(function () {
        self.curDetail = null
      }, 200)
    },
    detailEnter () {
      // 当进入这个 二级导航详情后，把 定时器 清掉
      clearTimeout(this.timer)
    },
    detailLeave () {
      this.curDetail = null
    }
  }
}
</script>

<style>
</style>
