import { $cms } from "@jx3box/jx3box-common/js/https.js";

function getSetting(id) {
    return $cms()
        .get(`/api/cms/post/${id}/query`)
        .then((res) => {
            return res.data.data;
        });
}

function postSetting(data) {
    return $cms().put(`/api/cms/post/${data.ID}/setting`, data);
}

function sendMessage(data){
    return $cms().post(`/api/cms/admin/direct-message`, data);
}

export { getSetting, postSetting, sendMessage };
