import Vue from 'vue'
import Vuex from 'vuex'
import Home from './modules/home'
import VuexAxios from './modules/vuexaxios'
import Auth from './modules/auth'
import Article from './modules/article'
import User from './modules/user'
Vue.use(Vuex)
export default new Vuex.Store({
  //用module引入后，各模块的state就挂载在相应模块对象下
  //this.$store.state.Home.count
  modules: {
    Home,
    VuexAxios,
    Auth,
    Article,
    User
  }
})