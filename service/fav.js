import qs from "qs";
import { $_https } from "@jx3box/jx3box-common/js/https.js";

function hasFav(post_type, post_id) {
    if (post_type && post_id) {
        return $_https("helper", {
            popType: "notify",
            proxy : false
        }).get(`/api/post/favorite/favorited`, {
            params: {
                post_type: post_type,
                post_id: post_id,
            },
        });
    } else return null;
}

function addFav(post_type, post_id) {
    if (post_type && post_id) {
        return $_https("helper", {
            popType: "notify",
            proxy : false
        }).post(
            `/api/post/favorite`,
            qs.stringify({
                post_type: post_type,
                post_id: post_id,
                cancel: 0,
            })
        );
    } else return null;
}

function delFav(post_type, post_id) {
    if (post_type && post_id) {
        return $_https("helper", {
            popType: "notify",
            proxy : false
        }).post(
            `/api/post/favorite`,
            qs.stringify({
                post_type: post_type,
                post_id: post_id,
                cancel: 1,
            })
        );
    } else return null;
}

export { hasFav, addFav, delFav };
