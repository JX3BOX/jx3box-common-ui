import axios from "axios";
import { $helper } from "@jx3box/jx3box-common/js/https.js";
import { __dataPath } from "@jx3box/jx3box-common/data/jx3box.json";

function getMsg() {
    return $helper({ mute: true }).get("/api/messages/unread_total");
}

function getNav(client) {
    let file =
        client == "origin" ? "header_nav_origin.json" : "header_nav.json";
    return axios.get(__dataPath + `data/box/${file}`);
}

function getPanel() {
    return axios.get(__dataPath + "data/box/header_panel.json");
}

function getBox() {
    return axios.get(__dataPath + "data/box/box.json");
}

export { getMsg, getNav, getPanel, getBox };
