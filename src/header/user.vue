<template>
    <div class="c-header-user" id="c-header-user">
        <template v-if="isLogin">
            <!-- user msg -->
            <div class="c-header-msg" id="c-header-msg">
                <el-tooltip effect="dark" content="我的消息" placement="bottom">
                    <a class="u-msg" :href="url.msg">
                        <i class="u-icon u-icon-msg">
                            <i
                                class="u-pop"
                                style="display: none"
                                v-show="pop"
                            ></i>
                            <img
                                svg-inline
                                src="../../assets/img/header/msg.svg"
                            />
                        </i>
                    </a>
                </el-tooltip>
            </div>

            <!-- user panel -->
            <div class="c-header-panel" id="c-header-panel">
                <el-tooltip effect="dark" content="发布中心" placement="bottom">
                    <a class="u-post" :href="url.publish">
                        <img
                            class="u-add"
                            svg-inline
                            src="../../assets/img/header/add.svg"
                        />
                    </a>
                </el-tooltip>
            </div>

            <!-- user info -->
            <div class="c-header-info">
                <div
                    class="c-header-profile"
                    id="c-header-profile"
                    @click="showmenu"
                >
                    <img class="u-avatar" :src="user.avatar" />
                    <span class="u-dropdown"></span>
                    <ul class="u-menu" v-show="!fold">
                        <li>
                            <a class="u-me" :href="url.homepage">
                                <b>{{ showUserName(user.name) }}</b>
                                <img
                                    v-if="isSuperAuthor"
                                    :src="super_author_icon"
                                    class="u-superauthor-profile"
                                    alt="superauthor"
                                    title="签约作者"
                                />
                                <em>(UID : {{ user.uid }})</em>
                            </a>
                        </li>
                        <li>
                            <a
                                class="u-vip"
                                href="/vip/premium?from=header_usermenu"
                                target="_blank"
                            >
                                <i
                                    class="i-icon-vip"
                                    :class="{ on: isVIP || isPRO }"
                                    >{{ vipType }}</i
                                >
                                <span class="u-vip-type">
                                    <template v-if="isVIP || isPRO">
                                        {{ vipTypeTxt }}
                                        <span class="u-vip-left"
                                            >({{ vipLeftDays }}天)</span
                                        >
                                    </template>
                                    <template v-else>升级账号类型</template>
                                </span>
                                <!-- <span class="u-expire" v-if="expire_date">(有效期至:{{expire_date}})</span> -->
                            </a>
                        </li>
                        <hr />
                        <template v-for="(item, i) in panel">
                            <li
                                :key="'panel-' + i"
                                v-if="isAdmin || !item.onlyAdmin"
                            >
                                <a :href="item.link">{{ item.label }}</a>
                            </li>
                        </template>
                        <hr />
                        <li>
                            <a :href="url.profile">设置</a>
                        </li>
                        <li>
                            <a @click="logout()">登出</a>
                        </li>
                    </ul>
                </div>
            </div>
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
import { showDate } from "@jx3box/jx3box-common/js/moment";
import {
    __Links,
    __Root,
    __imgPath,
    __OriginRoot,
} from "@jx3box/jx3box-common/data/jx3box.json";
import panel from "../../assets/data/panel.json";
import { getMsg, getMenu } from "../../service/header";
import { getMyInfo, userSignIn } from "../../service/author";
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
dayjs.extend(isToday);
export default {
    props: [],
    data: function () {
        return {
            panel,
            isEditor: false,
            isAdmin: false,

            // 是否有消息
            pop: false,
            // 是否折叠
            fold: true,
            // 登录信息
            user: User.getInfo(),
            isLogin: User.isLogin(),
            // links
            url: {
                msg: __Links.dashboard.msg,
                publish: __Links.dashboard.publish,
                dashboard: __Links.dashboard.home,
                profile: __Links.dashboard.profile,
                homepage: "/author/" + User.getInfo().uid,
            },

            // VIP
            asset: {
                expire_date: "2022-03-07T00:00:00+08:00",
                total_day: 395,
                was_vip: 0,

                pro_expire_date: "2022-03-07T00:00:00+08:00",
                pro_total_day: 366,
                was_pro: 0,
            },

            // 链接
            login_url: __Links.account.login + "?redirect=" + location.href,
            register_url:
                __Links.account.register + "?redirect=" + location.href,
            isSuperAuthor: false,
        };
    },
    computed: {
        isVIP: function () {
            return User._isVIP(this.asset) || false;
        },
        isPRO: function () {
            return User._isPRO(this.asset) || false;
        },
        vipType: function () {
            return this.isPRO ? "PRO" : "PRE";
        },
        vipTypeTxt: function () {
            return this.isPRO ? "专业版" : "高级版";
        },
        expire_date: function () {
            if (this.isPRO) {
                return showDate(this.asset.pro_expire_date);
            } else if (this.isVIP) {
                return showDate(this.asset.expire_date);
            } else {
                return "";
            }
        },
        vipLeftDays: function () {
            if (this.isPRO) {
                return parseInt(
                    (new Date(this.asset.pro_expire_date) - new Date()) /
                        86400000
                );
            } else if (this.isVIP) {
                return parseInt(
                    (new Date(this.asset.expire_date) - new Date()) / 86400000
                );
            } else {
                return "";
            }
        },
        super_author_icon: function () {
            return __imgPath + "image/user/" + "superauthor.svg";
        },
        siteRoot : function (){
            return location.host.includes('origin') ? __OriginRoot : __Root
        }
    },
    watch: {
        fold(val) {
            if (!val) {
            }
        }
    },
    methods: {
        // 消息
        checkMSG: function () {
            getMsg().then((res) => {
                this.pop = !!res.data.data.unread;
            });
        },

        // 面板
        showmenu: function (e) {
            e.stopPropagation();
            this.fold = !this.fold;
        },
        closeExpandList: function () {
            const vm = this;
            document.addEventListener("click", function () {
                vm.fold = true;
            });
        },
        loadPanel: function () {
            try {
                const panel = JSON.parse(sessionStorage.getItem("panel"));
                if (panel) {
                    this.panel = panel;
                } else {
                    getMenu("panel").then((res) => {
                        this.panel = res.data?.data?.val;
                        sessionStorage.setItem("panel", JSON.stringify(this.panel));
                    });
                }
            } catch (e) {
                this.panel = panel;
                console.log('loadPanel error', e);
            }
        },
        logout: function () {
            User.destroy()
                .then((res) => {
                    this.isLogin = false;
                    if (location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/publish')) {
                        location.href = this.siteRoot;
                    }
                })
                .then(() => {
                    this.$notify({
                        title: "成功",
                        message: "登出成功",
                        type: "success",
                        duration: 1000,
                    });
                });
        },
        // 签到
        signIn: function (){
            try {
                let user_last_login = localStorage.getItem('user_last_login');
                user_last_login = user_last_login && JSON.parse(user_last_login) || ''

                if (user_last_login && dayjs(user_last_login).isToday()) {
                    console.log('已签到')
                } else {
                    userSignIn().then(res => {
                        this.$message({
                            type: 'success',
                            message: '签到成功',
                            customClass: 'c-header-signin'
                        })
                        localStorage.setItem('user_last_login', JSON.stringify(dayjs()))
                    }).catch(err => {
                        localStorage.setItem('user_last_login', JSON.stringify(dayjs()))
                        console.log(dayjs.tz.guess())
                    }).finally(() => {})
                }
            } catch(e) {
                console.log(e)
            }
        },

        // 资产
        loadAsset: function () {
            User.getAsset().then((data) => {
                this.asset = data;
            });
        },
        loadMyInfo: function () {
            getMyInfo().then(res => {
                this.isSuperAuthor = !!res.sign
            })
        },

        // 初始化
        init: function () {
            if (this.isLogin) {
                this.isEditor = User.isEditor();
                this.isAdmin = User.isAdmin();
                this.checkMSG();
                this.loadPanel();
                this.loadAsset();
                this.loadMyInfo()
                this.signIn()
            }
        },

        showUserName: function (val) {
            if (val) {
                if (val.length < 5) {
                    return val;
                } else {
                    return val.slice(0, 4) + "..";
                }
            } else {
                return "匿名";
            }
        },
    },
    created: function () {
        this.closeExpandList();
        this.init();
    },
    components: {},
};
</script>
