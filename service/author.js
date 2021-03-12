import axios from "axios";
import { __server, __imgPath } from "@jx3box/jx3box-common/js/jx3box.json";
import { $ } from "./axios";
import { $next } from "@jx3box/jx3box-common/js/axios";

function getUserInfo(uid) {
    return $.get("user/info", {
        params: {
            uid: uid,
        },
    });
}

function getUserOverview(uid) {
    return axios.get(__server + `user/overview/${uid}`);
}

function getUserPosts(uid) {
    return $.get("post/list", {
        params: {
            author: uid,
        },
    });
}

function getDouyu(ids) {
    return $next.get("/team/douyu", {
        params: {
            tv_id: ids,
        },
    });
}

function getUserMedals(uid) {
    return $next.get("/api/user/" + uid + "/medals");
}

function getFrames() {
    return axios.get(__imgPath + "data/user_avatar_frame.json");
}

export {
    getUserInfo,
    getUserPosts,
    getDouyu,
    getUserMedals,
    getUserOverview,
    getFrames,
};
