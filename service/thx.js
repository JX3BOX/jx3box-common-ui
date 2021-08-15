import { $pay } from "@jx3box/jx3box-common/js/https";

function getPostBoxcoinRecords(postType, postId, params) {
    return $pay().get(`/api/inspire/posts/${postType}/${postId}/history`, {
        params,
    });
}

function grantBoxcoin(postType, postId, userId, count, data) {
    return $pay().post(`/api/inspire/posts/${postType}/${postId}/manager2creator/${userId}/coins/${count}`, data);
}

function rewardBoxcoin(postType, postId, userId, count, data) {
    return $pay().post(`/api/inspire/posts/${postType}/${postId}/user2creator/${userId}/coins/${count}`, data);
}

function recoveryBoxcoin(id){
    return $pay().delete(`/api/inspire/coins/log/${id}/recovery`)
}

export { getPostBoxcoinRecords, grantBoxcoin, rewardBoxcoin ,recoveryBoxcoin};
