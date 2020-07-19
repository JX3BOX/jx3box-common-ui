# JX3BOX UI
通用UI组件

## Step.1 Install
```
npm install @jx3box/jx3box-common-ui
```  

## Step.2 Import
+ 基础布局(标准三栏布局,公共头底,侧边栏)
```javascript
import JX3BOX_UI from '@jx3box/jx3box-common-ui'
Vue.use(JX3BOX_UI);
```

+ 指定模块
```javascript
import xx from "@jx3box/jx3box-common-ui/src/xx.vue"
Vue.component(xx.name, xx)
```


# 新增公共组件流程

1. 打开index.js,添加对应模块
```javascript
import Fav from './src/Fav.vue'
const components = {
    ...
    Fav
}
```

2. 打开src/App.vue,引入模块作为测试预览
```javascript
import Fav from "./Fav.vue";
components: {
    ...
    Fav
},
```

3. 在src/下新建$module.vue
参考其他模块