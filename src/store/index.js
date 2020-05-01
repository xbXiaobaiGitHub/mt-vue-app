import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  position: {},
  // 记录登录信息
  userName: ''
}
const mutations = {
  setPosition (state, val) {
    state.position = val
  },
  setUserName (state, val) {
    state.userName = val
  }
}
const actions = {
  setPosition ({ commit }, val) {
    // 异步请求后端获取当前位置数据
    commit('setPosition', val)
  }
}

// actions中 触发 mutation 中的事件 需调用 commit() 函数
export default new Vuex.Store({
  state,
  mutations,
  actions,
  modules: {
  }
})
