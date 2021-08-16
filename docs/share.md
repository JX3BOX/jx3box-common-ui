# 分享组件使用文档

### props

| props    | remark     | default   | required | type           |
| -------- | ---------- | --------- | -------- | -------------- |
| postType | 文章类型   | undefined | 1        | String         |
| postId   | 文章id     | undefined | 1        | String，Number |
| meta     | meta信息   | undefined | 0        | Object         |
| simple   | 是否为简版 | undefined | 0        | Boolean        |

其中 `meta` 包含以下信息：

```js
{
    title: '', // 分享的title，非必填
    banner: '', // 分享的图片，非必填，qq分享，贴吧分享无法体现
    summary: '', // 仅在 qzone 分享和贴吧分享时传入，非必填，qq，微信分享无法体现
    desc: '' // 仅在 qzone 分享和贴吧分享时传入，非必填，qq，微信分享无法体现
}
```
### examples

针对不同的参数对应的分享详情，qq分享和微信分享都为二维码，只有url有用

#### tieba
![image.png](https://i.loli.net/2021/08/16/3YXbjWERx9vLtJF.png)

#### qzone
![image.png](https://i.loli.net/2021/08/16/cjGlRNYuB6CZyFH.png)
#### weibo
![image.png](https://i.loli.net/2021/08/16/6ahKmVxoQefjrFw.png)