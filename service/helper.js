import { $helper } from "@jx3box/jx3box-common/js/https";

function getCollection(id) {
    return $helper().get(`/api/post/collection/${id}`);
}

export { getCollection };
