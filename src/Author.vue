<template>
    <div class="c-author" v-if="data">
        <div class="u-author">
            <Avatar class="u-avatar" :uid="uid" :url="data.user_avatar" :size="68" :frame="data.user_avatar_frame" />
            <div class="u-info">
                <a class="u-name" :href="authorLink(uid)" target="_blank">
                    <span>{{ data.display_name.slice(0, 8) }}</span>
                    <el-tooltip class="item" effect="dark" content="签约作者" placement="top" v-if="isSuperAuthor">
                        <a class="u-superauthor" href="/dashboard/#/cooperation" target="_blank">
                            <img :src="super_author_icon" alt="superauthor" />
                        </a>
                    </el-tooltip>
                </a>
                <div class="u-extend">
                    <el-tooltip class="item" effect="dark" placement="top">
                        <div slot="content">
                            <span class="u-tips">经验值：{{ data.experience }}</span>
                        </div>
                        <span class="u-level" :class="'lv-' + level" :style={backgroundColor:showLevelColor(level)}>Lv.{{ level }}</span>
                    </el-tooltip>
                    <el-tooltip class="item" effect="dark" :content="vipTypeTitle" placement="top" v-if="isVip">
                        <a class="u-vip" href="/vip/premium?from=sidebar_author" target="_blank">
                            <i class="i-icon-vip on">{{ vipType }}</i>
                        </a>
                    </el-tooltip>
                </div>
            </div>
        </div>
        <div class="u-bio">{{ data.user_bio }}</div>
        <AuthorFollow v-if="isLogin" class="u-follow-box" :uid="uid" />
        <div class="u-link" v-if="hasLink">
            <a v-if="data.weibo_name" class="u-weibo" :href="weiboLink(data.weibo_id)" target="_blank">
                <img svg-inline src="../assets/img/author/weibo.svg" />
                {{ data.weibo_name }}
            </a>
            <a v-if="data.github_name" class="u-github" :href="githubLink(data.github_name)" target="_blank">
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
        <slot></slot>
        <div class="u-trophy" v-if="hasTrophy">
            <div class="u-label">
                <i class="el-icon-trophy"></i>
                <span>作者荣誉</span>
            </div>
            <div class="u-medals" v-if="medals && medals.length">
                <!-- <span class="u-medal" v-for="(item, i) in medals" :key="i">
                    <img :src="showMedalIcon(item.medal)" :title="showMedalDesc(item)" />
                </span> -->
                <medal :medals="medals" :showIcon="showMedalIcon"></medal>
            </div>
        </div>
        <div class="u-teams" v-if="teams && teams.length">
            <div class="u-label">
                <i class="el-icon-school"></i>
                <span>所属团队</span>
            </div>
            <a class="u-team" v-for="(item, i) in teams" :key="i" :href="teamLink(item.team_id)" target="_blank">
                <img class="u-team-logo" :src="showTeamLogo(item.team_logo)" />
                <span class="u-team-name">{{ item.team_name }}@{{ item.team_server }}</span>
            </a>
        </div>
        <Authorposts :uid="uid" />
    </div>
</template>

<script>
// const liveStatusMap = ["等待开播", "直播中", "直播结束"];
import { authorLink, tvLink, getLink, getThumbnail } from "@jx3box/jx3box-common/js/utils";
import { __server, __imgPath,__userLevelColor } from "@jx3box/jx3box-common/data/jx3box.json";
import { getUserInfo, getDouyu, getUserMedals, getUserPublicTeams } from "../service/author";
import { user as medal_map } from "@jx3box/jx3box-common/data/medals.json";
import User from "@jx3box/jx3box-common/js/user";
import { __userLevel } from "@jx3box/jx3box-common/data/jx3box.json";
// components
import medal from './medal/medal.vue'
import Avatar from "./author/Avatar.vue";
import Authorposts from "./author/Authorposts.vue";
import AuthorFollow from "./author/AuthorFollow.vue";
export default {
    name: "Author",
    props: ["uid"],
    data: function() {
        return {
            data: "",
            tv: "",
            medals: [],
            medal_map,
            teams: [
                // {
                //     team_name : '诗画印象',
                //     team_logo : 'https://oss.jx3box.com/2019/09/logo.png',
                //     team_server : "蝶恋花"
                // }
            ],
            isVIP: false,
        };
    },
    computed: {
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
        super_author_icon: function() {
            return __imgPath + "image/user/" + "superauthor.svg";
        },
        hasLink: function() {
            return this.data.weibo_name || this.data.github_name || this.data.tuilan_id || this.data.tv_id;
        },
        hasTrophy: function() {
            return this.medals.length;
        },
        vipType: function() {
            return this.data?.is_pro ? "PRO" : "PRE";
        },
        vipTypeTitle: function() {
            return this.data?.is_pro ? "专业版会员" : "高级版会员";
        },
        isVip: function() {
            return this.data?.is_pro || this.data?.is_pre;
        },
        isSuperAuthor: function() {
            return this.data?.sign;
        },
        level: function() {
            return User.getLevel(this.data?.experience);
        },
        isLogin: function() {
            return User.isLogin();
        },
    },
    methods: {
        loadData: function() {
            return getUserInfo(this.uid)
                .then((data) => {
                    this.data = data;
                })
                .then(() => {
                    this.loadMedals();
                    this.loadTeams();
                });
        },
        loadTV: function() {
            if (this.tv_type == "douyu") {
                if (!this.tv_id || isNaN(this.tv_id)) return;
                getDouyu(this.tv_id).then((data) => {
                    this.tv = data;
                });
            }
        },
        loadMedals: function() {
            getUserMedals(this.uid).then((data) => {
                this.medals = data;
            });
        },
        loadTeams: function() {
            getUserPublicTeams(this.uid).then((data) => {
                this.teams = data && data.slice(0, 5);
            });
        },

        // filters
        showMedalIcon: function(val) {
            return __imgPath + "image/medals/user/" + val + ".gif";
        },
        showMedalDesc: function(item) {
            return item.medal_desc || medal_map[item.medal];
        },
        authorLink,
        weiboLink: function(val) {
            return "https://weibo.com/" + val;
        },
        githubLink: function(val) {
            return "https://github.com/" + val;
        },
        teamLink: function(team_id) {
            return getLink("org", team_id);
        },
        showTeamLogo: function(val) {
            return getThumbnail(val, 96);
        },
        showLevelColor:function (level){
            return __userLevelColor[level]
        }
    },
    watch: {
        uid: function() {
            this.loadData();
        },
    },
    mounted: function() {
        this.uid && this.loadData();
    },
    components: {
        Avatar,
        Authorposts,
        medal,
        AuthorFollow,
    },
};
</script>

<style lang="less">
@import "../assets/css/author.less";
</style>
