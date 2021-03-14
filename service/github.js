import { $server } from "./axios";

function getRepoInfo(repo) {
    return axios.get(`https://api.github.com/github?repo=${repo}`);
}

function getBuilders(coders) {
    return $server.get(`user/list?uid=${coders}`);
}

function getRepoCoders(repo) {
    return axios.get(
        `https://api.github.com/repos/JX3BOX/${repo}/contributors`
    );
}

export { getRepoInfo, getBuilders, getRepoCoders };
