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
            <slot></slot>
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
    @import '../../assets/css/order-by.less';
</style>