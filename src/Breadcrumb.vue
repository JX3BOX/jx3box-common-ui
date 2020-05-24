<template>
    <div class="c-breadcrumb">
        <div class="u-menu" @click.stop="toggleLeftSide">
            <img
                class="u-toggle"
                :class="{ on: isOpen }"
                svg-inline
                src="../assets/img/bread/menu.svg"
            />
        </div>
        <a class="u-channel" :href="root">
            <i class="u-channel-logo"><slot name="logo"></slot></i>
            <span class="u-title">{{ name }}</span>
        </a>
        <slot></slot>
        <a
            v-if="publishEnable"
            :href="slug | publish_url(slug)"
            class="u-publish el-button el-button--primary"
            ><i class="el-icon-edit-outline"></i><span>发布</span></a
        >
        <Admin v-if="showAdmin"></Admin>
        
    </div>
</template>

<script>
import Bus from './bus';
const { JX3BOX } = require("@jx3box/jx3box-common");
import Admin from "./Admin.vue";
export default {
    name: "Breadcrumb",
    components: {
        Admin
    },
    props: ["name", "slug", "root","publishEnable","showAdmin"],
    data: function () {
        return {
            isOpen: true,
            drawer: true
        };
    },
    computed: {},
    filters: {
        publish_url: function (val) {
            return JX3BOX.__Links.dashboard.publish + "#/" + val;
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
        }
    },
};
</script>

<style lang="less">
.c-breadcrumb {
    .pf;
    top: @header-height;
    .z(499);
    .w(100%);
    .h(@bread-height);
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
    .lh(28px);
    border-bottom: 1px solid @border-hr;

    .u-channel {
        .fl;
        span {
            .bold;
            color: @color;
        }
        .mr(30px);
    }
    .u-channel-logo {
        .fl;
        .size(28px);
        .mr(10px);
        box-sizing: border-box;
        svg {
            .size(100%);
            fill: @bg-black;
            box-sizing: border-box;
        }
    }

    .u-channel:hover {
        .u-title {
            color: @color-link;
        }
        .u-channel-logo svg {
            fill: @color-link;
        }
    }

    .u-publish {
        .pa;
        .rt(8px,8px);
        padding: 8px 18px;
    }

    .u-menu {
        .pa;
        .lt(0);
        .h(28px);
        padding: 10px;
        .none;
        .pointer;

        svg {
            .h(29px);
            fill: @color;
        }

        .on {
            fill: @primary;
        }
    }
}
@media screen and (max-width: @ipad) {
    .c-breadcrumb {
        .u-publish {
            .none;
        }
    }
}
@media screen and (max-width: @ipad-y) {
    .c-breadcrumb {
        .u-menu {
            .db;
        }
        .u-channel-logo {
            .none;
        }
        padding-left: 40px;
    }
}
</style>
