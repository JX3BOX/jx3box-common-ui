<template>
    <div class="c-author" v-if="data">
        <div class="u-author">
            <a :href="link" class="u-avatar">
                <img class="u-avatar-pic" :src="data.avatar | avatar" :alt="data.name" />
                <i class="u-avatar-frame" v-if="data.avatar_frame"><img :src="data.avatar_frame | showFrame"></i>
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
import {
    showAvatar,
    authorLink,
    getTVlink,
} from "@jx3box/jx3box-common/js/utils";
import { __server, __imgPath } from "@jx3box/jx3box-common/js/jx3box.json";
import { getUserOverview, getDouyu, getUserMedals } from "../service/author";
import { user as medal_map } from "@jx3box/jx3box-common/data/medals.json";
import frames from "@jx3box/jx3box-data/data/box/user_avatar_frame.json";
export default {
    name: "Author",
    props: ["uid"],
    data: function() {
        return {
            data: "",
            tv: "",
            medals: [],
            medal_map,
            frames
        };
    },
    computed: {
        id: function() {
            return this.uid;
        },
        link: function() {
            return authorLink(this.id);
        },
        tv_link: function() {
            return getTVlink(this.data.tv_type, this.data.tv_id) || "";
        },
        tv_img: function() {
            return __imgPath + "image/tv/" + this.data.tv_type + ".png";
        },
        tv_id: function() {
            return this.data.tv_id || 0;
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
    },
    filters: {
        avatar: function(val) {
            return showAvatar(val);
        },
        showTeamMedal: function(val) {
            return __imgPath + "image/medals/team/" + val + "-20.gif";
        },
        showFrame: function(name) {
            // name = name || 'default'
            let filename = frames[name].files.s.file
            return __imgPath + `image/avatar/${name}/${filename}`;
        },
    },
    methods: {
        loadData: function() {
            return getUserOverview(this.id).then((res) => {
                this.data = res.data.data;
            });
        },
        loadTV: function() {
            if (this.data.tv_type == "douyu") {
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
    },
    watch: {
        author: function(newdata) {
            this.data = newdata;
            this.$forceUpdate();
        },
        uid: function() {
            this.loadData();
        },
        tv_id: function(val) {
            this.loadTV();
        },
        id: function() {
            this.loadMedals();
        },
    },
    mounted: function() {
        if (this.author) {
            this.data = this.author;
            this.loadTV();
            this.loadMedals();
        } else if (this.uid) {
            this.loadData().then(() => {
                this.loadTV();
                this.loadMedals();
            });
        }
    },
};
</script>

<style lang="less">
@import "../assets/css/author.less";
</style>
