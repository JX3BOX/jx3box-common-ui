<template>
    <aside
        class="c-sidebar-left c-sidebar"
        :class="{ isclose: !isOpen, isopen: isOpen,'without-bread': withoutBread }"
    >
        <div class="c-sidebar-left-inner"><slot></slot></div>
        <span
            class="c-sidebar-left-toggle"
            @click="toggleLeftSide"
            title="收起侧边栏"
        >
            <img
                v-show="isOpen"
                svg-inline
                src="../assets/img/leftsidebar/close.svg"
            />
            <img
                v-show="!isOpen"
                svg-inline
                src="../assets/img/leftsidebar/open.svg"
            />
        </span>
    </aside>
</template>

<script>
import Bus from '../service/bus';
export default {
    name: "LeftSidebar",
    props: ['open',"withoutBread"],
    data: function() {
        return {
            isOpen : true
        };
    },
    computed : {
        stickyHeader:function (){
            return this.withoutBread
        }
    },
    watch : {
        open : function (newval){
            this.isOpen = newval === undefined ? true : !!newval
        },
    },
    methods: {
        toggleLeftSide: function() {
            let status = !this.isOpen
            Bus.$emit('toggleLeftSide',status);
        },
    },
    mounted: function() {
        Bus.$on('toggleLeftSide',(data)=>{
            this.isOpen = data
        })

        if (window.innerWidth < 1024) {
            this.isOpen = false;

            document.addEventListener("click", function() {
                Bus.$emit('toggleLeftSide',false);
            });
        }
    },
    created : function (){
        this.isOpen = this.open === undefined ? true : this.open
    },
};
</script>

<style lang="less">
@import '../assets/css/left-sidebar.less';
</style>
