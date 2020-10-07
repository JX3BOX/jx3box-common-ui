# JX3BOX UI
手动更新cdn `https://oss.jx3box.com/static/`

通用 UI 组件

## Step.1 Install

```
npm install @jx3box/jx3box-common-ui
```

## Step.2 Import

-   基础布局(标准三栏布局,公共头底,侧边栏)

```javascript
import JX3BOX_UI from "@jx3box/jx3box-common-ui";
Vue.use(JX3BOX_UI);
```

-   指定模块

```javascript
import xx from "@jx3box/jx3box-common-ui/src/xx.vue";
Vue.component(xx.name, xx);
```

# 新增公共组件流程

1. 打开 index.js,添加对应模块

```javascript
import Fav from "./src/Fav.vue";
const components = {
    ...Fav,
};
```

2. 打开 src/App.vue,引入模块作为测试预览

```javascript
import Fav from "./Fav.vue";
components: {
    ...
    Fav
},
```

3. 在 src/下新建\$module.vue
   参考其他模块

# 在页面远程引入公共头
## TODO:补充normalize样式
1. 头部引入文件

```html
<script src="https://oss.jx3box.com/static/jx3box-lib/vue.js"></script>
<script src="https://oss.jx3box.com/static/jx3box-common-ui/newheader.umd.min.js"></script>
<link rel="stylesheet" href="https://oss.jx3box.com/static/jx3box-common-ui/newheader.css"/>
```

2. 需要插入的位置

```html
<div id="app">
    <newheader></newheader>
</div>
```

3. 初始化脚本

```html
<script>
new Vue({
    components: {
        newheader: newheader,
    },
}).$mount("#app");
</script>
```
