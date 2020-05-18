import JX3_QIXUE from '../qixue.js'
import $ from 'jquery'
function qixue(selector=".e-jx3qixue-area"){
    try {
        $(selector).each(function (i,ele){
            $(this).after('<div class="e-jx3qixue-temp-container"></div>')
            let container = $(this).next('.e-jx3qixue-temp-container')
            let qixue = JSON.parse($(this).val())
            let _qixue = Object.assign({container:container},qixue)
            new JX3_QIXUE(_qixue)
        })
    } catch (e) {
        console.error(e);
    }
}
export default qixue

