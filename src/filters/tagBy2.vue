<template>
    <div class="w-filter-tags" ref="tagBy">
        <el-popover
            v-model="visible"
            trigger="manual"
            ref="pop"
            :width="400"
            popper-class="w-filter-tag__pop"
            :popper-options="{ boundariesElement: 'parent' }"
        >
            <div class="w-filter-tag__content">
                <div v-for="(group, key) in tags" :key="key">
                    <div class="u-group-title">{{ key }}</div>
                    <div class="u-group">
                        <el-tag
                            v-for="item in group"
                            :key="item"
                            @click="onTagClick(item)"
                            class="u-tag"
                            :effect="item === value ? 'dark' : 'plain'"
                            >{{ item }}</el-tag
                        >
                    </div>
                </div>
            </div>

            <template #reference>
                <span @click="onToggle" class="u-toggle" :class="{ active: !!value }">{{ activeText }}</span>
            </template>
        </el-popover>
    </div>
</template>

<script>
export default {
    name: "tagBy2",
    props: {
        tags: {
            type: Object,
            default: () => {},
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
            value: "",
        };
    },
    computed: {
        activeText() {
            const { value } = this;
            return value ? value : "主题";
        },
    },
    watch: {
        modelValue: {
            immediate: true,
            handler(val) {
                this.value = val;
            },
        },
        value(val) {
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
