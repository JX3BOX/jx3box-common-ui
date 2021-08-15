import { $pay } from "@jx3box/jx3box-common/js/https";

function getPostBoxcoinRecords(postType, postId, params) {
    return $pay().get(`/api/inspire/posts/${postType}/${postId}/history`, {
        params,
    });
}

function grantBoxcoin(postType, postId, userId, count, data) {
    return $pay().post(`/api/inspire/posts/${postType}/${postId}/manager2creator/${userId}/coins/${count}`, data);
}

export { getPostBoxcoinRecords, grantBoxcoin };
