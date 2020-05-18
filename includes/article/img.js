// 图片地址&懒加载
import {resolveImagePath} from '@jx3box/jx3box-common/js/utils'
function lazyLoad(str) {
    const REG = /<img(.*?)src=[\'"]([^\'"]+)[\'"](.*?)>/gi
    return str.replace(REG,function (item){
        let result = REG.exec(item)
        let attrs_prefix = result[1]

        // 替换为cdn地址
        let src = resolveImagePath(result[2])

        let attrs_suffix = result[3]

        // 添加懒加载
        return `<img ${attrs_prefix} loading="lazy" src="${src}" ${attrs_suffix} />`
    })
}
export default lazyLoad