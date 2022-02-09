import { $pay, $cms } from "@jx3box/jx3box-common/js/https";

function getPostBoxcoinRecords(postType, postId, params) {
    return $pay().get(`/api/inspire/article/${postType}/${postId}/history`, {
        params,
    });
}

function grantBoxcoin(postType, postId, userId, count, data) {
    return $pay().post(`/api/inspire/article/${postType}/${postId}/manager2creator/${userId}/coins/${count}`, data);
}

function rewardBoxcoin(postType, postId, userId, count, data) {
    return $pay().post(`/api/inspire/article/${postType}/${postId}/user2creator/${userId}/coins/${count}`, data);
}

function recoveryBoxcoin(id) {
    return $pay().delete(`/api/inspire/coins/log/${id}/recovery`);
}

function getPostBoxcoinConfig(postType) {
    return $pay().get(`/api/inspire/article/${postType}/boxcoin/limit`);
}

function getBoxcoinStatus() {
    return $cms().get(`/api/cms/config`, {
        params: {
            key: "boxcoin",
        },
    });
}

export { getPostBoxcoinRecords, grantBoxcoin, rewardBoxcoin, recoveryBoxcoin, getPostBoxcoinConfig, getBoxcoinStatus };
