<template>
    <div class="c-header-user" id="c-header-user">
        <template v-if="isLogin">
            <!-- 消息中心 -->
            <div class="c-header-msg" id="c-header-msg">
                <el-tooltip effect="dark" content="消息中心" placement="bottom">
                    <a class="u-msg" :href="url.msg">
                        <i class="u-icon u-icon-msg">
                            <i class="u-pop" style="display: none" v-show="pop"></i>
                            <img svg-inline src="../../assets/img/header/bell.svg" />
                        </i>
                    </a>
                </el-tooltip>
            </div>

            <!-- 创作中心 -->
            <div class="c-header-panel" id="c-header-panel">
                <el-tooltip effect="dark" content="创作中心" placement="bottom">
                    <a class="u-post" :href="url.publish">
                        <img class="u-add" svg-inline src="../../assets/img/header/edit.svg" />
                    </a>
                </el-tooltip>
            </div>

            <!-- 我的资产 -->
            <div class="c-header-panel c-header-assets" @mouseenter="onAssetsHover" @mouseleave="onAssetsBlur">
                <a class="u-asset" href="/dashboard/boxcoin">
                    <img class="u-coin" svg-inline src="../../assets/img/header/coin.svg" />
                </a>

                <div class="u-assets" v-show="showAssets">
                    <div class="u-detail">
                        <span class="u-item">
                            <!-- <span class="u-item-primary>" -->
                            <span class="u-label"><i class="el-icon-user"></i> 等级</span>
                            <span class="u-value">Lv.{{ level }}</span>
                            <!-- </span> -->
                            <!-- <span class="u-item-extend"><a href="/notice/28917" target="_blank">[权益]</a></span> -->
                        </span>
                        <span class="u-item">
                            <span class="u-item-primary"
                                ><span class="u-label"><i class="el-icon-coin"></i> 盒币</span>
                                <span class="u-value">{{ asset.box_coin }}</span></span
                            >
                            <span class="u-item-extend"
                                ><a href="/dashboard/boxcoin" target="_blank">[兑换通宝]</a></span
                            >
                        </span>
                        <span class="u-item">
                            <span class="u-item-primary"
                                ><span class="u-label"><i class="el-icon-wallet"></i> 金箔</span
                                ><span class="u-value">{{ asset.cny }}</span></span
                            >
                            <span class="u-item-extend"
                                ><a href="/vip/cny" target="_blank">[充值]</a>
                                <a href="/dashboard/cny" target="_blank">[提现]</a></span
                            >
                        </span>
                        <span class="u-item">
                            <span class="u-item-primary"
                                ><span class="u-label"><i class="el-icon-sugar"></i> 银铛</span>
                                <span class="u-value">{{ asset.points }}</span></span
                            >
                            <span class="u-item-extend"
                                ><a href="/vip/mall" target="_blank">[兑礼]</a
                                ><a href="/vip/lottery" target="_blank">[抽奖]</a></span
                            >
                        </span>
                        <span class="u-item">
                            <span class="u-item-primary"
                                ><span class="u-label"><i class="el-icon-bank-card"></i> 卡密</span>
                                <span class="u-value">{{ asset.ext_info ? asset.ext_info.keycode : 0 }}</span></span
                            >
                            <span class="u-item-extend"><a href="/dashboard/card" target="_blank">[查看]</a></span>
                        </span>
                    </div>
                </div>
            </div>

            <!-- vip -->
            <div class="c-header-panel" id="c-header-vip">
                <el-tooltip effect="dark" content="会员中心" placement="bottom">
                    <a class="u-post" href="/vip/premium">
                        <img class="u-add" svg-inline src="../../assets/img/header/vip.svg" />
                    </a>
                </el-tooltip>
            </div>

            <!-- manage -->
            <div
                class="c-header-panel c-header-manage"
                id="c-header-manage"
                v-if="isEditor"
                @mouseenter="showManage = true"
                @mouseleave="showManage = false"
            >
                <span class="u-post">
                    <img class="u-add" svg-inline src="../../assets/img/header/manage.svg" />
                </span>
                <ul class="u-menu" v-show="showManage">
                    <li v-if="isAdmin">
                        <a href="/admin">站点配置</a>
                    </li>
                    <li v-if="isEditor">
                        <a href="https://os.jx3box.com/admin">管理平台</a>
                    </li>
                </ul>
            </div>

            <!-- user info -->
            <div class="c-header-info">
                <div class="c-header-profile" id="c-header-profile" @click="showmenu">
                    <img class="u-avatar" :src="user.avatar" />
                    <div class="c-header-userdata">
                        <!--  v-show="!fold" -->
                        <div class="u-profile">
                            <div class="u-basic">
                                <a class="u-displayname" href="/dashboard" :title="user.name">{{
                                    showUserName(user.name)
                                }}</a>
                                <a class="u-sign" href="/dashboard/cooperation">
                                    <img
                                        :src="super_author_icon"
                                        class="u-superauthor-profile"
                                        alt="superauthor"
                                        title="签约作者"
                                        :class="{ off: !isSuperAuthor }"
                                /></a>
                                <a
                                    class="u-vip"
                                    href="/vip/premium?from=header_usermenu"
                                    target="_blank"
                                    title="专业版账号"
                                >
                                    <i class="i-icon-vip" :class="{ on: isPRO }">{{ vipType }}</i>
                                </a>
                            </div>
                            <div class="u-id">
                                <span
                                    >魔盒UID：<b>{{ user.uid }}</b></span
                                >
                                <i class="el-icon-document-copy u-copy" @click.stop="copyText(user.uid)"></i>
                            </div>
                        </div>

                        <el-button-group class="u-actions">
                            <a class="el-button el-button--default" :href="url.profile">资料设置</a>
                            <a class="el-button el-button--default" :href="url.homepage">个人主页</a>
                            <a class="el-button el-button--default" href="/dashboard/frame">主题风格</a>
                        </el-button-group>

                        <div class="u-other">
                            <a href="/dashboard/fav" class="u-item"><i class="el-icon-star-off"></i>收藏订阅 </a>
                            <a href="/team/role/manage" class="u-item"><i class="el-icon-user"></i>角色管理 </a>
                            <a href="/dashboard/purchases" class="u-item"
                                ><i class="el-icon-shopping-cart-2"></i>已购资源
                            </a>
                            <a href="/dashboard/mall" class="u-item"><i class="el-icon-shopping-bag-1"></i>订单中心 </a>
                            <hr />
                            <a href="/dashboard/feedback" class="u-item"
                                ><i class="el-icon-phone-outline"></i>反馈帮助
                            </a>
                            <hr />
                            <div class="u-logout">
                                <el-button @click="logout" size="small">退出登录</el-button>
                            </div>
                        </div>
                    </div>
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
import { __Links, __Root, __imgPath, __OriginRoot } from "@jx3box/jx3box-common/data/jx3box.json";
import panel from "../../assets/data/panel.json";
import { getMsg, getMenu } from "../../service/header";
import { getMyInfo, userSignIn } from "../../service/author";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import { copyText } from "../../assets/js/utils";
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

            // assets
            showAssets: false,

            // manage
            showManage: false,

            // 链接
            login_url: __Links.account.login + "?redirect=" + location.href,
            register_url: __Links.account.register + "?redirect=" + location.href,
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
            return "PRO";
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
                return parseInt((new Date(this.asset.pro_expire_date) - new Date()) / 86400000);
            } else if (this.isVIP) {
                return parseInt((new Date(this.asset.expire_date) - new Date()) / 86400000);
            } else {
                return "";
            }
        },
        super_author_icon: function () {
            return __imgPath + "image/user/" + "superauthor.svg";
        },
        siteRoot: function () {
            return location.host.includes("origin") ? __OriginRoot : __Root;
        },
        level: function () {
            return User.getLevel(this.asset.experience);
        },
    },
    watch: {
        fold(val) {
            if (!val) {
            }
        },
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
                console.log("loadPanel error", e);
            }
        },
        logout: function () {
            User.destroy()
                .then((res) => {
                    this.isLogin = false;
                    if (location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/publish")) {
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
        signIn: function () {
            try {
                let user_last_login = localStorage.getItem("user_last_login");
                user_last_login = (user_last_login && JSON.parse(user_last_login)) || "";

                if (user_last_login && dayjs(user_last_login).isToday()) {
                    console.log("已签到");
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
                                console.log(dayjs.tz.guess());
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

        // 资产
        loadAsset: function () {
            User.getAsset().then((data) => {
                this.asset = data;
            });
        },
        loadMyInfo: function () {
            getMyInfo().then((res) => {
                this.isSuperAuthor = !!res.sign;
            });
        },
        onAssetsHover: function () {
            this.showAssets = true;
        },
        onAssetsBlur: function () {
            this.showAssets = false;
        },
        copyText,

        // 初始化
        init: function () {
            if (this.isLogin) {
                this.isEditor = User.isEditor();
                this.isAdmin = User.isAdmin();
                this.checkMSG();
                this.loadPanel();
                this.loadAsset();
                this.loadMyInfo();
                this.signIn();
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
