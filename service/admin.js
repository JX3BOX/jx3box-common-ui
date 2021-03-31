import { $cms } from "@jx3box/jx3box-common/js/https.js";

function getSetting(id) {
    return $cms({ proxy: true })
        .get(`/api/cms/post/${id}/query`)
        .then((res) => {
            return res.data.data;
        });
}

function postSetting(data) {
    return $cms({ proxy: true }).put(`/api/cms/post/${data.ID}/setting`, data);
}

export { getSetting, postSetting };
