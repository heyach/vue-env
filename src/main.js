import Vue from 'vue'
import router from './router/guard'
import store from './store' 
import App from './App'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

import './directives/drag';

import axios from 'axios'
Vue.prototype.$axios = axios
// axios.defaults.baseURL = '/api'
// axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.withCredentials = true; //配置为true
// axios过滤器，拦截请求发送前和返回后的数据，可以对req和res进行自定义处理

window.exec = []
axios.interceptors.request.use(config => {
  // 为每个接口加上cancalToken
  config.cancelToken = new axios.CancelToken((exec) => {
    window.exec.push(exec)
    // 请求成功要移除
  })
  return config
}, err => {
  console.log(err)
})
axios.interceptors.response.use(response => {
  return response.data;
}, err => {
  return Promise.reject(err);
});

import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element, { size: 'small', zIndex: 3000 });

import './common.css'
import './assets/iconfont/iconfont.css'
import VuexAxios from './store/modules/vuexaxios';

new Vue({
    el: '#root',
    router,
    store,
    render: (h) => h(App)
})