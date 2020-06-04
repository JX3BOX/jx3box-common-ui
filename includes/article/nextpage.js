function splitPages(str){
    return str && str.split('<!--nextpage-->') || ''
}
export default splitPages