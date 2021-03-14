import axios from "axios";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { $next$, $server } from "./axios";

function getUserInfo(uid) {
    return $server.get("user/info", {
        params: {
            uid: uid,
        },
    });
}

function getUserOverview(uid) {
    return $server.get(`user/overview/${uid}`);
}

function getUserPosts(uid) {
    return $server.get("post/list", {
        params: {
            author: uid,
        },
    });
}

function getDouyu(ids) {
    return $next$.get("/team/douyu", {
        params: {
            tv_id: ids,
        },
    });
}

function getUserMedals(uid) {
    return $next$.get("/api/user/" + uid + "/medals");
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
