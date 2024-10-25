import { $next } from "@jx3box/jx3box-common/js/https.js";
const $n = $next();

function hasFav(post_type, post_id) {
    return $n.get(`api/article/favorites/is-my/${post_id}/${post_type}`).then((res) => {
        return res.data.data;
    });
}
function addFav(post_type, post_id, post_title) {
    return $n.post(`api/article/favorites/add/${post_id}/${post_type}`, { post_title }).then((res) => {
        return res.data.data;
    });
}
function delFav(id) {
    return $n.delete(`api/article/favorites/my/${id}`);
}


// 稍后再看
function addWatchLater(data) {
    return $n.post(`api/next2/userdata/favorite/item`, data)
}

function delWatchLater(id) {
    return $n.delete(`api/next2/userdata/favorite/item/${id}`)
}

export { hasFav, addFav, delFav, addWatchLater, delWatchLater };
