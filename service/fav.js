import { $,axios } from "./axios";

function getFav() {
    return $.get("user/meta", {
        params: {
            key: "favs",
        },
    });
}

function addFav(pid) {
    return $.post("post/fav", { pid: pid, action: 1 })
}


function delFav(pid) {
    return $.post("post/fav", { pid: pid, action: 0 });
}

export { getFav, addFav, delFav };
