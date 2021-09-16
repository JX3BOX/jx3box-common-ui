import { $cms } from "@jx3box/jx3box-common/js/https";

function getPostAuthors(post_id) {
    return $cms().get(`/api/cms/post/${post_id}/authors`);
}

export { getPostAuthors };
