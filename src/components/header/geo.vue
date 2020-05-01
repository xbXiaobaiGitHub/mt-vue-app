<template>
  <div class="m-geo">
    <div class="position">
      <i class="el-icon-location" />
      {{$store.state.position.name}}
      <router-link class="chengeCity" :to="{name: 'changeCity'}">
        切换城市
      </router-link>
      [
        <a href="#" v-for="(item, index) in nearCity" :key="index"> {{item.name}} </a>
      ]
    </div>
    <div class="m-user" v-if="!$store.state.userName">
      <router-link class="login" :to="{name: 'login'}">
        立即登录
      </router-link>
      <router-link class="register" :to="{name: 'register'}">
        注册
      </router-link>
    </div>
  </div>
</template>

<script>
import api from '@/api/index.js'

export default {
  data () {
    return {
      nearCity: []
    }
  },
  watch: {
    // 监听页面跳转 切换城市 附近城市也跟着切换
    '$store.state.position': function () {
      this.nearCity = this.$store.state.position.nearCity
    }
  },
  created () {
    // 给定位设置默认值 - 当前地理位置(城市)
    api.getCurPosition().then(res => {
      // 传给 store 中 setPosition 赋值
      this.$store.dispatch('setPosition', res.data.data)
      this.nearCity = res.data.data.nearCity
    })
  }
}
</script>

<style>
</style>
