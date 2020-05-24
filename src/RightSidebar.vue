<template>
    <aside class="c-sidebar-right c-sidebar">
        <slot></slot>
    </aside>
</template>

<script>
    export default {
        name : 'RightSidebar',
        props:[],
        data : function(){
            return {
            }
        },
        computed:{},
        methods:{},
        mounted:function(){},
    }
</script>

<style lang="less">
@import '../assets/css/right-sidebar.less';
</style>