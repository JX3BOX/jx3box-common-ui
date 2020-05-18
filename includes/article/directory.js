//折叠文本区
import $ from "jquery";
function directory(from, to) {
    // 装载容器设置
    const $box = $(to);
    if (!to && $box.length) return;

    // 遍历节点
    let directories = $(from).find("h1,h2,h3");

    // 存在目录
    if (directories.length > 1) {

        $box.html(
            `<div class="c-article-directory" id="c-article-directory">
                <div class="c-article-directory-title" id="c-article-directory-title">📒 导读</div>
                <div class="c-article-directory-content" id="c-article-directory-content"></div>
            </div>`
        );

        const $directory = $('#c-article-directory-content')

        // 遍历捕获的目录项
        directories.each(function(i, item) {
            // 进行克隆
            let _item = $(item).clone();

            // 过滤行内样式
            _item.attr("style", "");
            _item.html($(item).text());

            // 设置原始元素所在的位置
            _item.attr("data-skip", ~~$(this).offset().top - 112);
            _item.data("raw", $(item));

            // 排除最后一个
            if (i < directories.length - 1) {
                // 判断相邻节点类型
                let current = $(item)[0].tagName;
                let next = directories.eq(i + 1)[0].tagName;

                // 设置是否存在子集
                if (current == "H1" && next != "H1") {
                    _item.addClass("hasChild");
                } else if (current == "H2" && next == "H3") {
                    _item.addClass("hasChild");
                }
            }

            //追加到目录盒中
            $directory.append(_item);
        });

        //进行事件委托
        $directory.on('click','h1,h2,h3',function (){
            $(document).scrollTop($(this).attr('data-skip'))
            $(this).data('raw').addClass('isScrollFocus')
            setTimeout(()=>{
                $(this).data('raw').removeClass('isScrollFocus')
            },3500)
        })

        return true
    }

    // 不存在目录
    return false;
}
export default directory;
