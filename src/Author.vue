<template>
    <div class="c-author" v-if="data">
        <div class="u-author">
            <Avatar
                class="u-avatar"
                :id="id"
                :url="data.avatar"
                :size="68"
                :frame="data.avatar_frame"
            />
            <a class="u-name" :href="id | authorLink">
                <span>{{ data.name }}</span>
            </a>
        </div>
        <div class="u-bio">{{ data.bio }}</div>
        <div class="u-link" v-if="hasLink">
            <a v-if="data.weibo_name" class="u-weibo" :href="data.weibo_url" target="_blank">
                <img svg-inline src="../assets/img/author/weibo.svg" />
                {{ data.weibo_name }}
            </a>
            <a v-if="data.github_name" class="u-github" :href="data.github_url" target="_blank">
                <img svg-inline src="../assets/img/author/github.svg" />
                {{ data.github_name }}
            </a>
            <div v-if="data.tuilan_id" class="u-tuilan" title="推栏ID">
                <img src="../assets/img/author/tuilan.png" />
                {{ data.tuilan_id }}
            </div>
            <a v-if="data.tv_type && data.tv_id" class="u-tv" :href="tv_link" target="_blank">
                <img :src="tv_img" />
                {{ data.tv_id }}
                <span class="u-tv-living" v-if="tv_status">
                    <div class="u-tv-living-icon">
                        <div class="u-tv-living-icon-col first"></div>
                        <div class="u-tv-living-icon-col"></div>
                        <div class="u-tv-living-icon-col last"></div>
                    </div>
                </span>
            </a>
        </div>
        <div class="u-trophy" v-if="hasTrophy">
            <div class="u-label">
                <i class="el-icon-trophy"></i>
                <span>作者荣誉</span>
            </div>
            <div class="u-medals" v-if="medals && medals.length">
                <span class="u-medal" v-for="(item, i) in medals" :key="i">
                    <img :src="item.medal | showTeamMedal" :title="medal_map[item.medal]" />
                </span>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
const liveStatusMap = ["等待开播", "直播中", "直播结束"];
import Avatar from "./Avatar.vue";
import { authorLink, tvLink } from "@jx3box/jx3box-common/js/utils";
import { __server, __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { getUserOverview, getDouyu, getUserMedals } from "../service/author";
import { user as medal_map } from "@jx3box/jx3box-common/data/medals.json";
export default {
    name: "Author",
    props: ["uid"],
    data: function () {
        return {
            data: "",
            tv: "",
            medals: [],
            medal_map,
        };
    },
    computed: {
        id: function () {
            return this.uid;
        },
        tv_type: function () {
            return this.data && this.data.tv_type;
        },
        tv_id: function () {
            return (this.data && this.data.tv_id) || 0;
        },
        tv_img: function () {
            return __imgPath + "image/tv/" + this.tv_type + ".png";
        },
        tv_link: function () {
            return tvLink(this.tv_type, this.tv_id) || "";
        },
        tv_status: function () {
            return (this.tv && this.tv.show_status == 1) || false;
        },
        hasLink: function () {
            return (
                this.data.weibo_name ||
                this.data.github_name ||
                this.data.tuilan_id ||
                this.data.tv_id
            );
        },
        hasTrophy: function () {
            return this.medals.length;
        },
    },
    filters: {
        showTeamMedal: function (val) {
            return __imgPath + "image/medals/team/" + val + "-20.gif";
        },
        authorLink,
    },
    methods: {
        loadData: function () {
            return getUserOverview(this.id).then((res) => {
                this.data = res.data.data;
            });
        },
        loadTV: function () {
            if (this.tv_type == "douyu") {
                if (!this.tv_id || isNaN(this.tv_id)) return;
                getDouyu(this.tv_id).then((res) => {
                    this.tv = res.data.data;
                });
            }
        },
        loadMedals: function () {
            if (!this.id) return;
            getUserMedals(this.id).then((res) => {
                this.medals = res.data.data;
            });
        },
    },
    watch: {
        uid: function () {
            this.loadData();
        },
    },
    mounted: function () {
        this.loadData().then(() => {
            // this.loadTV();
            this.loadMedals();
        });
    },
    components: {
        Avatar,
    },
};
</script>

<style lang="less">
@import "../assets/css/author.less";
</style>
