import { Notification } from 'element-ui';
// 复制
export function copyText(text) {
    if (window.navigator.clipboard) {
        window.navigator.clipboard.writeText(text).then(function () {
            Notification.success({
                title: '复制成功',
            });
            console.log('Async: Copying to clipboard was successful!');
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });
    } else {
        var textArea = document.createElement("textarea");
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';
            console.log('Fallback: Copying text command was ' + msg);
        } catch (err) {
            console.error('Fallback: Oops, unable to copy', err);
        }
        document.body.removeChild(textArea);
    }
}

// 去除最后的/
export function trimSlash(str) {
    return str.replace(/\/$/, "");
}

// 监听 localStorage 的改变
export function dispatchEventStorage() {
    const _setItem = localStorage.setItem

    localStorage.setItem = function (key, val) {
        // 注册一个名称为 setItemEvent 的事件
        let setEvent = new Event('setItemEvent')
        // key 为改变的 key， newVal 为改变的 value
        setEvent.key = key
        setEvent.newVal = val

        window.dispatchEvent(setEvent)

        _setItem.apply(this, arguments)
    }
}
