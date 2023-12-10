<template>
    <div class="c-author-teams" v-if="ready">
        <div class="u-label">
            <i class="el-icon-school"></i>
            <!-- <img svg-inline src="../../assets/img/leftsidebar/united.svg" /> -->
            <span>所在团队</span>
        </div>
        <div class="u-teams">
            <el-tooltip
                class="item"
                effect="dark"
                :content="item.team_name + '@' + item.team_server"
                placement="top"
                v-for="(item, i) in teams"
                :key="i"
            >
                <a class="u-team" :href="teamLink(item.team_id)" target="_blank">
                    <img class="u-team-logo" :src="showTeamLogo(item.team_logo)" />
                    <span class="u-team-name">{{ item.team_name }}@{{ item.team_server }}</span>
                </a>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
import { getLink, getThumbnail } from "@jx3box/jx3box-common/js/utils";
import { getUserPublicTeams } from "../../service/author";

export default {
    name: "AuthorTeams",
    props: ["uid"],
    components: {},
    data: function () {
        return {
            teams: [
                // {
                //     team_name : '诗画印象',
                //     team_logo : 'https://oss.jx3box.com/2019/09/logo.png',
                //     team_server : "蝶恋花"
                // }
            ],
        };
    },
    computed: {
        ready: function () {
            return this.uid && this.teams && this.teams.length;
        },
    },
    watch: {
        uid: {
            immediate: true,
            handler: function (val) {
                val && this.loadTeams();
            },
        },
    },
    methods: {
        loadTeams: function () {
            getUserPublicTeams(this.uid).then((data) => {
                this.teams = data && data.slice(0, 8);
            });
        },
        teamLink: function (team_id) {
            return getLink("org", team_id);
        },
        showTeamLogo: function (val) {
            return getThumbnail(val, 96);
        },
    },
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
.c-author-teams {
    .u-teams {
        .flex;
    }
    .u-team {
        .db;
        // background-color: #f5f7fa;
        // .mb(6px);
        &:hover {
            // background-color: #e6f0fb;
            .u-team-name {
                color: @pink;
            }
        }
        // padding: 4px 0;
        .r(3px);
        .mr(5px);
    }
    .u-team-logo {
        .size(19px);
        // .mr(4px);
        .r(50%);
        .db;
    }
    .u-team-name {
        .fz(12px);
        color: #56677a;
        .none;
    }
}
</style>
