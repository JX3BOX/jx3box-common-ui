<template>
    <el-dialog
        custom-class="m-design-task"
        :width="isPhone ? '95%' : '600px'"
        :visible="modelValue"
        @close="close"
        title="迁回原板块"
        append-to-body
    >
    </el-dialog>
</template>

<script>
import {getOriginalPost} from "../../service/community";
export default {
    name: "MigrateCommunity",
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        communityId: {
            type: Number,
            default: 5958,
        }
    },
    model: {
        prop: "modelValue",
        event: "update:modelValue",
    },
    emits: ["update:modelValue"],
    data() {
        return {
            post: {},
            isPhone: window.innerWidth < 768,
        };
    },
    watch: {
        modelValue(val) {
            if (val) {
                if (this.communityId) {
                    this.loadPost();
                }
            }
        }
    },
    methods: {
        close() {
            this.$emit("update:modelValue", false);
        },
        loadPost() {
            getOriginalPost(this.communityId).then((res) => {
                this.post = res.data.data
            });
        },
    },
};
</script>
