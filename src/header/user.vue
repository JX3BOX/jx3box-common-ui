<template>
    <div class="c-header-user" id="c-header-user">
        <template v-if="isLogin">
            <!-- 消息中心 -->
            <message />

            <!-- 创作中心 -->
            <publish />

            <!-- vip -->
            <vip />

            <!-- 商城 -->
            <shop />

            <!-- 我的资产 -->
            <asset :asset="asset" />

            <!-- manage -->
            <manage :isTeammate="isTeammate" />

            <!-- 语言切换 -->
            <!-- <lang-switch /> -->

            <!-- user info -->
            <user-info :asset="asset" @logout="logout" @update="update" />
        </template>
        <template v-else>
            <div class="c-header-login">
                <a class="u-register u-default" :href="register_url">注册</a>
                <em>|</em>
                <a class="u-login u-default" :href="login_url">登录</a>
            </div>
        </template>
    </div>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
import { userSignIn } from "../../service/author";
import { __Links } from "@jx3box/jx3box-common/data/jx3box.json";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);

import message from "./message.vue";
import publish from "./publish.vue";
import vip from "./vip.vue";
import asset from "./asset.vue";
import manage from "./manage.vue";
import userInfo from "./userInfo.vue";
// import langSwitch from "./langSwitch.vue";
import shop from "./shop.vue";
export default {
    props: {
        asset: {
            type: Object,
            default: () => {
                return {
                    expire_date: "2022-03-07T00:00:00+08:00",
                    total_day: 395,
                    was_vip: 0,

                    pro_expire_date: "2022-03-07T00:00:00+08:00",
                    pro_total_day: 366,
                    was_pro: 0,
                };
            },
        }
    },
    components: {
        message,
        publish,
        vip,
        asset,
        manage,
        userInfo,
        // langSwitch,
        shop,
    },
    data: function () {
        return {
            // 是否折叠
            // 登录信息
            user: User.getInfo(),
            isLogin: User.isLogin(),

            // 链接
            login_url: __Links.account.login + "?redirect=" + location.href,
            register_url: __Links.account.register + "?redirect=" + location.href,

            isTeammate: false,
        };
    },
    methods: {
        // 签到
        signIn: function () {
            try {
                let user_last_login = localStorage.getItem("user_last_login");
                user_last_login = (user_last_login && JSON.parse(user_last_login)) || "";

                if (user_last_login && dayjs(user_last_login).isToday()) {
                    // console.log("已签到");
                } else {
                    // 延迟2秒执行 feedback#501
                    const signTimer = setTimeout(() => {
                        userSignIn()
                            .then((res) => {
                                let msg = this.$message({
                                    type: "success",
                                    message: "签到成功",
                                    customClass: "c-header-signin",
                                    duration: 0,
                                });
                                // 模拟手动关闭
                                setTimeout(() => {
                                    msg.close();
                                }, 3000);
                                localStorage.setItem("user_last_login", JSON.stringify(dayjs()));
                            })
                            .catch((err) => {
                                localStorage.setItem("user_last_login", JSON.stringify(dayjs()));
                            })
                            .finally(() => {
                                clearTimeout(signTimer);
                            });
                    }, 2000);
                }
            } catch (e) {
                console.log(e);
            }
        },
        // 初始化
        init: function () {
            if (this.isLogin) {
                this.signIn();
            }
        },

        // 退出登录
        logout: function () {
            this.isLogin = false;
        },
        // 更新用户信息
        update: function ({ is_teammate }) {
            this.isTeammate = is_teammate;
        },
    },
    created: function () {
        this.init();
    },
};
</script>
