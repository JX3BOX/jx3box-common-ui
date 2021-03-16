import { $_https } from "@jx3box/jx3box-common/js/https.js";

function getSetting(pid) {
    return $_https("server", {
        proxy: false,
    })
        .get("/post/find", {
            params: {
                id: pid,
            },
        })
        .then((res) => {
            return res.data.data.post;
        });
}

function postSetting(data) {
    return $_https("server", {
        proxy: false,
    }).post("/post/manage", data);
}

export { getSetting, postSetting };
