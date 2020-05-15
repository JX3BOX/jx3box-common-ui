<template>
    <div class="c-github-repo" :class="{mini:MINI}">
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
                    <a :href="author_link + '?uid=' + c.ID" :title="c.display_name" target="_blank">
                        <img :src="c.user_avatar" :alt="c.display_name" />
                    </a>
                </li>
            </ul>
            <slot></slot>
        </div>
        <div class="u-more">
            <a class="u-report" :href="issue_url" target="_blank">提建议 | 发现Bug</a>
            <a class="u-join" :href="html_url" target="_blank">+ Contribute</a>
        </div>
    </div>
</template>

<script>
const axios = require("axios");
const { JX3BOX } = require("@jx3box/jx3box-common");
export default {
    name: "Github_REPO",
    props: ["REPO","MINI","coder"],
    data: function() {
        return {
            updated_at: "",
            contributors: [],
            coders : [],
            author_link : JX3BOX.__Links.author
        };
    },
    computed: {
        full_name : function (){
            return `JX3BOX/${this.REPO}`
        },
        html_url : function (){
            return `https://github.com/JX3BOX/${this.REPO}`
        },
        issue_url : function (){
            return this.html_url + '/issues'
        },
    },
    methods: {},
    mounted: function() {
        axios
            .get(`https://api.github.com/repos/JX3BOX/${this.REPO}`)
            .then((res) => {
                let data = res.data;
                this.updated_at = data.updated_at;
            });
        // 指定了贡献人员
        if(this.coder){
            axios
            .get(
                `${JX3BOX.__server}user/list?uid=${this.coder}`
                // `http://localhost:5160/user/list?uid=${this.coder}`
            )
            .then((res) => {
                let data = res.data.data.list;
                let sequence = this.coder.split(',')
                this.coders = []
                for(let uid of sequence){
                    for(let coder of data){
                        if(coder.ID == uid){
                            this.coders.push(coder)
                        }
                    }
                }
            });
        }else{
            axios
            .get(
                `https://api.github.com/repos/JX3BOX/${this.REPO}/contributors`
            )
            .then((res) => {
                let data = res.data;
                this.contributors = data;
            });
        }

        
    },
};
</script>

<style lang="less">
.c-github-repo {
    background-color: @bg-light;
    border: 1px solid #eee;
    .r(4px);
    margin: 10px;

    &.mini{
        .u-repo,.u-detail,.u-more .u-join{
            .none;
        }
    }

    .u-repo {
        .db;
        border-bottom: 1px solid #eee;
        padding:5px;
        .h(32px);
        &:hover{
            .i-github{
                fill:#555;
            }
        }
        .nobreak;
    }
    .i-github {
        .dbi;
        .y(top);
        .mr(10px);
    }
    .u-name {
        .fz(1em, 32px);
        font-weight: 600;
    }
    .u-detail{
        padding:3px 10px 0 10px;
    }
    .u-update {
        .fz(12px, 2);
        color: #555;
    }
    .u-contributors {
        padding: 0;
        margin: 0 0 10px 0;
    }
    .u-list {
        list-style: none;
        .clearfix;
        padding: 0;
        margin: 0;
        li {
            .mr(10px);
            .mb(10px);
            .fl;
        }
        a {
            .db;
            .size(32px);
            img {
                .db;
                .size(100%);
            }
            span {
                .none;
            }
        }
    }
    .u-more{
        .fz(12px,32px);
        padding:0 5px;
        color:#999;
        .clearfix;
        a:hover{
            text-decoration:underline;
        }
    }
    .u-join{
        .fr;
    }
    .u-report{
        .fl;
    }
}
</style>
