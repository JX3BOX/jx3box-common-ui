// 第三方UI组件
import Vue from "vue";
import {
    Pagination,
    Button,
    Divider,
    Drawer,
    MessageBox,
    Switch,
    Input,
    Radio,
    RadioGroup,
    RadioButton,
    Checkbox,
    CheckboxButton,
    CheckboxGroup,
    Select,
    ColorPicker,
    Upload,
    Option,
    Message,
    Loading
} from 'element-ui';
Vue.use(Pagination);
Vue.use(Button);
Vue.use(Divider);
Vue.use(Drawer);
Vue.use(Switch);
Vue.use(Input);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Select);
Vue.use(ColorPicker);
Vue.use(Upload);
Vue.use(Option);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;

// 通用UI模块
// import JX3BOX_UI from '@jx3box/jx3box-common-ui'
import "@jx3box/jx3box-common/css/element.css";
// Vue.use(JX3BOX_UI);

import App from './App.vue'

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')
