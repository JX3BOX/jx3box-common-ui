// iframe白名单
import url from 'url'
function iframeFilter(str){
    if(!str) return

    const REG = /<iframe(.*?)src=[\'"]([^\'"]+)[\'"](.*?)>.*?<\/iframe>/gi
    const white_list = ['player.bilibili.com','docs.qq.com']
    
    let item;
    while ((item = REG.exec(str))) {
        let origin = item[0]
        let prefix = item[1]

        // bilibili路径处理
        let src = ''
        if(item[2].startsWith('//')){
            src = item[2].replace('//','https://')
        }else{
            src = item[2]
        }

        // 白名单过滤
        let src_parsed = url.parse(src)
        if(white_list.includes(src_parsed.hostname)){
            src = item[2]
        }else{
            src = ''
        }

        let suffix = item[3]
        let output = `<iframe ${prefix} src="${item[2]}" ${suffix}></iframe>`
        str = str.replace(origin,output)
        // console.log(origin,output)
    }
    // console.log(str)
    return str
}
export default iframeFilter