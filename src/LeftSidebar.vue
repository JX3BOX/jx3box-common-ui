<template>
    <aside
        class="c-sidebar-left c-sidebar"
        :class="{ isclose: !isOpen, isopen: isOpen }"
    >
        <slot></slot>
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
const Bus = require('./bus');
export default {
    name: "LeftSidebar",
    props: [],
    data: function() {
        return {
            isOpen: true,
        };
    },
    computed: {},
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
.c-sidebar-left {
    .w(@aside-left);
    box-sizing: border-box;
    padding: 10px;
    .pf;
    .z(500);
    left: 0;
    top: @header-height + @bread-height;
    bottom: 0;
    background-color: @bg-light;
    border-right: 1px solid #eee;

    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-track,
    &::-webkit-scrollbar-track-piece {
        background-color: #fafafa;
        border-radius: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #eee;
        border-radius: 6px;
    }
    &::-webkit-scrollbar-button,
    &::-webkit-scrollbar-corner,
    &::-webkit-resizer {
        display: none;
    }
}

// 笔记本<1440 缩小双边栏
@media screen and (max-width: @notebook) {
    .c-sidebar-left {
        .w(@aside-left - 40px);
    }
}

// 平板横屏
@media screen and (max-width: @mininote) {
    .c-sidebar-left {
        .w(@aside-left - 60px);
    }
}

// 折叠相关逻辑
.c-sidebar-left-toggle {
    .pa;
    .rb(0);
    .size(20px);
    .pointer;
    padding: 10px;
    svg {
        fill: @color;
    }
}
.closeLeftSidebar() {
    transition: 0.2s ease-in-out;
    transform: translateX(-100%);
}
.openLeftSidebar() {
    transition: 0.2s ease-in-out;
    transform: translateX(0);
}
.c-sidebar-left.isclose {
    .closeLeftSidebar();

    .c-sidebar-left-toggle {
        transition: 0.2s ease-in-out;
        transform: translateX(100%);
    }
}
.c-sidebar-left.isopen {
    .openLeftSidebar();

    .c-sidebar-left-toggle {
        transition: 0.2s ease-in-out;
        transform: translateX(0);
    }
}

@media screen and (max-width: @ipad-y) {
    .c-sidebar-left-toggle {
        .none;
    }
}
</style>
