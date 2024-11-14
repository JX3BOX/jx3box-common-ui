<template>
    <div class="c-author">
        <AuthorInfo :uid="uid" @ready="installModules" />
        <template v-if="data">
            <div class="u-interact">
                <!-- <AuthorFollow style="margin-right: 8px" :uid="uid" /> -->
                <AuthorRss style="margin-right: 8px" :uid="uid" :data="data" />
                <!-- <AuthorGift :uid="uid" /> -->
                <el-button class="u-btn" size="mini" @click="onMessage">
                    <img class="u-msg-icon" svg-inline :src="src" />
                    私信
                </el-button>
            </div>
            <!-- <AuthorMsg :uid="uid" /> -->
            <AuthorLink class="u-block u-links" :uid="uid" :data="data" />
            <AuthorMedals class="u-block u-trophy" :uid="uid" />
            <AuthorTeams class="u-block u-teams" :uid="uid" />
            <!-- <AuthorFans class="u-block u-fans" :uid="uid" /> -->
            <slot></slot>
            <AuthorPosts class="u-block u-posts" :uid="uid" />
        </template>
    </div>
</template>

<script>
import AuthorInfo from "./author/AuthorInfo.vue";
import AuthorLink from "./author/AuthorLink.vue";
// import AuthorFollow from "./author/AuthorFollow.vue";
// import AuthorMsg from "./author/AuthorMsg.vue";
// import AuthorGift from "./author/AuthorGift.vue";
// import AuthorFans from "./author/AuthorFans.vue";
import AuthorMedals from "./author/AuthorMedals.vue";
import AuthorTeams from "./author/AuthorTeams.vue";
import AuthorPosts from "./author/AuthorPosts.vue";
import AuthorRss from "./author/AuthorRss.vue";
import {__cdn} from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "Author",
    props: ["uid"],
    data: function () {
        return {
            data: "",
            src: __cdn + "design/vector/icon/message.svg",
        };
    },
    methods: {
        installModules: function (data) {
            this.data = data;
        },
        onMessage: function () {
            window.open("/dashboard/letter?receiver=" + this.uid, "_blank");
        },
    },
    components: {
        AuthorInfo,
        AuthorLink,
        // AuthorFollow,
        // AuthorMsg,
        // AuthorGift,
        AuthorMedals,
        AuthorTeams,
        AuthorPosts,
        // AuthorFans,
        AuthorRss,
    },
};
</script>

<style lang="less">
@import "../assets/css/author.less";
</style>
