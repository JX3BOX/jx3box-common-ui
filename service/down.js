import { $ } from "./axios";

function addDown(id) {
    return $.post("post/down",{
        id
    });
}

export { addDown };