<template>
    <span class="w-filter-menu">
        <el-dropdown>
            <span class="el-dropdown-link">
                <span class="u-menu-label"
                    ><i class="el-icon-s-operation"></i
                    >{{ current ? current : deftext }}</span
                ><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="filter('')">{{
                    "全部"
                }}</el-dropdown-item>
                <el-dropdown-item
                    v-for="(item, key) in marks"
                    :key="key"
                    @click.native="filter(key)"
                    >{{ item }}</el-dropdown-item
                >
            </el-dropdown-menu>
        </el-dropdown>
    </span>
    <!-- <div class="w-filter-mark" :class="{ on: visible }" v-else>
        <span class="u-label" @click="toggleFilter">
            <span class="u-current-filter">筛选 : {{ current || "全部" }}</span>
            <span class="u-toggle">
                <i class="el-icon-arrow-down"></i>
                <i class="el-icon-arrow-up"></i>
            </span>
        </span>
        <span class="u-options">
            <span
                class="u-mode u-all"
                :class="{ on: mark == '' }"
                @click="filter('')"
                ><i class="el-icon-s-operation"></i> 全部</span
            >
            <span
                class="u-mode"
                :class="{ on: mark == key }"
                v-for="(label, key) in marks"
                :key="key"
                @click="filter(key)"
                ><i class="el-icon-user"></i> {{ label }}</span
            >
            <slot></slot>
        </span>
    </div> -->
</template>

<script>
const marks = {
    newbie: "新手易用",
    advanced: "进阶推荐",
    recommended: "编辑精选",
    geek: "骨灰必备",
};
export default {
    name: "markBy",
    props: ["mode", "placeholder"],
    data: function() {
        return {
            visible: false,
            mark: "",
            marks,
        };
    },
    computed: {
        current: function() {
            return marks[this.mark];
        },
        deftext: function() {
            return this.placeholder || "精选";
        },
    },
    methods: {
        toggleFilter: function() {
            this.visible = !this.visible;
        },
        filter: function(key) {
            this.mark = key;
            this.$emit("filter", { type: "mark", val: key });
            this.visible = false;
        },
    },
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
.w-filter-menu {
    .pointer;
    .u-menu-label {
        i {
            .mr(5px);
        }
        .fz(12px);
    }
}
.w-filter-mark {
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
    .w-filter-mark {
        .pr;
        background-color: #f6f8fa;
        border: 1px solid #eee;
        .r(4px);
        user-select: none;
        padding: 5px 0;
        padding-right: 20px;
        min-width: 110px;
        box-sizing: border-box;

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
    .w-filter-mark {
        .none;
    }
}

</style>
