import axios from "axios";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { $next, $cms, $team, $pay } from "@jx3box/jx3box-common/js/https.js";

function getUserInfo(uid) {
    return $cms({ mute: true })
        .get(`/api/cms/user/${uid}/info`)
        .then((res) => {
            return res.data.data;
        });
}

// 根据用户id或者昵称获取用户信息
function getUserInfoByUidOrName(params) {
    return $cms({ mute: true }).get(`/api/cms/user/search`, {
        params: params,
    }).then((res) => {
        return res.data.data;
    });
}

function getMyInfo(){
    return $cms({ mute: true })
        .get(`/api/cms/user/my/info`)
        .then(res => {
            return res.data.data
        })
}

function getUserPosts(uid) {
    return $cms({ mute: true })
        .get(`/api/cms/posts/user/${uid}/latest`)
        .then((res) => {
            return res.data.data.list || [];
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
// 获取用户勋章
function getUserMedals(uid) {
    return $cms({ mute: true })
        .get("/api/cms/user/medal/" + uid)
        .then((res) => {
            return res.data.data;
        });
}

// 获取用户称号
function getUserHonors(uid) {
    return $next({ mute: true })
        .get("/api/next2/user/" + uid + "/honors")
        .then((res) => {
            return res.data.data;
        });
}

function getUserHonor(uid) {
    return $cms({ mute: true })
        .get(`/api/cms/user/honor/${uid}/using`)
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

function userSignIn(){
    return $pay({ mute: true }).get(`/api/personal/task/everyday/sign-in`)
}

function getFansList(userid,limit) {
    return $pay().get(`/api/cny/consume/user-charge/rank/of/${userid}?limit=0`,);
}

export {
    getUserInfo,
    getUserPosts,
    getDouyu,
    getUserMedals,
    getFrames,
    getUserPublicTeams,
    getSuperAuthor,
    getMyInfo,
    userSignIn,
    getFansList,
    getUserInfoByUidOrName,
    getUserHonors,
    getUserHonor
};
