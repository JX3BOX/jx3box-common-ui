import { $ } from "./axios";

function addLike(id) {
    return $.post("post/like",{
        id
    });
}

function getLike(id) {
}

export { addLike,getLike };