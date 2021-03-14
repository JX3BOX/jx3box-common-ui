import { $https, $_https } from "@jx3box/jx3box-common/js/https.js";
const $server = $https("server", {
    proxy: false,
});
const $_server = $_https("server", {
    proxy: false,
});

const $next = $https("next", {
    proxy: true,
    interceptor: "next",
});
// 静默next
const $next$ = $https("next", {
    proxy: true,
    interceptor: "next",
    mute: true,
});
const $_next = $_https("next", {
    interceptor: "next",
});

const $helper = $https("helper", {
    proxy: false,
    interceptor: "helper",
});
const $_helper = $_https("helper", {
    interceptor: "helper",
});
export { $server, $next, $next$, $helper, $_server, $_next, $_helper };
