import { $,axios } from "./axios";
import {__helperUrl} from "@jx3box/jx3box-common/js/jx3box.json";

function getBreadcrumb(name) {
    return $.get(`${__helperUrl}api/breadcrumb/${name}`, {
        headers: {Accept: "application/prs.helper.v2+json"},
    });
}

function getBreadcrumbs(params) {
    return $.get(`${__helperUrl}api/breadcrumbs`, {
        headers: {Accept: "application/prs.helper.v2+json"},
        params: params,
    });
}

export { getBreadcrumb, getBreadcrumbs };
