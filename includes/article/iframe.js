// iframe白名单
import url from 'url'
function iframeFilter(str){
    const REG = /<iframe(.*?)src=[\'"]([^\'"]+)[\'"](.*?)>.*?<\/iframe>/gi
    const white_list = ['player.bilibili.com','docs.qq.com']

    return str.replace(REG,function (item){
        let result = REG.exec(item)
        if(result){
            let attrs_prefix = result[1]

            // bilibili路径处理
            let src = ''
            if(result[2].startsWith('//')){
                src = result[2].replace('//','https://')
            }else{
                src = result[2]
            }
            
            // 白名单过滤
            let src_parsed = url.parse(src)
            if(white_list.includes(src_parsed.hostname)){
                src = result[2]
            }else{
                src = ''
            }

            let attrs_suffix = result[3]
            return `<iframe ${attrs_prefix} src="${result[2]}" ${attrs_suffix}></iframe>`
        }
        return item
    })
}
export default iframeFilter