import { $cms, $next } from "@jx3box/jx3box-common/js/https";

const API_PREFIX = `/api/next2`;
// 获取分类
export function getTopicBucket(params) {
    return $cms().get(`/api/cms/topic/bucket`, { params });
}

export const recoverTopicFromPosts = (data) => {
    return $next().post(`${API_PREFIX}/community/discussion/manage/topic/recover/from/posts`, data);
};

export const updateTopicItem = (id, data) => {
    return $next().put(`${API_PREFIX}/community/discussion/manage/topic/item/${id}/update`, data);
};
export const deleteTopic = (id) => {
    return $next().delete(`${API_PREFIX}/community/discussion/manage/topic/item/${id}`);
};

// status = pass:审核通过, reject:审核不通过 wait:待审核
export const auditTopic = (id, action) => {
    return $next().put(`${API_PREFIX}/community/discussion/manage/topic/item/${id}/audit/${action}`);
};

/**
 *
 * @param {*} id 帖子id
 * @param {*} action 动作 top:置顶,star: 加精, hight: 高亮
 * @param {*} value 1:确认操作, 0:取消操作
 */
export const manageTopic = (id, action, value) => {
    return $next().put(`${API_PREFIX}/community/discussion/manage/topic/item/${id}/opt/${action}/${value}`);
};

export const manageTopicAll = (id, data) => {
    return $next().put(`${API_PREFIX}/community/discussion/manage/topic/item/${id}/opt`, data);
}

export const getTopicDetails = (id) => {
    return $next().get(`${API_PREFIX}/community/discussion/manage/topic/item/${id}`);
};

// 菜单
export function getCommunityTags() {
    return $cms()
        .get(`/api/cms/menu-group/community_tags`)
        .then((res) => {
            return res.data.data.menus || [];
        });
}

// 获取原帖子
export const getOriginalPost = (id) => {
    return $cms().get(`/api/cms/manage/post/by-community/${id}`);
}
