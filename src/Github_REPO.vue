<template>
    <div class="c-github-repo" :class="{ mini: MINI }">
        <a class="u-repo" :href="html_url" target="_blank">
            <i class="i-github"
                ><img svg-inline src="../assets/img/rightsidebar/github.svg"
            /></i>
            <span class="u-name">{{ full_name }}</span>
        </a>
        <div class="u-detail">
            <time class="u-update">Last updated:{{ updated_at }}</time>
            <h5 class="u-contributors">Contributors</h5>
            <ul class="u-list" v-if="!coder">
                <li v-for="(c, i) in contributors" :key="c + i">
                    <a :href="c.html_url" :title="c.login" target="_blank">
                        <img :src="c.avatar_url" :alt="c.login" />
                        <span>{{ c.contributions }}</span>
                    </a>
                </li>
            </ul>
            <ul class="u-list" v-if="coder">
                <li v-for="(c, i) in coders" :key="c + i">
                    <a
                        :href="author_link + '?uid=' + c.ID"
                        :title="c.display_name"
                        target="_blank"
                    >
                        <img
                            :src="c.user_avatar | resolveAvatarPath"
                            :alt="c.display_name"
                        />
                    </a>
                </li>
            </ul>
            <slot></slot>
        </div>
        <div class="u-more">
            <a class="u-report" :href="issue_url" target="_blank"
                >提建议 | 发现Bug</a
            >
            <a class="u-join" :href="html_url" target="_blank">+ Contribute</a>
        </div>
    </div>
</template>

<script>
import {
    __ossRoot,
    __ossMirror,
    __Links,
} from "@jx3box/jx3box-common/data/jx3box.json";
import { getRepoInfo, getBuilders, getRepoCoders } from "../service/github";
export default {
    name: "Github_REPO",
    props: ["REPO", "MINI", "coder"],
    data: function() {
        return {
            updated_at: "",
            contributors: [],
            coders: [],
            author_link: __Links.author,
        };
    },
    computed: {
        full_name: function() {
            return `JX3BOX/${this.REPO}`;
        },
        html_url: function() {
            return `https://github.com/JX3BOX/${this.REPO}`;
        },
        issue_url: function() {
            return this.html_url + "/issues";
        },
    },
    filters: {
        resolveAvatarPath: function(val) {
            return val ? val.replace(__ossRoot, __ossMirror) : "";
        },
    },
    methods: {
        getBasicInfo: function() {
            getRepoInfo(this.REPO).then((res) => {
                let data = res.data;
                if (data) this.updated_at = data.updated_at;
            });
        },
        getCoders: function() {
            getBuilders(this.coder).then((res) => {
                let data = res.data.data.list;
                let sequence = this.coder.split(",");
                this.coders = [];
                for (let uid of sequence) {
                    for (let coder of data) {
                        if (coder.ID == uid) {
                            this.coders.push(coder);
                        }
                    }
                }
            });
        },
        getRepoCoders: function() {
            getRepoCoders(this.REPO).then((res) => {
                let data = res.data;
                this.contributors = data;
            });
        },
        init: function() {
            this.getBasicInfo();
            this.coder ? this.getCoders() : this.getRepoCoders();
        },
    },
    mounted: function() {
        this.init();
    },
};
</script>

<style lang="less">
@import "../assets/css/github-repo.less";
</style>
