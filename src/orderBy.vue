<template>
    <div class="w-filter-order" :class="{ on: visible }">
        <span class="u-label" @click="toggleFilter">
            <span class="u-current-order"
                >排序 : {{ current || "最后更新" }}</span
            >
            <span class="u-toggle">
                <i class="el-icon-arrow-down"></i>
                <i class="el-icon-arrow-up"></i>
            </span>
        </span>
        <span class="u-options">
            <span
                class="u-mode u-update"
                :class="{ on: order == 'update' }"
                @click="filter('update')"
                ><i class="el-icon-refresh"></i> 最后更新</span
            >
            <span
                class="u-mode u-podate"
                :class="{ on: order == 'podate' }"
                @click="filter('podate')"
                ><i class="el-icon-sort"></i> 最早发布</span
            >
        </span>
    </div>
</template>

<script>
const order_map = {
    update: "最后更新",
    podate: "最早发布",
    favs: "收藏最多",
    likes: "点赞最多",
    downs: "下载最多",
};
export default {
    name: "orderBy",
    props: [],
    data: function() {
        return {
            visible : false,
            order: "update",
        };
    },
    computed: {
        current: function() {
            return order_map[this.order]
        },
    },
    methods: {
        toggleFilter: function() {
            this.visible = !this.visible;
        },
        filter: function(key) {
            this.order = key;
            this.$emit("filter", { type: 'order', val: key });
            this.visible = false
        },
    },
    mounted: function() {},
    components: {
    },
};
</script>

<style lang="less">
    .w-filter-order {
    .fz(12px);

    .u-label {
        .none;
    }
    .u-toggle {
        .pa;
        .rt(0);
        padding: 6px 10px;
        .pointer;

        .el-icon-arrow-up {
            .none;
        }

        &.on {
            .el-icon-arrow-down {
                .none;
            }
            .el-icon-arrow-up {
                .db;
            }
        }
    }
    .u-mode {
        .mr(15px);
        .pointer;
        i {
            .mr(2px);
        }
        &.on {
            color: @primary;
        }
        &:hover {
            color: @pink;
        }
    }
}
@media screen and (max-width: @ipad) {
    .w-filter-order {
        .pr;
        background-color: @bg-light;
        border: 1px solid #ddd;
        .r(4px);
        user-select: none;
        padding: 6px 0;
        padding-right:20px;

        &.on {
            .u-options {
                .db;
            }

            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
        }

        .u-label {
            padding: 0 10px;
            .pointer;
            .db;
        }
        .u-options {
            .pa;
            .lt(-1px, 29px);
            padding: 5px 0;
            .w(100%);
            background-color: #fff;
            border: 1px solid #ddd;
            .z(2);
            .u-mode {
                .db;
                padding: 7px 10px;
                .pr;
                .ml(0);
            }
            .none;
        }
    }
}
@media screen and (max-width: @phone) {
    .w-filter-order {
        .none;
    }
}
</style>
