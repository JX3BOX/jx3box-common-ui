import Vue from "vue";
import { Reporter } from "@jx3box/reporter"

Vue.directive("reporter", {
    bind: function(el, binding, vnode) {
        el.clickHandler = function() {
            const { user_id, use_query = false, id, caller } = binding.value;

            const R = new Reporter({
                caller,
                use_query, // 上报当前页面中url中的参数 默认false
                useId: user_id // 当前登录用户id
            });

            R.p({ id: id })
        };

        el.addEventListener("click", el.clickHandler);
    },
    unbind: function(el, binding, vnode) {
        el.removeEventListener("click", el.clickHandler);
        el.clickHandler = null;
    }
});
