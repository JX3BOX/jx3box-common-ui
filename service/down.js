import { $ } from "./axios";

function addDown(id) {
    return $.post("post/down",{
        id
    });
}

function getDown(id){
    
}

export { addDown,getDown };