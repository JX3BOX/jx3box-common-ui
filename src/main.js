// 第三方UI组件
import Vue from "vue";
import ElementUI from "element-ui";
Vue.use(ElementUI);
import "@jx3box/jx3box-common/css/element.css";

import PhotoSwipePlugin from "vue-photoswipe.js";
import 'vue-photoswipe.js/dist/static/css/photoswipe.css';
Vue.use(PhotoSwipePlugin);

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
