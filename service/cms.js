import { $cms } from "@jx3box/jx3box-common/js/https";

function getPostAuthors(post_id) {
    return $cms({mute:true}).get(`/api/cms/post/${post_id}/authors`);
}

function uploadImage(formData){
    return $cms().post(`/api/cms/upload/avatar`, formData);
}

// 通用上传
function upload(formData){
    return $cms().post(`/api/cms/upload`, formData);
}

export { getPostAuthors, uploadImage, upload };
