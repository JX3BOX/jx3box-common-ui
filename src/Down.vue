<template>
    <a class="w-down" :class="cls" :href="url" @click="doDown">
        <i class="el-icon-download"></i>
        <span class="u-text" v-if="!$slots.default">下载</span>
        <slot></slot>
        <span class="u-count" v-if="showCount">{{total}}</span>
    </a>
</template>

<script>
import { getRewrite } from "@jx3box/jx3box-common/js/utils";
import { addDown } from "../service/down";
export default {
    name: "Down",
    props:['classes','url','count','showCount'],
    data: function() {
        return {
            pid: getRewrite("pid"),
            status : true,
            total : this.count || 0
        };
    },
    computed: {
        cls : function (){
            return this.classes || 'el-button el-button--primary el-button--small is-plain'
        }
    },
    watch : {
        count : function (){
            this.total = this.count || 0
        }
    },
    methods: {
        doDown: function() {
            this.status && this.pid && addDown(this.pid) && ~~this.total++
            this.status = false
        },
    },
    mounted: function() {
    },
};
</script>

<style lang="less">
    @import '../assets/css/down.less';
</style>
