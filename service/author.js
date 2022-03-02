import axios from "axios";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { $next, $cms, $team } from "@jx3box/jx3box-common/js/https.js";

function getUserInfo(uid) {
    return $cms({ mute: true })
        .get(`/api/cms/user/${uid}/info`)
        .then((res) => {
            return res.data.data;
        });
}

function getUserPosts(uid) {
    return $cms({ mute: true })
        .get(`/api/cms/posts/user/${uid}/latest`)
        .then((res) => {
            return res.data.data;
        });
}

function getDouyu(ids) {
    return $next({ mute: true })
        .get("/team/douyu", {
            params: {
                tv_id: ids,
            },
        })
        .then((res) => {
            return res.data.data;
        });
}

function getUserMedals(uid) {
    return $next({ mute: true })
        .get("/api/user/" + uid + "/medals")
        .then((res) => {
            return res.data.data;
        });
}

function getFrames() {
    return axios.get(__imgPath + "avatar/index.json");
}

function getUserPublicTeams(uid) {
    return $team({ mute: true }).get(`/api/team/relation/public`, {
        params: {
            uid: uid,
        },
    }).then((res) => {
        return res.data.data;
    });
}

function getSuperAuthor(uid) {
    return $cms().get('/api/cms/user/is_super_author/' + uid)
}

function getIdentity(uid) {
    return $cms().get(`/api/cms/user/${uid}/identity`)
}

export {
    getUserInfo,
    getUserPosts,
    getDouyu,
    getUserMedals,
    getFrames,
    getUserPublicTeams,
    getSuperAuthor,
    getIdentity
};
