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

# Todo
1. 修改data/nav为相对路径
2. 修改各个模块为相对路径