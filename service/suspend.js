import { $next } from "@jx3box/jx3box-common/js/https";
//订阅作者
function subscribeAuthor(authorId, data) {
    return $next().post(`/api/next2/rss/subscribe/author/${authorId}`, data);
}

function unsubscribeAuthor(authorId) {
    return $next().delete(`/api/next2/rss/subscribe/author/${authorId}`);
}

function getSubscribeStatus(authorId) {
    return $next().get(`/api/next2/rss/overview/author/${authorId}`);
}
//订阅帖子
function subscribePost(id, data) {
    return $next().post(`/api/next2/rss/subscribe/community/${id}`, data);
}

function unsubscribePost(id) {
    return $next().delete(`/api/next2/rss/subscribe/community/${id}`);
}

function getSubscribePostStatus(id) {
    return $next().get(`/api/next2/rss/overview/community/${id}`);
}
//订阅文章
function subscribeArticle(postType, postId, data) {
    return $next().post(`/api/next2/rss/subscribe/posts/${postType}/${postId}`, data);
}

function unsubscribeArticle(postType, postId) {
    return $next().delete(`/api/next2/rss/subscribe/posts/${postType}/${postId}`);
}
function getSubscribeArticleStatus(postType, postId) {
    return $next().get(`/api/next2/rss/overview/posts/${postType}/${postId}`);
}
//订阅百科
function subscribeWiki(wikiType, id, data) {
    return $next().post(`/api/next2/rss/subscribe/wiki/${wikiType}/${id}`, data);
}

function unsubscribeWiki(wikiType, id) {
    return $next().delete(`/api/next2/rss/subscribe/wiki/${wikiType}/${id}`);
}
function getSubscribeWikiStatus(wikiType, id) {
    return $next().get(`/api/next2/rss/overview/wiki/${wikiType}/${id}`);
}
//稍后看
function later(data) {
    return $next().post(`/api/next2/userdata/watch-later/item`, data);
}
// 收藏相关
function setCollect(id, type, post_title) {
    return $next().post(`/api/article/favorites/add/${id}/${type}`, {
        post_title: post_title,
    });
}
function getCollectList(id, type) {
    return $next().get(`/api/article/favorites/is-my/${id}/${type}`);
}
function cancelCollect(id) {
    return $next().delete(`/api/article/favorites/my/${id}`);
}
export {
    subscribeAuthor,
    unsubscribeAuthor,
    subscribePost,
    unsubscribePost,
    subscribeArticle,
    unsubscribeArticle,
    subscribeWiki,
    unsubscribeWiki,
    getSubscribeStatus,
    getSubscribePostStatus,
    getSubscribeArticleStatus,
    getSubscribeWikiStatus,
    later,
    setCollect,
    getCollectList,
    cancelCollect,
};
