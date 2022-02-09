import { $helper } from "@jx3box/jx3box-common/js/https.js";

function getBreadcrumb(name) {
    return $helper().get(`/api/breadcrumb/${name}`);
}

function getBreadcrumbs(params) {
    return $helper().get(`/api/breadcrumbs`, {
        params: params,
    });
}

export { getBreadcrumb, getBreadcrumbs };
