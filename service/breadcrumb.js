import { $helper } from "./axios";

function getBreadcrumb(name) {
    return $helper.get(`api/breadcrumb/${name}`);
}

function getBreadcrumbs(params) {
    return $helper.get(`api/breadcrumbs`, {
        params: params,
    });
}

export { getBreadcrumb, getBreadcrumbs };
