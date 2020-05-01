<template>
  <!-- 绑定我在全局注册的自定义指令 document-click 事件 实现当鼠标点击别处时下拉框消失 -->
  <div :class="['choose-wrap', disabled?'disabled':'']" @click="showWrapper" v-document-click="documentClick">
    <div class="choose">
      <span>{{value}}</span>
      <i class="el-icon-caret-bottom"></i>
      <div :class="{'mt-content': true, 'active': showWrapperActive}">
        <h2>{{title}}</h2>
        <div :class="['wrapper', className]">
          <div class="col" v-for="(listData, index) in renderList" :key="index">
            <span :class="{'mt-item': true, 'active': item.name == value}" v-for="(item, index) in listData" :key="index" @click="changeValue(item)">{{item.name}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: [
    'list',
    'value',
    'title',
    'showWrapperActive',
    'disabled',
    'className'
  ],
  computed: {
    // 处理数据 - 分列展示
    renderList: function () {
      // 向上查找 - 先分成 几 列，一列 12 个数据
      let col = Math.ceil(this.list.length / 12)
      let resultList = []
      for (let i = 0; i < col; i++) {
        // 从 i * 12 开始，一组存储 12 个数据
        let data = this.list.slice(i * 12, i * 12 + 12)
        console.log(data)
        resultList.push(data)
      }
      return resultList
    }
  },
  methods: {
    showWrapper (e) {
      // 阻止事件冒泡 不然会执行绑在同个div上的 documentClick 事件
      e.stopPropagation()
      // this.showWrapperActive = true
      // 城市可点击时 触发点击事件
      if (!this.disabled) {
        this.$emit('change_active', true)
      }
    },
    documentClick () {
      // this.showWrapperActive = false
      this.$emit('change_active', false)
    },
    changeValue (item) {
      // 组件添加 改变值 时触发的自定义事件名 change
      this.$emit('change', item)
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/changecity/select.scss"
</style>
