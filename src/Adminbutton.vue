<template>
    <el-button
        v-if="show"
        class="c-admin-button"
        type="primary"
        :size="button_size"
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
    props: ['size'],
    data: function() {
        return {
            show: false,
            button_size : this.size || 'medium'
        };
    },
    computed: {},
    methods: {
        toggleAdminPanel: function() {
            Bus.$emit("toggleAdminPanel");
        },
    },
    mounted: function() {
        this.show = User.getInfo().group > 60 ? true : false;
    },
    components: {},
};
</script>
