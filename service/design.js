import { $cms } from "@jx3box/jx3box-common/js/https";

export const createDesignTask = (data) => {
    return $cms().post(`/api/cms/design/task`, data);
}

export const getDesignTask = (params) => {
    return $cms().get(`/api/cms/design/task/log`, { params });
}
