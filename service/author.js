import { $ } from "./axios";
import {$next} from '@jx3box/jx3box-common/js/axios'

function getUserInfo(uid) {
    return $.get("user/info", {
        params: {
            uid: uid,
        },
    });
}

function getUserPosts(uid) {
    return $.get("post/list", {
        params: {
            author: uid,
        },
    });
}

function getDouyu(ids){
    return $next.get('/team/douyou',{
        params : {
            tv_id : ids
        }
    })
}

export { getUserInfo, getUserPosts,getDouyu };
