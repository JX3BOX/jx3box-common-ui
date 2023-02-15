<template>
    <div class="c-header-panel c-header-info">
        <div class="c-header-profile" id="c-header-profile">
            <img class="u-avatar" :src="user.avatar" />
            <template v-if="isPhone">
                <ul class="u-menu u-pop-content">
                    <li>
                        <a href="/dashboard">个人中心</a>
                    </li>
                    <li>
                        <a :href="url.msg">消息中心</a>
                    </li>
                    <li>
                        <a :href="url.publish">发布中心</a>
                    </li>
                    <hr />
                    <li v-if="isAdmin">
                        <a href="/admin">站点配置</a>
                    </li>
                    <li v-if="isEditor">
                        <a href="https://os.jx3box.com/admin">管理平台</a>
                    </li>
                    <li>
                        <a @click="logout">退出登录</a>
                    </li>
                </ul>
            </template>
            <template v-else>
                <div class="c-header-userdata u-pop-content">
                    <div class="u-profile">
                        <div class="u-basic">
                            <a class="u-displayname" :href="url.homepage" :title="user.name" target="_blank">{{
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
                        <a class="el-button el-button--default is-plain" href="/dashboard">个人中心</a>
                        <a class="el-button el-button--default is-plain" :href="url.profile">资料设置</a>
                        <a class="el-button el-button--default is-plain" href="/dashboard/frame">主题风格</a>
                    </el-button-group>

                    <div class="u-other">
                        <a href="/dashboard/fav" class="u-item"><i class="el-icon-star-off"></i>收藏订阅 </a>
                        <a href="/team/role/manage" class="u-item"><i class="el-icon-user"></i>角色管理 </a>
                        <a href="/dashboard/purchases" class="u-item"
                            ><i class="el-icon-shopping-cart-2"></i>已购资源
                        </a>
                        <a href="/dashboard/mall" class="u-item"><i class="el-icon-shopping-bag-1"></i>订单中心 </a>
                        <hr />
                        <a href="/dashboard/feedback" class="u-item"><i class="el-icon-phone-outline"></i>反馈帮助 </a>
                        <hr />
                        <div class="u-logout">
                            <el-button @click="logout" size="small" plain>退出登录</el-button>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
import { getMyInfo } from "../../service/author";
import { __Links, __Root, __imgPath, __OriginRoot } from "@jx3box/jx3box-common/data/jx3box.json";
import { copyText } from "../../assets/js/utils";
export default {
    name: "info",
    props: ['asset'],
    data() {
        return {
            isPhone: window.innerWidth < 768,
            // 登录信息
            user: User.getInfo(),
            // links
            url: {
                msg: __Links.dashboard.msg,
                publish: __Links.dashboard.publish,
                dashboard: __Links.dashboard.home,
                profile: __Links.dashboard.profile,
                homepage: "/author/" + User.getInfo().uid,
            },

            isSuperAuthor: false,
        }
    },
    computed: {
        siteRoot: function () {
            return location.host.includes("origin") ? __OriginRoot : __Root;
        },
        super_author_icon: function () {
            return __imgPath + "image/user/" + "superauthor.svg";
        },
        vipType: function () {
            return "PRO";
        },
        isPRO: function () {
            return User._isPRO(this.asset) || false;
        },
        isAdmin() {
            return User.isAdmin()
        },
        isEditor() {
            return User.isEditor()
        },
    },
    mounted() {
        this.loadMyInfo();
    },
    methods: {
        copyText,
        logout: function () {
            User.destroy()
                .then((res) => {
                    this.$emit('logout')
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
        showUserName: function (val) {
            return val || "匿名";
        },
        loadMyInfo: function () {
            getMyInfo().then((res) => {
                this.isSuperAuthor = !!res.sign;
            });
        },
    }
}
</script>
