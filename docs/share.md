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
    banner: '', // 分享的图片，非必填
    summary: '', // 仅在 qq, qzone 分享和贴吧分享时传入，非必填
    desc: '' // 仅在 qq, qzone 分享和贴吧分享时传入，非必填
}
```

