<template>
    <el-button
        v-if="show"
        class="c-admin-button"
        type="primary"
        size="medium"
        icon="el-icon-setting"
        @click="toggleAdminPanel()"
        >管理</el-button
    >
</template>

<script>
import Bus from "../service/bus";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "Adminbutton",
    props: [],
    data: function() {
        return {
            show: false,
        };
    },
    computed: {},
    methods: {
        toggleAdminPanel: function() {
            Bus.$emit("toggleAdminPanel");
        },
    },
    mounted: function() {
        console.log(User.getInfo())
        this.show = User.getInfo().group > 60 ? true : false;
    },
    components: {},
};
</script>
