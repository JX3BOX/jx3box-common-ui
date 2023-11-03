import { $cms } from "@jx3box/jx3box-common/js/https.js";

function getSetting(id) {
    return $cms()
        .get(`/api/cms/manage/post/${id}`)
        .then((res) => {
            return res.data.data;
        });
}

function postSetting(data) {
    return $cms().put(`/api/cms/manage/post/${data.ID}`, data);
}

// 管理员发送私信
function sendMessage(data) {
    return $cms().post(`/api/cms/manage/message`, data);
}

// 管理员新增自定义主题
function addTopicBucket(data) {
    return $cms().post(`/api/cms/post/topic/bucket`, data);
}

// 管理员删除自定义主题
function deleteTopicBucket(id) {
    return $cms().delete(`/api/cms/post/topic/bucket/${id}`);
}

// 管理员修改自定义主题
function updateTopicBucket(id, data) {
    return $cms().put(`/api/cms/post/topic/bucket/${id}`, data);
}

// 管理员获取自定义主题
function getTopicBucket(params) {
    return $cms().get(`/api/cms/post/topic/bucket/manage`, {
        params: params,
    });
}

export { getSetting, postSetting, sendMessage, addTopicBucket, deleteTopicBucket, updateTopicBucket, getTopicBucket };
