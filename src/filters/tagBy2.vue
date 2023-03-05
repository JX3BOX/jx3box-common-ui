<template>
    <div class="w-filter-topics" ref="tagBy">
        <el-popover
            v-model="visible"
            trigger="manual"
            ref="pop"
            :width="400"
            popper-class="w-filter-topic__pop"
            :popper-options="{ boundariesElement: 'parent' }"
        >
            <div class="w-filter-tag__content">
                <div class="u-group">
                    <el-tag
                        v-for="item in computedTopics" :key="item"
                        @click="onTagClick(item)"
                        class="u-group-item u-tag"
                        :effect="item === value ? 'dark' : 'plain'"
                        >{{ item }}</el-tag
                    >
                </div>
            </div>

            <template #reference>
                <span @click="onToggle" class="u-toggle" :class="{ active: !!value }">
                    <i class="el-icon-s-operation"></i>
                    {{ activeText }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
            </template>
        </el-popover>
    </div>
</template>

<script>
export default {
    name: "tagBy2",
    props: {
        topics: {
            type: Array,
            default: () => [],
        },
        modelValue: {
            type: String,
            default: "",
        },
    },
    emits: ["update:modelValue"],
    model: {
        prop: "modelValue",
        event: "update:modelValue",
    },
    data() {
        return {
            visible: false,
            value: "全部",
        };
    },
    computed: {
        activeText() {
            const { value } = this;
            return value === "全部" ? "主题" : value;
        },
        computedTopics() {
            return ['全部', ...this.topics]
        },
    },
    watch: {
        modelValue: {
            immediate: true,
            handler(val) {
                this.value = val === '' ? '全部' : val;
            },
        },
        value(val) {
            if (val === '全部') val = ''
            this.$emit("update:modelValue", val);
        },
    },
    mounted() {
        document.addEventListener("click", this.clickOutside);
    },
    beforeDestroy() {
        document.removeEventListener("click", this.clickOutside);
    },
    methods: {
        onToggle() {
            this.visible = !this.visible;
        },
        onTagClick(item) {
            this.value = item;

            setTimeout(() => {
                this.visible = false;
            }, 100);
        },
        clickOutside(e) {
            const tagBy = this.$refs.tagBy;
            const pop = this.$refs.pop;

            if (tagBy && !tagBy.contains(e.target) && pop && !pop.$el.contains(e.target)) {
                this.visible = false;
            }
        },
    },
};
</script>

<style lang="less">
@import "../../assets/css/tag-by2.less";
</style>
