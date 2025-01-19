import axios from "axios";
import { $cms, $next } from "@jx3box/jx3box-common/js/https.js";
import { __dataPath, __ossRoot } from "@jx3box/jx3box-common/data/jx3box.json";

function getLetter() {
    return $next({ mute: true }).get("/api/letter/unread/count");
}

function getMsg() {
    return $next({ mute: true }).get("/api/next2/userdata/messages/unread_total");
}

function getNav(client = "std") {
    let file = client == "origin" ? "header_nav_origin.json" : "header_nav.json";
    return axios.get(__dataPath + `data/box/${file}`);
}

function getPanel() {
    return axios.get(__dataPath + "data/box/header_panel.json");
}

function getBox(client = "std") {
    let filename = client == "origin" ? "box_origin.json" : "box.json";
    return axios.get(__dataPath + "data/box/" + filename);
}

function getMenu(key) {
    return $cms().get(`/api/cms/config/menu/${key}`);
}

function getGames() {
    return axios.get(__dataPath + 'data/product/games.json')
}

// 获取全局配置
function getGlobalConfig() {
    return axios.get(`${__ossRoot}config/global.json`).then((res) => {
        return res.data;
    });
}

export { getLetter, getNav, getPanel, getBox, getMenu, getGames, getMsg, getGlobalConfig };
