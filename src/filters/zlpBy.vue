<template>
    <span class="w-filter-menu">
        <el-dropdown>
            <span class="el-dropdown-link">
                <span class="u-menu-label"
                    ><i class="el-icon-s-operation"></i
                    >{{ value ? value : '资料片' }}</span
                ><i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="filter('')">{{
                    "全部"
                }}</el-dropdown-item>
                <el-dropdown-item
                    v-for="item in data"
                    :key="item"
                    @click.native="filter(item)"
                    >{{ item }}</el-dropdown-item
                >
            </el-dropdown-menu>
        </el-dropdown>
    </span>
</template>

<script>
import zlps from '@jx3box/jx3box-data/data/box/zlp.json'
export default {
    name: "zlpBy",
    props: ['client'],
    data: function() {
        return {
            value: "",
        };
    },
    computed: {
        data : function (){
            let client = this.client || 'all'
            return zlps[client]
        }
    },
    methods: {
        filter: function(key) {
            this.value = key;
            this.$emit("filter", { type: 'zlp', val: key });
        },
    },
    mounted: function() {},
    components: {},
};
</script>

<style lang="less">
    @import '../../assets/css/menu-by.less';
</style>
