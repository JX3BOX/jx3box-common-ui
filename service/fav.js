// import qs from "qs";
// import { $helper } from "@jx3box/jx3box-common/js/https.js";

// function hasFav(post_type, post_id) {
//     if (post_type && post_id) {
//         return $helper({ popType: "notify" }).get(
//             `/api/post/favorite/favorited`,
//             {
//                 params: {
//                     post_type: post_type,
//                     post_id: post_id,
//                 },
//             }
//         );
//     } else return null;
// }

// function addFav(post_type, post_id) {
//     if (post_type && post_id) {
//         return $helper({ popType: "notify" }).post(
//             `/api/post/favorite`,
//             qs.stringify({
//                 post_type: post_type,
//                 post_id: post_id,
//                 cancel: 0,
//             })
//         );
//     } else return null;
// }

// function delFav(post_type, post_id) {
//     if (post_type && post_id) {
//         return $helper({ popType: "notify" }).post(
//             `/api/post/favorite`,
//             qs.stringify({
//                 post_type: post_type,
//                 post_id: post_id,
//                 cancel: 1,
//             })
//         );
//     } else return null;
// }

// export { hasFav, addFav, delFav };
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
export { hasFav, addFav, delFav };
