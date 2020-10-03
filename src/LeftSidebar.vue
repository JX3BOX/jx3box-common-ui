<template>
    <aside
        class="c-sidebar-left c-sidebar"
        :class="{ isclose: !isOpen, isopen: isOpen }"
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
    props: ['open'],
    data: function() {
        return {
        };
    },
    computed: {
        isOpen : function (){
            return this.open == undefined ? true : this.open
        }
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
};
</script>

<style lang="less">
@import '../assets/css/left-sidebar.less';
</style>
