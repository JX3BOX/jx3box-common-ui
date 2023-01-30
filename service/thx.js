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

function sendCny(payUserId, accessUserId, money, remark) {
    return $pay().post(`/api/cny/consume/user-charge/${payUserId}/to/${accessUserId}/${money}`, { remark });
}

function checkCnyStatus(id) {
    return $pay().get(`/api/cny/consume/check-status/${id}`);
}

function checkGiftStatus(accessUserId){
    return $pay().get(`/api/cny/consume/user-charge/to/${accessUserId}/check-status`)
}

function batchReward(articleType,count,data){
    return $pay().post(`/api/inspire/batch/article/${articleType}/coins/${count}`, data);
}

export {
    getPostBoxcoinRecords,
    grantBoxcoin,
    rewardBoxcoin,
    recoveryBoxcoin,
    getPostBoxcoinConfig,
    getBoxcoinStatus,
    sendCny,
    checkCnyStatus,
    checkGiftStatus,
    batchReward,
};
