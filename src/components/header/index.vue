<template>
  <div class="m-header">
    <!-- 引入的组件不需要添加内容标签布局的时候 建议写单标签形式 -->
    <el-row>
      <top-bar />
    </el-row>
    <el-row>
      <search-bar />
    </el-row>
  </div>
</template>

<script>
import topBar from './topBar.vue'
import searchBar from './searchBar.vue'

export default {
  components: {
    topBar,
    searchBar
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/public/header/index.scss";
</style>
