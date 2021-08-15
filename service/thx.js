import { $pay } from "@jx3box/jx3box-common/js/https";

function getPostBoxcoinRecords(postType, postId, params) {
    return $pay().get(`/api/inspire/posts/${postType}/${postId}/history`, {
        params,
    });
}

export { getPostBoxcoinRecords };
