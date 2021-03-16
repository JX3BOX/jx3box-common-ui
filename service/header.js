import axios from "axios";
import { $_https } from "@jx3box/jx3box-common/js/https.js";
import { __dataPath } from "@jx3box/jx3box-common/data/jx3box.json";

function getMsg() {
    return $_https("helper", {
        popType: "notify",
        proxy : false,
    }).get("/api/messages/unread_total");
}

function checkStatus() {
    return $_https("server", {
        popType: "notify",
        proxy : false
    }).get("/user/me");
}

function getNav() {
    return axios.get(__dataPath + "data/box/header_nav.json");
    // return $helper.get("api/menu_group/header").then((res) => {
    //     return res.data.data.menu_group.menus;
    // });
}

function getPanel() {
    return axios.get(__dataPath + "data/box/header_panel.json");
    // return $helper.get("api/menu_group/panel").then((res) => {
    //     return res.data.data.menu_group.menus;
    // });
}

function getBox() {
    return axios.get(__dataPath + "data/box/box.json");
}

export { getMsg, checkStatus, getNav, getPanel, getBox };
