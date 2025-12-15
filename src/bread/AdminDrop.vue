<template>
    <div class="c-admin-drop">
        <el-dropdown trigger="click" @command="handleCommand">
            <el-button type="primary" class="c-admin-button c-admin-drop__button" :size="buttonSize"
                ><i class="el-icon-setting"></i> 管理<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item v-if="!isCommunity && hasPermission('update_post')" command="toggleAdminPanel" icon="el-icon-setting">
                    <span>设置</span>
                </el-dropdown-item>
                <el-dropdown-item
                    v-else-if="isCommunity"
                    command="toggleCommunityAdminPanel"
                    icon="el-icon-setting"
                >
                    <span>设置</span>
                </el-dropdown-item>
                <el-dropdown-item v-if="hasPermission('update_post') && !isCommunity" command="editPost" icon="el-icon-edit-outline">
                    <span>编辑</span>
                </el-dropdown-item>
                <el-dropdown-item v-if="hasPermission('create_system_message')" command="directMessage" icon="el-icon-message">
                    <span>私信</span>
                </el-dropdown-item>
                <el-dropdown-item v-if="hasPermission('manage_post_move') && showMove" command="onMoveToCommunity" icon="el-icon-refresh">
                    <span>转移</span>
                </el-dropdown-item>
                <el-dropdown-item icon="el-icon-upload" command="designTask" v-if="hasPermission('push_banner')">
                    <span>推送</span>
                </el-dropdown-item>
                <el-dropdown-item command="migrate" v-if="isCommunity" icon="el-icon-refresh">
                    <span>迁移</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>

        <design-task v-model="showDesignTask" :post="post"></design-task>
        <CommunityAdmin v-model="communityAdminVisible" :postId="post && post.id" />
        <MoveToCommunityDialog v-model="moveVisible" :post="post" />
        <MigrateCommunity v-model="showMigrate" :communityId="sourceId" />
    </div>
</template>

<script>
import Bus from "../../service/bus";
import User from "@jx3box/jx3box-common/js/user";
import DesignTask from "./DesignTask.vue";
import MoveToCommunityDialog from "./MoveToCommunityDialog.vue";
import MigrateCommunity from "./MigrateCommunity.vue";
import { sendMessage } from "../../service/admin";
import CommunityAdmin from "./CommunityAdmin.vue";
import { editLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "AdminDrop",
    components: {
        DesignTask,
        MoveToCommunityDialog,
        CommunityAdmin,
        MigrateCommunity,
    },
    props: {
        isCommunity: {
            type: Boolean,
            default: true,
        },
        showMove: {
            type: Boolean,
            default: false,
        },
        buttonSize: {
            type: String,
            default: "medium",
        },
        post: {
            type: [Object, String],
            default: () => {},
        },
        userId: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            moveVisible: false,
            communityAdminVisible: false,
            showDesignTask: false,
            showMigrate: false,
        };
    },
    computed: {
        sourceId() {
            if (this.isCommunity) {
                return this.post?.id;
            } else {
                return this.post?.ID;
            }
        },
        sourceType() {
            if (this.isCommunity) {
                return "community";
            } else {
                return this.post?.post_type;
            }
        },
        edit_link: function() {
            return editLink(this.post?.post_type, this.post?.ID);
        },
    },
    methods: {
        handleCommand(command) {
            this[command]();
        },
        toggleCommunityAdminPanel() {
            this.communityAdminVisible = true;
        },
        toggleAdminPanel() {
            Bus.$emit("toggleAdminPanel");
        },
        onMoveToCommunity() {
            this.moveVisible = true;
        },
        directMessage() {
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
                            source_id: String(this.sourceId),
                            source_type: this.sourceType,
                            user_id: this.userId,
                            content: "运营通知：" + instance.inputValue,
                            type: "system",
                            subtype: "admin_message",
                        };
                        sendMessage(data).then(() => {
                            this.$message.success("私信成功");
                            done();
                        });
                    } else {
                        done();
                    }
                },
            }).catch(() => {});
        },
        designTask() {
            this.showDesignTask = true;
        },
        editPost() {
            location.href = this.edit_link + '?from=admin';
        },
        hasPermission(permission) {
            return User.hasPermission(permission);
        },
        migrate() {
            console.log("migrate");
            this.showMigrate = true;
        },
    },
};
</script>

<style lang="less">
.c-admin-drop {
    float: right;
    margin-top: -2px;
    margin-right: 10px;
}
.c-admin-drop__button {
    padding: 8px 18px !important;
}
</style>
