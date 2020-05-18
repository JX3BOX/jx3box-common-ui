// 链接标签
import url from 'url'
function formatLink(str){
    const REG = /<a(.*?)href=[\'"]([^\'"]+)[\'"](.*?)>(.*?)<\/a>/gi

    return str.replace(REG,function (item){
        let result = REG.exec(item)
        if(result){
            let attrs_prefix = result[1] || ''

            let href = result[2]
            let to = url.parse(href)
            const whiteHost = /https?:\/\/.*\.jx3box\.com/

            let skip = ''
            if(!whiteHost.test(to.hostname)){
                skip = 'target="_blank"'
            }

            let attrs_suffix = result[3] || ''
            let text = result[4]

            // TODO:  no-referrer ?
            return `<a ${skip} ${attrs_prefix} href="${href}" ${attrs_suffix}>${text}</a>`
        }
        return item
    })
}
export default formatLink
