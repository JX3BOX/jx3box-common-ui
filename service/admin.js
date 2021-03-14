import { $_server } from "./axios";

function getSetting(pid) {
    return $_server
        .get("post/find", {
            params: {
                id: pid,
            },
        })
        .then((res) => {
            return res.data.data.post;
        });
}

function postSetting(data) {
    return $_server.post("post/manage", data);
}

export { getSetting, postSetting };
