import { axios, $ } from "./axios";
import { __helperUrl } from "@jx3box/jx3box-common/js/jx3box.json";

function getMsg() {
    return $.get(__helperUrl + "api/messages/unread_total",{
        withCredentials: true,
    });
}

function doLogout() {
    return $.post("account/logout");
}

function checkStatus() {
    return $.get("user/me")
}

export { getMsg, doLogout, checkStatus };
