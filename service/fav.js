import { $,axios } from "./axios";
import {__helperUrl} from "@jx3box/jx3box-common/js/jx3box.json";

const qs = require("qs");

function hasFav(post_type, post_id) {
    if (post_type && post_id) {
        return $.get(`${__helperUrl}api/post/favorite/favorited`, {
            params: {
                post_type: post_type,
                post_id: post_id,
            },
        });
    } else return null;
}

function addFav(post_type, post_id) {
    if (post_type && post_id) {
        return $.post(`${__helperUrl}api/post/favorite`, qs.stringify({
            post_type: post_type,
            post_id: post_id,
            cancel: 0
        }));
    } else return null;
}


function delFav(post_type, post_id) {
    if (post_type && post_id) {
        return $.post(`${__helperUrl}api/post/favorite`, qs.stringify({
            post_type: post_type,
            post_id: post_id,
            cancel: 1
        }));
    } else return null;
}

export { hasFav, addFav, delFav };
