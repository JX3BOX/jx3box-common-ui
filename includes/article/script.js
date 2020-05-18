// xss
function fixXSS(str) {
    const REG = /<\/?script(.*?)>/gi
    return str.replace(REG,'')
}
export default fixXSS