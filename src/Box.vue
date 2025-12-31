<template>
    <div class="c-jx3box" :class="{ on: status, isOverlay: overlayEnable && isOverlay }">
        <!-- search -->
        <header-search @click.native.stop />

        <!-- list -->
        <ul class="u-list">
            <li>
                <a
                    class="u-item"
                    href="/index"
                    v-reporter="{
                        data: {
                            item: `${prefix}:/index`,
                        },
                        caller: 'index_nav_matrix',
                    }"
                >
                    <img class="u-pic" svg-inline :src="homeicon" />
                    <img class="u-pic-hover" svg-inline :src="homeicon" />
                    <span class="u-txt">首页</span>
                </a>
            </li>
            <li v-for="(item, i) in list" :key="i" :class="{ 'u-app-start': item.lf }">
                <a
                    class="u-item"
                    :href="item.href"
                    :target="getTarget(item.href)"
                    v-reporter="{
                        data: {
                            item: trimSlash(item.href),
                        },
                        caller: 'index_nav_matrix',
                    }"
                >
                    <img class="u-pic" :src="getBoxIcon(item.img)" />
                    <!-- <img class="u-pic-hover" svg-inline :src="item.hover | getBoxIcon" /> -->
                    <span class="u-txt">{{ item.abbr }}</span>
                </a>
            </li>
        </ul>
        <span class="u-close" @click="closeBox($event)">
            <i class="el-icon-upload2"></i>
            <span>收起</span>
        </span>
    </div>
</template>

<script>
import search from "./header/search.vue";
import _ from "lodash";
import Bus from "../service/bus";
import { __imgPath, __cdn } from "@jx3box/jx3box-common/data/jx3box.json";
import box from "../assets/data/box.json";
import { getMenu } from "../service/header.js";
import { trimSlash } from "../assets/js/utils";
export default {
    name: "Box",
    props: ["overlayEnable"],
    data: function () {
        return {
            status: false,
            isOverlay: false,
            data: box,
            client: location.href.includes("origin") ? "origin" : "std",
        };
    },
    computed: {
        homeicon: function () {
            return __imgPath + "image/box/home.svg";
        },
        homeicon_hover: function () {
            return __imgPath + "image/box/home_on.svg";
        },
        originicon: function () {
            return __imgPath + "image/box/origin.svg";
        },
        list: function () {
            return this.data.filter((item, i) => {
                return item.status && (item.client == this.client || item.client == "all");
            });
        },
        prefix: function (){
            return this.client === 'std' ? 'www' : 'origin';
        }
    },
    methods: {
        closeBox: function () {
            Bus.$emit("toggleBox", false);
        },
        matchedClient: function (client) {
            return client == "all" ? true : client == this.client;
        },
        getBoxIcon: function (val) {
            val = val && val?.replace(".png", ".svg");
            let web_url = __cdn + "logo/logo-light/" + val;
            return web_url;
        },
        getTarget: function (val) {
            if (window.innerWidth < 768 || val?.startsWith("/")) {
                return "_self";
            } else {
                return "_blank";
            }
        },
        loadMenu() {
            try {
                const _box = JSON.parse(sessionStorage.getItem("box"));
                if (_box) {
                    this.data = _box;
                } else {
                    getMenu("box").then((res) => {
                        this.data = res.data?.data?.val;
                        sessionStorage.setItem("box", JSON.stringify(this.data));
                    });
                }
            } catch (e) {
                this.data = box;
                console.log("loadBox error", e);
            }
        },
        trimSlash(link) {
            return trimSlash(`${this.prefix}:${link}`);
        },
    },
    created: function () {
        if (this.overlayEnable) {
            const vm = this;
            window.addEventListener(
                "scroll",
                _.throttle(() => {
                    vm.isOverlay = window.scrollY > 200 ? true : false;
                }, 200)
            );
        }
        this.loadMenu();
    },
    mounted: function () {
        Bus.$on("toggleBox", (status) => {
            if (status == undefined) {
                this.status = !this.status;
            } else {
                this.status = status;
            }
        });
        document.addEventListener("click", function () {
            Bus.$emit("toggleBox", false);
        });
    },
    components: {
        "header-search": search,
    },
};
</script>

<style lang="less">
@import "../assets/css/box.less";
</style>

<style scoped lang="less">
.c-jx3box {
    .c-header-search {
        float: none;
        .w(auto);
        margin: 0 20px 10px 20px;
        box-sizing: border-box;
        padding: 0;
        .none;
    }
}
@media screen and (max-width: @phone) {
    .c-jx3box .c-header-search {
        .db;
    }
}
</style>
