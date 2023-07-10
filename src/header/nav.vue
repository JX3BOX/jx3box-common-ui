<template>
    <nav class="c-header-nav" v-if="finalNav">
        <div class="c-header-nav__pc">
            <div class="u-item-box" v-for="item in finalNav" :key="'header-nav-' + item.key">
                <template v-if="item.status && matchedClient(item.client)">
                    <template v-if="item.children && item.children.length">
                        <el-dropdown class="u-menu" :show-timeout="0" trigger="hover">
                            <a
                                class="u-item el-dropdown-link"
                                :class="{ on: isFocus(item.link) }"
                                :href="item.link"
                                :target="isSelf(item.link)"
                                v-reporter="{
                                    data: {
                                        item: item.link,
                                    },
                                    caller: 'index_nav',
                                }"
                                >{{ item.label }}<i class="el-icon-arrow-down el-icon--right"></i
                            ></a>
                            <el-dropdown-menu slot="dropdown" class="c-header-menu">
                                <el-dropdown-item
                                    v-for="(subitem, subIndex) in item.children"
                                    :key="'header-nav-drop-' + subitem.key + subIndex"
                                    class="u-menu-item"
                                >
                                    <a
                                        :href="subitem.link"
                                        :target="isSelf(subitem.link)"
                                        v-reporter="{
                                            data: {
                                                item: subitem.link,
                                            },
                                            caller: 'index_nav',
                                        }"
                                        v-if="subitem.status && matchedClient(subitem.client)"
                                        >{{ subitem.label }} <span v-if="subitem.desc">{{ subitem.desc }}</span></a
                                    ></el-dropdown-item
                                >
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                    <template v-else>
                        <a
                            class="u-item"
                            :class="{ on: isFocus(item.link) }"
                            :href="item.link"
                            v-reporter="{
                                data: {
                                    item: item.link,
                                },
                                caller: 'index_nav',
                            }"
                            >{{ item.label }}</a
                        >
                    </template>
                </template>
            </div>
        </div>
        <div class="c-header-nav__pad">
            <el-menu mode="horizontal" class="c-quick-menu" v-model="activeIndex">
                <el-submenu index="quick-menu" popper-class="c-quick-menu__submenu">
                    <template slot="title">快捷导航</template>
                    <el-menu-item v-for="item in finalNav" :key="'header-nav-' + item.key">
                        <template v-if="matchedClient(item.client)">
                            <el-submenu
                                :index="item.key"
                                class="c-header-menu"
                                v-if="item.children && item.children.length"
                            >
                                <template slot="title">
                                    <a
                                        class="u-menu-item"
                                        :class="{ on: isFocus(item.link) }"
                                        :href="item.link"
                                        :target="isSelf(item.link)"
                                        v-reporter="{
                                            data: {
                                                item: item.link,
                                            },
                                            caller: 'index_nav',
                                        }"
                                        >{{ item.label }}</a
                                    ></template
                                >
                                <template v-for="(subitem, subIndex) in item.children">
                                    <el-menu-item
                                        v-if="matchedClient(subitem.client)"
                                        :key="'header-nav-drop-' + subitem.key + subIndex"
                                        :index="subitem.key"
                                    >
                                        <a
                                            class="u-menu-item"
                                            :href="subitem.link"
                                            :target="isSelf(subitem.link)"
                                            v-reporter="{
                                                data: {
                                                    item: subitem.link,
                                                },
                                                caller: 'index_nav',
                                            }"
                                            >{{ subitem.label }} <span v-if="subitem.desc">{{ subitem.desc }}</span>
                                        </a>
                                    </el-menu-item>
                                </template>
                            </el-submenu>
                            <el-menu-item v-else>
                                <a
                                    class="u-item"
                                    :class="{ on: isFocus(item.link) }"
                                    v-reporter="{
                                        data: {
                                            item: item.link,
                                        },
                                        caller: 'index_nav',
                                    }"
                                    :href="item.link"
                                    >{{ item.label }}</a
                                >
                            </el-menu-item>
                        </template>
                    </el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
    </nav>
</template>

