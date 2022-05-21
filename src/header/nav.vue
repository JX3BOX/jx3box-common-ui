<template>
    <nav class="c-header-nav" v-if="finalNav">
        <div class="u-item-box" v-for="item in finalNav" :key="'header-nav-' + item.key">
            <template v-if="item.status && matchedClient(item.client)">
                <template
                    v-if="item.children && item.children.length"
                >
                    <el-dropdown class="u-menu" :show-timeout="0" trigger="hover">
                        <a
                            class="u-item el-dropdown-link"
                            :class="{ on: isFocus(item.link) }"
                            :href="item.link"
                            :target="isSelf(item.link)"
                            >{{ item.label
                            }}<i class="el-icon-arrow-down el-icon--right"></i
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
                                    v-if="
                                        subitem.status &&
                                        matchedClient(subitem.client)
                                    "
                                    >{{ subitem.label }}
                                    <span v-if="subitem.desc">{{
                                        subitem.desc
                                    }}</span></a
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
                        >{{ item.label }}</a
                    >
                </template>
            </template>
        </div>
    </nav>
</template>

<script>
import default_nav from '../../assets/data/nav.json'
import { getMenu } from "../../service/header";
export default {
    props: [],
    data: function () {
        return {
            nav: default_nav
        };
    },
    computed: {
        finalNav: function ({ nav }) {
            // 父节点
            const finalNav = nav.filter((d) => !d.parentKey);
            // 子节点
            const navChildren = nav.filter((c) => c.parentKey);

            navChildren.forEach((child) => {
                const parentKey = child.parentKey;
                // 匹配客户端
                const parent = finalNav.find((n) => n.key === parentKey)

                if (parent) {
                    if (!parent.children) {
                        parent.children = [];
                    }
                    parent.children.push(child);
                }
            });

            return finalNav
        },
        client() {
            return location.href.includes("origin") ? "origin" : "std"
        }
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
                const nav = JSON.parse(sessionStorage.getItem("nav"));
                if (nav) {
                    this.nav = nav;
                } else {
                    getMenu("nav").then((res) => {
                        if (res.data) {
                            this.nav = res?.data?.data?.val
                            sessionStorage.setItem("nav", JSON.stringify(this.nav));
                        }
                    });
                }
            } catch (e) {
                this.nav = default_nav;
                console.log('loadNav error', e);
            }
        }
    },
    created: function () {

    },
    components: {},
};
</script>
