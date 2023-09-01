import { Notification } from 'element-ui';
// 复制
export function copyText(text){
    if (window.navigator.clipboard) {
        window.navigator.clipboard.writeText(text).then(function() {
            Notification.success({
                title: '复制成功',
            });
            console.log('Async: Copying to clipboard was successful!');
        }, function(err) {
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
export function trimSlash (str) {
    return str.replace(/\/$/, "");
}
