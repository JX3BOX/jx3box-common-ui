import JX3_MACRO from '../macro.js'
import $ from 'jquery'
function macro(selector=".e-jx3macro-area"){
    try {
        $(selector).each(function(i, ele) {
            let $macro = $(this);
            let macro = new JX3_MACRO($macro.text());
            $macro.html(macro.code);
        });
    } catch (e) {
        console.error(e);
    }
}
export default macro

