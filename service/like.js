import { $ } from "./axios";

function addLike(id) {
    return $.post("post/like",{
        id
    });
}

export { addLike };