import axios from "axios";
import { __helperUrl } from "@jx3box/jx3box-common/data/jx3box.json";

function getBreadcrumb(name) {
    return axios.get(__helperUrl + `api/breadcrumb/${name}`);
}

function getBreadcrumbs(params) {
    return axios.get(__helperUrl + `api/breadcrumbs`, {
        params: params,
    });
}

export { getBreadcrumb, getBreadcrumbs };
