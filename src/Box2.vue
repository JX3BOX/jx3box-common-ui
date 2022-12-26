<template>
    <div class="c-jx3box" :class="{ on: status, isOverlay: overlayEnable && isOverlay }">
        <!-- search -->
        <header-search @click.native.stop />

        <!-- list -->
        <div class="u-list">
            <div class="u-list__item" v-for="(value, index) in data" :key="index">
                <div class="u-group">
                    <img  class="u-group-icon" :src="homeicon_hover" alt="">
                    <span class="u-group-name">{{ value.name }}</span>
                </div>

                <div class="u-content">
                    <div class="u-content__item" v-for="(item, i) in value.children" :key="i">
                        <template v-if="item.children">
                            <div class="u-subtitle">{{ item.name }}</div>
                            <a
                                v-for="child in item.children"
                                :key="child.name"
                                class="u-link"
                                :href="child.href"
                                :target="getTarget(child.href)"
                                :class="{ 'not-client': !matchedClient(child.client) }"
                            >
                                <span class="u-txt">{{ child.name }}</span>
                            </a>
                        </template>
                        <a v-else class="u-link" :href="item.href" :class="{ 'not-client': !matchedClient(item.client) }" :target="getTarget(item.href)">
                            <span class="u-txt">{{ item.name }}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
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
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import box from "../assets/data/box2.json";
import { getMenu } from "../service/header.js";
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
    },
    methods: {
        closeBox: function () {
            Bus.$emit("toggleBox", false);
        },
        matchedClient: function (client) {
            return client == "all" ? true : client == this.client;
        },
        getBoxIcon: function (val) {
            return __imgPath + "image/box/" + val;
        },
        getTarget: function (val) {
            if (window.innerWidth < 768 || val?.startsWith("/")) {
                return "_self";
            } else {
                return "_blank";
            }
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
.c-header-search {
    float: none;
    .w(auto);
    margin: 0 20px 10px 20px;
    box-sizing: border-box;
    padding: 0;
    .none;
}

.u-list {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 450px;
    padding: 20px;
}

.u-list__item {
    .mb(10px);
    .ml(18px);
}

.u-group {
    margin-bottom: 5px;
    .pr;
}

.u-group-icon {
    .size(18px, 18px);
    .pa;
    left: -25px;
}

.u-subtitle {
    font-size: 12px;
}

.u-link {
    .u-txt {
        font-size: 14px;
        color: #fff;
    }

    &.not-client {
        .none;
    }
}
@media screen and (max-width: @ipad-y) {
    .c-header-search {
        .db;
    }
}
</style>
