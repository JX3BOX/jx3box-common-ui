import { $ } from "./axios";

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

export { getUserInfo, getUserPosts };
