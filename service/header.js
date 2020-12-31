import { axios, $ } from "./axios";
import { __helperUrl } from "@jx3box/jx3box-common/js/jx3box.json";

function getMsg() {
    return $.get(__helperUrl + "api/messages/unread_total", {
        withCredentials: true,
    });
}

function doLogout() {
    return $.post("account/logout");
}

function checkStatus() {
    return $.get("user/me");
}

function getNav() {
    return $.get(__helperUrl + "api/menu_group/header").then((res) => {
        return res.data.data.menu_group.menus
    })
}

function getPanel(){
    return $.get(__helperUrl + "api/menu_group/panel").then((res) => {
        return res.data.data.menu_group.menus
    })
}

export { getMsg, doLogout, checkStatus, getNav,getPanel };
