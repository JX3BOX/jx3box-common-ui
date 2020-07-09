<template>
    <div class="w-print" @click="doPrint" v-if="cansee">
        <i class="u-icon el-icon-printer"></i>
        <span class="u-text">打印 | 保存PDF</span>
    </div>
</template>

<script>
import jquery from "jquery";
import User from '@jx3box/jx3box-common/js/user'
export default {
    name: "Print",
    props: ["title",'enable','authorID'],
    data: function() {
        return {
            lazyload: false,
            status: false,
        };
    },
    computed: {
        cansee : function (){
            if(this.enable != undefined){
                return this.enable
            }else{
                if(User.getInfo().group >= 64) return true
                return User.getInfo().uid == this.authorID
            }
        }
    },
    methods: {
        doPrint: function() {
            if (!this.lazyload) {
                this.loadImages();
            }
            if (this.status) {
                window.print();
            } else {
                this.status = this.checkLoaded();
                if (this.status) {
                    window.print();
                } else {
                    this.$notify.error({
                        title: "错误",
                        message: "请先阅读完全文以加载所有图片",
                    });
                    window.scrollTo(0, document.body.clientHeight);
                }
            }
        },
        checkLoaded: function() {
            const $ = jquery;
            let imgs = $(".c-article img");
            for (let i = 0; i < imgs.length; i++) {
                if (!imgs[i].complete) {
                    return false;
                }
            }
            return true
        },
        loadImages: function() {
            const $ = jquery;
            $(".c-article img").each((i, ele) => {
                $(ele).attr("loading", "auto");
            });
            this.lazyload = true;
        },
    },
    mounted: function() {
        if (this.title) document.title = this.title; //为了打印时页眉的标题正确
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/print.less";
</style>
