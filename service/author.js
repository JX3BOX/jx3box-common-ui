import { $ } from "./axios";
import { $next } from "@jx3box/jx3box-common/js/axios";

function getUserInfo(uid) {
    return $.get("user/info", {
        params: {
            uid: uid,
        },
    });
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

export { getUserInfo, getUserPosts, getDouyu, getUserMedals };
