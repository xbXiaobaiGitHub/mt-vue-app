<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item>{{$store.state.position}}美团</el-breadcrumb-item>
    <!-- 此处需根据搜索点击进来的类别做相关展示 $route.params.name 获取当前路由中 配置的 name 搜索词 -->
    <el-breadcrumb-item>{{$store.state.position}}{{$route.params.name}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
}
</script>

<style>
</style>
