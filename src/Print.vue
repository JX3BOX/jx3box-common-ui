<template>
    <div class="w-print" @click="doPrint">
        <i class="u-icon el-icon-printer"></i>
        <span class="u-text">打印 | 保存PDF</span>
    </div>
</template>

<script>
    export default {
        name : 'Print',
        props:["title"],
        data : function(){
            return {
                lazyload : false
            }
        },
        computed:{},
        methods:{
            doPrint : function (){
                if(!this.lazyload){
                    window.scrollTo(0, document.documentElement.clientHeight);  //激活懒加载的图片
                    this.lazyload = true
                }
                window.print()
            }
        },
        mounted:function(){
            if(this.title) document.title = this.title  //为了打印时页眉的标题正确
        },
        components : {
        }
    }
</script>

<style lang="less">
    @import '../assets/css/print.less';
</style>