<template>
    <div class="w-rss" @click="onRssClick">
        <el-tooltip effect="dark" :content="tooltipContent" placement="top-start">
            <div>
                <img v-if="subscribed" class="u-icon" svg-inline :src="rmSrc" />
                <img v-else class="u-icon" svg-inline :src="addSrc" />
                <span class="u-count" v-if="!hiddenNum && total > 0">{{ total }}</span>
            </div>
        </el-tooltip>
    </div>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
import { __cdn } from "@jx3box/jx3box-common/data/jx3box.json";
import {
    getCommunityRss,
    getWikiRss,
    getPostRss,
    subscribeCommunity,
    subscribePost,
    subscribeWiki,
    unsubscribeWiki,
    unsubscribeCommunity,
    unsubscribePost,
} from "@jx3box/jx3box-common/js/rss";
import { omit } from "lodash";
import { __postType, __wikiType } from "@jx3box/jx3box-common/data/jx3box.json";

export default {
    name: "Rss",
    props: {
        type: {
            type: String,
            default: "", // community, cj, bps,
        },
        id: {
            type: [String, Number],
            default: "",
        },
        hiddenNum: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            subscribed: false,
            total: 0,
        };
    },
    computed: {
        tooltipContent() {
            return this.subscribed ? "已订阅" : "加入订阅";
        },
        addSrc() {
            return __cdn + "design/vector/icon/rss.svg";
        },
        rmSrc() {
            return __cdn + "design/vector/icon/unrss.svg";
        },
        category({ type }) {
            if (type.includes("community")) return "community";
            if (__postType[type]) return "posts";
            if (__wikiType[type]) return "wiki";
            return "";
        },
        getRssFn({ category }) {
            if (category === "community") return getCommunityRss;
            if (category === "posts") return getPostRss;
            if (category === "wiki") return getWikiRss;
            return null;
        },
        subscribeFn({ category }) {
            if (category === "community") return subscribeCommunity;
            if (category === "posts") return subscribePost;
            if (category === "wiki") return subscribeWiki;
            return null;
        },
        unsubscribeFn({ category }) {
            if (category === "community") return unsubscribeCommunity;
            if (category === "posts") return unsubscribePost;
            if (category === "wiki") return unsubscribeWiki;
            return null;
        },
        params() {
            return {
                type: this.type,
                id: this.id,
                data: {
                    title: this.title
                }
            }
        },
        isLogin() {
            return User.isLogin();
        },
    },
    watch: {
        params: {
            deep: true,
            immediate: true,
            handler(val) {
                if (this.isLogin && val?.id) {
                    this.checkSubscribed();
                }
            }
        }
    },
    methods: {
        onRssClick() {
            if (!this.isLogin) {
                User.toLogin();
                return;
            }
            if (this.subscribed) {
                this.unsubscribe();
            } else {
                this.subscribe();
            }
        },
        checkSubscribed() {
            this.getRssFn && this.getRssFn(this.params).then((res) => {
                this.subscribed = res.data.data.subscribed;
                this.total = res.data.data.total;
            });
        },
        subscribe() {
            this.subscribeFn && this.subscribeFn(this.params).then((res) => {
                this.subscribed = true;
                this.total++;
            });
        },
        unsubscribe() {
            this.unsubscribeFn && this.unsubscribeFn(this.params).then((res) => {
                this.subscribed = false;
                this.total--;
            });
        },
    },
};
</script>

<style lang="less">
.w-rss {
    .pointer;
    .dbi;
    .u-icon {
        .size(26px);
        .y;
        .pr;
    }
    .u-count {
        color: #888;
        .ml(10px);
        top: 4px;
        .pr;
    }
}
</style>
