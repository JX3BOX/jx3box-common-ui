import { $next } from "@jx3box/jx3box-common/js/https"

/**
 * 关注用户
 * @param {*} userId 用户id
 */
function follow(userId) {
    return $next().post(`/api/my-userlist/follow/${userId}`)
}

/**
 * 取消关注用户
 * @param {*} userId 用户id
 */
function unfollow(userId) {
    return $next().delete(`/api/my-userlist/follow/${userId}`)
}

/**
 * 获取我的关注列表
 * @param {*} param 参数
 * @param {*} param.pageIndex 页码
 * @param {*} param.pageSize 每页数量
 * @param {*} param.user_id 用户id
 * @param {*} param.display_name 用户昵称
 */
function getMyFollowList(params) {
    return $next().get(`/api/my-userlist/follow`, {
        params
    })
}

/**
 * 获取我的粉丝列表
 * @param {*} param 参数
 * @param {*} param.pageIndex 页码
 * @param {*} param.pageSize 每页数量
 * @param {*} param.user_id 用户id
 * @param {*} param.display_name 用户昵称
 */
function getMyFansList(params) {
    return $next().get(`/api/my-userlist/follow-me`, {
        params
    })
}

export {
    follow,
    unfollow,
    getMyFollowList,
    getMyFansList
}
