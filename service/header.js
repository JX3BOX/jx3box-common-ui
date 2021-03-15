import axios from "axios";
import { $_server, $helper, $_helper } from "./axios";
import { __dataPath } from "@jx3box/jx3box-common/data/jx3box.json";

function getMsg() {
    return $_helper.get("api/messages/unread_total");
}

function doLogout() {
    return $_server.post("account/logout");
}

function checkStatus() {
    return $_server.get("user/me");
}

function getNav() {
    return axios.get(__dataPath + "data/box/header_nav.json").then((res) => {
        return res.data;
    });
    // return $helper.get("api/menu_group/header").then((res) => {
    //     return res.data.data.menu_group.menus;
    // });
}

function getPanel() {
    return axios.get(__dataPath + "data/box/header_panel.json").then((res) => {
        return res.data;
    });
    // return $helper.get("api/menu_group/panel").then((res) => {
    //     return res.data.data.menu_group.menus;
    // });
}

function getBox() {
    return axios.get(__dataPath + "data/box/box.json").then((res) => {
        return res.data;
    });
}

export { getMsg, doLogout, checkStatus, getNav, getPanel, getBox };
