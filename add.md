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
