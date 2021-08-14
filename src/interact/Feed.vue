<template>
    <el-button class="w-feed" size="mini" type="primary" @click="doFeed" :disabled="true">
        <i v-if="!subscribed" class="el-icon-bell"></i>
        <i v-else class="el-icon-message-solid"></i>
        <span v-if="!subscribed">订阅</span>
        <span v-else>取消订阅</span>
    </el-button>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "Feed",
    props: ["postType", "postId"],
    inject: [],
    components: {},
    data: function () {
        return {
            login: User.isLogin(),
            subscribed: false,
        };
    },
    computed: {},
    watch: {},
    methods: {
        doFeed : function (){
            
        }
    },
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>