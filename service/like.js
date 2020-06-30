import { $,axios } from "./axios";
import {__next} from '@jx3box/jx3box-common/js/jx3box.json'

const API = __next + 'api/post/'
// const API = '/api/post/'

function addLike(id,type) {
    // return $.post("post/like",{
    //     id
    // });
    return axios.get(API + id  + '/summary',{
        params : {
            type : type,
            actions : 'likes'
        }
    })
}

function getLike(id) {
}

export { addLike,getLike };