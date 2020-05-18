//折叠文本区
import $ from 'jquery'
function fold(ele){
    $(ele).find('.e-summary').on('click',function (){
        $(this).next('.e-details').slideToggle()
        $(this).toggleClass('on')
    });
}
export default fold