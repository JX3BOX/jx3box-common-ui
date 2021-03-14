<template>
    <div class="c-author" v-if="data">
        <div class="u-author">
            <a :href="link" class="u-avatar">
                <img
                    class="u-avatar-pic"
                    :src="data.avatar | avatar"
                    :alt="data.name"
                    :class="{ isCircle }"
                />
                <i class="u-avatar-frame" v-if="frameName"
                    ><img :src="frameUrl"
                /></i>
            </a>
            <a class="u-name" :href="link">
                <span>{{ data.name }}</span>
            </a>
        </div>
        <div class="u-bio">{{ data.bio }}</div>
        <div class="u-link" v-if="hasLink">
            <a
                v-if="data.weibo_name"
                class="u-weibo"
                :href="data.weibo_url"
                target="_blank"
            >
                <img svg-inline src="../assets/img/author/weibo.svg" />
                {{ data.weibo_name }}
            </a>
            <a
                v-if="data.github_name"
                class="u-github"
                :href="data.github_url"
                target="_blank"
            >
                <img svg-inline src="../assets/img/author/github.svg" />
                {{ data.github_name }}
            </a>
            <div v-if="data.tuilan_id" class="u-tuilan" title="推栏ID">
                <img src="../assets/img/author/tuilan.png" />
                {{ data.tuilan_id }}
            </div>
            <a
                v-if="data.tv_type && data.tv_id"
                class="u-tv"
                :href="tv_link"
                target="_blank"
            >
                <img :src="tv_img" />
                <span class="u-tv-num">
                    {{ data.tv_id }}
                </span>
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
                    <img
                        :src="item.medal | showTeamMedal"
                        :title="medal_map[item.medal]"
                    />
                </span>
            </div>
        </div>
        <slot></slot>
    </div>
</template>

<script>
const liveStatusMap = ["等待开播", "直播中", "直播结束"];
import { showAvatar, authorLink, tvLink } from "@jx3box/jx3box-common/js/utils";
import { __server, __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import {
    getUserOverview,
    getDouyu,
    getUserMedals,
    getFrames,
} from "../service/author";
import { user as medal_map } from "@jx3box/jx3box-common/data/medals.json";
import frames from "@jx3box/jx3box-common/data/user_avatar_frame.json";
export default {
    name: "Author",
    props: ["uid"],
    data: function() {
        return {
            data: "",
            tv: "",
            medals: [],
            medal_map,
            frames,
        };
    },
    computed: {
        id: function() {
            return this.uid;
        },
        link: function() {
            return authorLink(this.id);
        },
        tv_type: function() {
            return this.data && this.data.tv_type;
        },
        tv_id: function() {
            return (this.data && this.data.tv_id) || 0;
        },
        tv_img: function() {
            return __imgPath + "image/tv/" + this.tv_type + ".png";
        },
        tv_link: function() {
            return tvLink(this.tv_type, this.tv_id) || "";
        },
        tv_status: function() {
            return (this.tv && this.tv.show_status == 1) || false;
        },
        hasLink: function() {
            return (
                this.data.weibo_name ||
                this.data.github_name ||
                this.data.tuilan_id ||
                this.data.tv_id
            );
        },
        hasTrophy: function() {
            return this.medals.length;
        },
        frameName: function() {
            return this.data.avatar_frame && this.frames[this.data.avatar_frame]
                ? this.data.avatar_frame
                : "";
        },
        frameUrl: function() {
            if (this.frameName) {
                let fileName = this.frames[this.frameName].files.s.file;
                return __imgPath + `image/avatar/${this.frameName}/${fileName}`;
            }
            return "";
        },
        isCircle: function() {
            return (
                this.frameName && this.frames[this.frameName].style == "circle"
            );
        },
    },
    filters: {
        avatar: function(val) {
            return showAvatar(val);
        },
        showTeamMedal: function(val) {
            return __imgPath + "image/medals/team/" + val + "-20.gif";
        },
    },
    methods: {
        loadData: function() {
            return getUserOverview(this.id).then((res) => {
                this.data = res.data.data;
            });
        },
        loadTV: function() {
            if (this.tv_type == "douyu") {
                if (!this.tv_id || isNaN(this.tv_id)) return;
                getDouyu(this.tv_id).then((res) => {
                    this.tv = res.data.data;
                });
            }
        },
        loadMedals: function() {
            if (!this.id) return;
            getUserMedals(this.id).then((res) => {
                this.medals = res.data.data;
            });
        },
        loadFrames: function() {
            getFrames().then((res) => {
                if (res.data) {
                    this.frames = res.data;
                }
            });
        },
    },
    watch: {
        uid: function() {
            this.loadData();
        },
    },
    mounted: function() {
        this.loadData().then(() => {
            // this.loadTV();
            this.loadMedals();
            this.loadFrames();
        });
    },
};
</script>

<style lang="less">
@import "../assets/css/author.less";
</style>
