import { $next } from "@jx3box/jx3box-common/js/https";

function getMedals(author){
    return $next({ mute: true }).get(`api/user/${author}/medals`);
}

export { getMedals };
