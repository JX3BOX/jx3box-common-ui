// 第三方UI组件
import Vue from "vue";
import {Pagination,Button}from 'element-ui';
Vue.use(Pagination);
Vue.use(Button);

// 通用UI模块
// import JX3BOX_UI from '@jx3box/jx3box-common-ui'
import "@jx3box/jx3box-common/css/element.css";
// Vue.use(JX3BOX_UI);

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')