import { createStore } from 'vuex'
import ModeuleUser from './user';

export default createStore({
  state: {
    // 储存的数据
  },
  getters: {
    // 获取
  },
  mutations: {
    // 数据修改
  },
  actions: {
    // 对数据修改的行为
  },
  modules: {
    // 模块管理
    user: ModeuleUser,
  }
})
