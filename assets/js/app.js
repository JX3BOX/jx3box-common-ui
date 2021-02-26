const KW = 'jx3boxApp'

function isApp() {
    return window.navigator.userAgent.indexOf(KW) >= 0;
}

export { isApp };
