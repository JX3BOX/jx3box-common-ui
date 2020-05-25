import { axios } from "./axios";
import { __server, __proxy } from "@jx3box/jx3box-common/js/jx3box.json";

function getRepoInfo(repo) {
    return axios.get(`${__proxy}github?repo=${repo}`);
}

function getBuilders(coders) {
    return axios.get(`${__server}user/list?uid=${coders}`);
}

function getRepoCoders(repo) {
    return axios.get(
        `https://api.github.com/repos/JX3BOX/${repo}/contributors`
    );
}

export { getRepoInfo, getBuilders, getRepoCoders };