<script>
import default_nav from "../../assets/data/nav.json";
import { getMenu } from "../../service/header";
export default {
    props: [],
    data: function () {
        return {
            nav: default_nav,

            activeIndex: "",
        };
    },
    computed: {
        finalNav: function ({ nav }) {
            // 父节点
            const finalNav = nav.filter((d) => !d.parentKey && d.status);
            // 子节点
            const navChildren = nav.filter((c) => c.parentKey && c.status);

            navChildren.forEach((child) => {
                const parentKey = child.parentKey;
                // 匹配客户端
                const parent = finalNav.find((n) => n.key === parentKey);

                if (parent) {
                    if (!parent.children) {
                        parent.children = [];
                    }
                    parent.children.push(child);
                }
            });

            return finalNav;
        },
        client() {
            return location.href.includes("origin") ? "origin" : "std";
        },
    },
    methods: {
        isFocus: function (type) {
            return location.pathname.includes(type);
        },
        matchedClient: function (client) {
            return client == "all" ? true : client == this.client;
        },
        isSelf: function (link) {
            return link.startsWith("/") ? "_self" : "_blank";
        },
        loadNav() {
            try {
                const nav = (sessionStorage.getItem("nav") && JSON.parse(sessionStorage.getItem("nav"))) || null;
                if (nav) {
                    this.nav = nav;
                } else {
                    getMenu("nav").then((res) => {
                        if (res.data) {
                            this.nav = res?.data?.data?.val;
                            sessionStorage.setItem("nav", JSON.stringify(this.nav));
                        }
                    });
                }
            } catch (e) {
                this.nav = default_nav;
                console.log("loadNav error", e);
            }
        },
    },
    created: function () {
        this.loadNav();
    },
    components: {},
};
</script>

<style lang="less">
//菜单
.c-header-nav {
    .fl;
    font-family: Montserrat, "Helvetica Neue", sans-serif;
    .clearfix;
    .u-item-box {
        .fl;
    }
    .u-item {
        .pointer;
        display: block;
        font-size: 14px;
        line-height: @logo-size;
        color: #fff;
        // font-weight:300;
        &:hover {
            background-color: darken(@primary, 10%);
        }
        &.on {
            // background-color: @primary;
            .pr;
            &:after {
                content: "";
                .db;
                border-bottom: 3px solid @primary;
                .pa;
                .lb(0);
                .w(100%);
            }
            &:hover {
                background-color: @primary;
            }
        }
        padding: 16px 15px;
        transition: 0.1s ease-in;
        i {
            .none;
        }
    }
    .u-menu {
        .fl;
        .el-icon-arrow-down {
            .fz(12px);
            color: #8e8e8e;
        }
    }
}
.c-header-menu {
    .h(auto) !important;
    .u-menu-item {
        padding: 0;
        a {
            color: @color;
            line-height: 16px;
            padding: 10px 30px;
            .db;
            span {
                .fz(12px);
                color: #999;
            }
        }
    }
    .mt(0px) !important;
}

.c-header-nav__pad {
    .c-quick-menu {
        background: #24292e;
    }
    .el-submenu__title {
        color: #fff !important;
        i {
            color: #fff;
        }
        &:hover {
            background: #0366d6 !important;
        }
        height: 64px !important;
    }
}
.c-quick-menu__submenu {
    .el-menu {
        min-width: 150px;
    }
    .u-menu-item,
    .u-item {
        display: block;
        color: @color;
    }
    .el-menu-item {
        min-width: 150px;
        &:hover {
            background-color: #e6f0fb;

            .el-submenu__title {
                background-color: #e6f0fb;
            }
        }
    }
    // .el-menu--horizontal {
    //     .el-menu-item {
    //         text-align: center;
    //     }
    // }
}
.c-header-nav__pad {
    .none;
    .c-quick-menu {
        border-bottom: none;
    }
}
@media screen and (max-width: @ipad) {
    .c-header-nav__pc {
        display: none;
    }
    .c-header-nav__pad {
        display: block;
    }
}

@media screen and (max-width: @ipad-y) {
    .c-header-nav__pad {
        display: none;
    }
}
</style>
