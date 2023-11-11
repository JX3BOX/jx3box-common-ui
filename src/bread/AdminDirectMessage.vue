<template>
    <a
        class="u-message el-button el-button--warning el-button--medium u-op-public"
        @click="onButtonClick"
        v-if="isEditor"
    >
        <i class="el-icon-message"></i>
        <span>私信</span>
    </a>
</template>

<script>
import { sendMessage } from "../../service/admin";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "AdminDirectMessage",
    props: {
        size: {
            type: String,
            default: "medium",
        },
        sourceId: {
            type: Number,
            default: 0,
        },
        sourceType: {
            type: String,
            default: "",
        },
        userId: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        isEditor() {
            return User.isEditor();
        },
    },
    methods: {
        onButtonClick() {
            this.$prompt("请输入私信内容", "管理私信", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                inputPlaceholder: "请输入私信内容",
                inputValidator: (value) => {
                    if (!value) {
                        return "请输入私信内容";
                    }
                },
                beforeClose: (action, instance, done) => {
                    if (action === "confirm") {
                        const data = {
                            source_id: this.sourceId,
                            source_type: this.sourceType,
                            user_id: this.userId,
                            content: "运营通知：" + instance.inputValue,
                        };
                        sendMessage(data).then(() => {
                            this.$message.success("私信成功");
                            done();
                        })
                    } else {
                        done();
                    }
                }
            })
        }
    }
}
</script>
