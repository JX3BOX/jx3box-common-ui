import { $cms } from "@jx3box/jx3box-common/js/https";
import axios from "axios";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
function getPostAuthors(post_id) {
    return $cms({ mute: true }).get(`/api/cms/post/${post_id}/authors`);
}

function uploadImage(formData) {
    return $cms().post(`/api/cms/upload/avatar`, formData);
}
//获取装扮
function getDecoration(params) {
    return $cms().get(`/api/cms/user/decoration`, {
        params,
    });
}
function getDecorationJson() {
    let url = __imgPath + "decoration/index.json";
    return axios.get(url);
}
// 通用上传
function upload(formData) {
    return $cms().post(`/api/cms/upload`, formData);
}

// 检测当前用户是否为团队成员
function checkTeamMember() {
    return $cms().get(`/api/cms/config/teammates/check`);
}

function getSliders(source_type, source_ids, client="std") {
    let _params = {
        type: "slider",
        source_type,
        per: 10,
        client,
    };

    if (source_ids) {
        _params.source_ids = source_ids;
    }

    return $cms({ mute: true }).get(`/api/cms/news/v2`, {
        params: _params,
    });
}

function getCollection(id) {
    return $cms({ mute: true }).get(`/api/cms/post/collection/${id}`);
}

// 获取自定义主题
function getTopicBucket(params) {
    return $cms().get(`/api/cms/topic/bucket`, { params });
}

// 获取config
function getConfig(params) {
    return $cms().get(`/api/cms/config`, { params }).then((res) => {
        return res.data.data;
    });
}

// 获取用户meta
function getUserMeta(params) {
    return $cms().get(`/api/cms/user/my/meta`, { params }).then((res) => {
        return res.data.data;
    });
}

// 设置用户meta
function setUserMeta(key,data) {
    return $cms().post(`/api/cms/user/my/meta?key=${key}`, data);
}

export { getPostAuthors, uploadImage, upload, getDecoration, getDecorationJson, checkTeamMember,
    getSliders, getCollection, getTopicBucket, getConfig, getUserMeta, setUserMeta };
