import { $ } from "./axios";

function getSetting(pid, vm) {
    return $.get("post/find", {
        params: {
            id:pid
        },
    }).then((res) => {
        return res.data.data.post
    }).catch((err) => {
        if (err.response && err.response.data && err.response.data.code) {
            vm.$message.error(
                `[${err.response.data.code}] ${err.response.data.msg}`
            );
        } else {
            vm.$message.error("网络请求异常");
        }
        console.log(err);
    });
}

function postSetting(id, data, vm) {
    return $.post("post/setting", data).catch((err) => {
        if (err.response && err.response.data && err.response.data.code) {
            vm.$message.error(
                `[${err.response.data.code}] ${err.response.data.msg}`
            );
        } else {
            vm.$message.error("网络请求异常");
        }
        console.log(err);
    });
}

export { getSetting, postSetting };
