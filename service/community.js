import { $cms, $next } from "@jx3box/jx3box-common/js/https";
const API_PREFIX = `/api/next2`;
// 获取分类
export function getTopicBucket(params) {
    return $cms().get(`/api/cms/topic/bucket`, { params });
}

export const recoverTopicFromPosts = (data) => {
    return $next().post(`${API_PREFIX}/community/discussion/manage/topic/recover/from/posts`, data);
};
