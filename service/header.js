import { axios, $ } from "./axios";
import { __helperUrl } from "@jx3box/jx3box-common/js/jx3box.json";

function getMsg(uid) {
    // let condition = encodeURIComponent("where[user_id]");
    return axios.get(
        __helperUrl + "api/messages/unread_total"
    );
}

function doLogout() {
    return $.post("account/logout");
}

function checkStatus() {
    return $.get("user/me")
}

export { getMsg, doLogout, checkStatus };
