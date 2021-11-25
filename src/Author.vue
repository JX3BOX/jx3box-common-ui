<template>
    <div class="c-author" v-if="data">
        <div class="u-author">
            <Avatar
                class="u-avatar"
                :id="id"
                :url="data.user_avatar"
                :size="68"
                :frame="data.user_avatar_frame"
            />
            <a class="u-name" :href="id | authorLink">
                <span>{{ data.display_name }}</span>
            </a>
            <el-tooltip
                class="item"
                effect="dark"
                content="签约作者"
                placement="top"
                v-if="isSuperAuthor"
            >
                <a class="u-superauthor" href="/dashboard/#/cooperation" target="_blank">
                    <img :src="super_author_icon" alt="superauthor" />
                </a>
            </el-tooltip>
            <el-tooltip
                class="item"
                effect="dark"
                :content="vipTypeTitle"
                placement="top"
                v-if="isPRO || isVIP"
            >
                <a class="u-vip" href="/vip/premium?from=sidebar_author" target="_blank">
                    <i class="i-icon-vip on">{{ vipType }}</i>
                </a>
            </el-tooltip>
        </div>
        <div class="u-bio">{{ data.user_bio }}</div>
        <div class="u-link" v-if="hasLink">
            <a
                v-if="data.weibo_name"
                class="u-weibo"
                :href="data.weibo_id | weiboLink"
                target="_blank"
            >
                <img svg-inline src="../assets/img/author/weibo.svg" />
                {{ data.weibo_name }}
            </a>
            <a
                v-if="data.github_name"
                class="u-github"
                :href="data.github_name | githubLink"
                target="_blank"
            >
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
                <span class="u-medal" v-for="(item, i) in medals" :key="i">
                    <img :src="item.medal | showTeamMedal" :title="medal_map[item.medal]" />
                </span>
            </div>
        </div>
        <div class="u-teams" v-if="teams && teams.length">
            <div class="u-label">
                <i class="el-icon-school"></i>
                <span>所属团队</span>
            </div>
            <a class="u-team" v-for="(item,i) in teams" :key="i" :href="item.team_id | teamLink" target="_blank">
                <img class="u-teamlogo" :src="item.team_logo | showTeamLogo" />
                <span class="u-teamname">{{item.team_name}}@{{item.team_server}}</span>
            </a>
        </div>
        <Authorposts :uid="uid" />
    </div>
</template>

<script>
const liveStatusMap = ["等待开播", "直播中", "直播结束"];
import Avatar from "./author/Avatar.vue";
import Authorposts from "./author/Authorposts.vue";
import {
    authorLink,
    tvLink,
    getLink,
    getThumbnail,
} from "@jx3box/jx3box-common/js/utils";
import { __server, __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import {
    getUserInfo,
    getDouyu,
    getUserMedals,
    getUserPublicTeams,
    getSuperAuthor,
    getIdentity,
} from "../service/author";
import { user as medal_map } from "@jx3box/jx3box-common/data/medals.json";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "Author",
    props: ["uid"],
    data: function () {
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
            isSuperAuthor: false,
            isPRO: false,
            isVIP: false,
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
        super_author_icon: function () {
            return __imgPath + "image/user/" + "superauthor.svg";
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
        vipType: function () {
            return this.isPRO ? "PRO" : "PRE";
        },
        vipTypeTitle: function () {
            return this.isPRO ? "专业版会员" : "高级版会员";
        },
    },
    filters: {
        showTeamMedal: function (val) {
            return __imgPath + "image/medals/team/" + val + ".gif";
        },
        authorLink,
        weiboLink: function (val) {
            return "https://weibo.com/" + val;
        },
        githubLink: function (val) {
            return "https://github.com/" + val;
        },
        teamLink: function (id) {
            return getLink("org", id);
        },
        showTeamLogo: function (val) {
            return getThumbnail(val, 32);
        },
    },
    methods: {
        loadData: function () {
            return getUserInfo(this.id)
                .then((data) => {
                    this.data = data;
                })
                .then(() => {
                    this.loadMedals();
                    this.loadTeams();
                    this.checkSuperAuthor();
                    this.loadIdentity();
                });
        },
        loadTV: function () {
            if (this.tv_type == "douyu") {
                if (!this.tv_id || isNaN(this.tv_id)) return;
                getDouyu(this.tv_id).then((data) => {
                    this.tv = data;
                });
            }
        },
        loadMedals: function () {
            getUserMedals(this.id).then((data) => {
                this.medals = data;
            });
        },
        loadTeams: function () {
            getUserPublicTeams(this.id).then((data) => {
                this.teams = data && data.slice(0, 5);
            });
        },
        async checkVIP() {
            this.isPRO = await User.isPRO();
            this.isVIP = await User.isVIP();
        },
        checkSuperAuthor: function () {
            getSuperAuthor(this.id).then((res) => {
                this.isSuperAuthor = res.data.data;
            });
        },
        loadIdentity: function () {
            getIdentity(this.id).then((res) => {
                this.isPRO = res.data.data.isPRO;
                this.isVIP = res.data.data.isPRE;
            });
        },
    },
    watch: {
        uid: function () {
            this.loadData();
        },
    },
    mounted: function () {
        this.id && this.loadData();
    },
    components: {
        Avatar,
        Authorposts,
    },
};
</script>

<style lang="less">
@import "../assets/css/author.less";
</style>
