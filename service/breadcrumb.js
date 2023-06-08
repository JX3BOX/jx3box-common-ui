import { $cms } from "@jx3box/jx3box-common/js/https.js";

function getBreadcrumb(name) {
    return $cms().get(`/api/cms/breadcrumb/${name}`);
}

function getBreadcrumbs(params) {
    return $cms().get(`/api/cms/breadcrumb`, {
        params: params,
    });
}

export { getBreadcrumb, getBreadcrumbs };
