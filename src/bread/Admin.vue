<template>
    <el-drawer
        class="c-admin"
        title="管理面板"
        :visible.sync="dialog_visible"
        :before-close="close"
        :append-to-body="true"
        :modal="false"
        :withHeader="false"
        v-if="hasRight"
    >
        <div class="c-admin-wrapper">
            <!-- <template v-if="isAdmin"> -->
            <el-divider content-position="left">状态变更</el-divider>
            <el-radio-group v-model="post_status" class="c-admin-status" size="small">
                <el-radio-button v-for="(option, key) in status_options" :label="key" :key="key">{{
                    option
                }}</el-radio-button>
            </el-radio-group>
            <el-button type="primary" size="small" class="u-refresh-btn" @click="onRefreshCache">刷新缓存</el-button>
            <!-- </template> -->

            <el-divider content-position="left">可见性变更</el-divider>
            <el-radio-group v-model="visible" class="c-admin-status" size="small">
                <el-radio-button v-for="(option, key) in visible_options" :label="key" :key="key">{{
                    option
                }}</el-radio-button>
            </el-radio-group>

            <el-divider content-position="left">推荐角标</el-divider>
            <el-checkbox-group v-model="mark" class="c-admin-mark" size="small">
                <el-checkbox v-for="(option, key) in mark_options" :label="key" :key="key">{{ option }}</el-checkbox>
            </el-checkbox-group>

            <el-divider content-position="left">高亮置顶</el-divider>
            <el-checkbox class="c-admin-highlight-checkbox" v-model="isSticky">置顶</el-checkbox>
            <el-checkbox class="c-admin-highlight-checkbox" v-model="isHighlight">开启高亮</el-checkbox>
            <template v-if="isHighlight">
                <el-color-picker
                    class="c-admin-highlight-block"
                    v-model="color"
                    :predefine="color_options"
                    size="mini"
                ></el-color-picker>
                <span class="c-admin-highlight-preview" :style="{ color: color }" style="margin-right: 10px"
                    >预览高亮效果</span
                >
            </template>
            <el-checkbox class="c-admin-highlight-checkbox" v-model="isStar" :true-label="1" :false-label="0"
                >精选</el-checkbox
            >

            <el-divider content-position="left">封面海报</el-divider>
            <div class="c-admin-banner">
                <el-upload
                    class="c-admin-upload el-upload--picture-card"
                    :action="uploadurl"
                    :with-credentials="true"
                    :show-file-list="false"
                    :on-success="uploadSuccess"
                    :on-error="uploadFail"
                >
                    <img v-if="post_banner" :src="post_banner" />
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-input class="u-banner" v-model="post_banner">
                    <span slot="prepend">海报地址</span>
                    <span slot="append">
                        <span class="u-btn" @click="removeBanner"> <i class="el-icon-circle-close"></i> 移除海报 </span>
                    </span>
                </el-input>
            </div>

            <el-divider content-position="left">元信息</el-divider>
            <div class="c-admin-info">
                <div class="w-select c-admin-type">
                    <el-select
                        v-model="post_type"
                        placeholder="请选择板块"
                        style="width: 100%"
                        class="u-select drawer-item-content"
                        :disabled="appDisabled"
                    >
                        <span slot="prepend">板块</span>
                        <el-option
                            v-for="type in type_options"
                            :key="type.value"
                            :label="type.label"
                            :value="type.value"
                        ></el-option>
                    </el-select>
                </div>
                <div class="c-admin-author">
                    <el-input v-model="post_author" placeholder="请输入作者ID" class="input-author drawer-item-content">
                        <template #prepend>
                            <span class="u-keyword">作者ID</span>
                        </template>
                    </el-input>
                </div>
            </div>

            <div class="c-admin-extend" v-if="showExtend">
                <div class="u-condition u-map" v-if="subtypeMap && Object.keys(subtypeMap)">
                    <span class="u-prepend el-input-group__prepend">类型</span>
                    <el-select v-model="post_subtype" filterable placeholder="请选择" clearable>
                        <el-option v-for="(label, value) in subtypeMap" :value="value" :label="label" :key="value">
                        </el-option>
                    </el-select>
                </div>
                <div class="u-condition u-map">
                    <span class="u-prepend el-input-group__prepend">主题</span>
                    <el-select v-model="topics" filterable placeholder="请选择" clearable multiple collapse-tags>
                        <el-option v-for="value in tags" :value="value" :label="value" :key="value"> </el-option>
                    </el-select>
                </div>
            </div>

            <div class="c-admin-buttons">
                <el-button type="primary" @click="submit" :loading="pushing">提交</el-button>
                <el-button type="plain" @click="close">取消</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script>
import Bus from "../../service/bus";
import { getRewrite } from "@jx3box/jx3box-common/js/utils";
import { __cms, __postType, __visibleMap } from "@jx3box/jx3box-common/data/jx3box.json";
import { getSetting, postSetting } from "../../service/admin";
import User from "@jx3box/jx3box-common/js/user";
import { cms as marks } from "@jx3box/jx3box-common/data/mark.json";
import { getTopicBucket } from "../../service/cms";
import emitter from "../../assets/js/emitt";
export default {
    name: "Admin",
    props: {
        marksOptions: {
            type: Object,
            default: () => {},
        },
        // 入口是否是后台管理/list
        fromList: {
            type: Boolean,
            default: false,
        },
        show: {
            type: Boolean,
            default: false,
        },
        postId: {
            type: [Number, String],
            default: 0,
        },
        // 是否禁止板块选择
        appDisabled: {
            type: Boolean,
            default: false,
        },
        showExtend: {
            type: Boolean,
            default: false,
        },
        subtypeMap: {
            type: Object,
            default: () => {},
        },
        app: {
            type: String,
            default: "",
        },
    },
    data() {
        return {
            // 可视
            dialog_visible: false,

            // 数据
            pulled: false,
            pushing: false,

            // 权限
            hasRight: false,
            pid: 0,
            channel: "",

            // 状态
            post_status: "publish",
            status_options: {
                publish: "默认",
                draft: "草稿",
                pending: "待审核",
                dustbin: "删除",
            },
            visible: "0",
            visible_options: __visibleMap,

            // 角标
            mark: [],

            // 高亮
            isHighlight: false,
            color: "rgb(255,0,1)",
            color_options: [
                "rgb(255,0,1)",
                "rgb(2,209,248)",
                "rgb(147,217,25)",
                "rgb(255,154,2)",
                "rgb(255,44,142)",
                "rgb(142,46,255)",
            ],

            // 置顶
            isSticky: false,
            sticky: 0,
            isStar: 0,

            // 海报
            uploadurl: __cms + "api/cms/upload",
            banner_preview: "",
            post_banner: "",

            // 类型
            post_type: "",
            type_options: [],
            post_subtype: "",
            topics: [],
            tags: [],

            // 作者
            post_author: "",
        };
    },
    computed: {
        data: function () {
            return {
                ID: this.pid,
                post_status: this.post_status || "publish",
                visible: this.visible || "0",
                post_author: this.post_author || 1,
                post_type: this.post_type || "bbs",
                post_banner: this.post_banner || "",
                color: this.isHighlight ? this.color : "",
                mark: this.mark || [],
                sticky: this.isSticky ? Date.now() : null,
                star: this.isStar,
                topics: this.topics,
                post_subtype: this.post_subtype,
            };
        },
        isAdmin: function () {
            return User.isAdmin();
        },
        mark_options: function () {
            return this.marksOptions && Object.keys(this.marksOptions)
                ? Object.assign({}, marks, this.marksOptions)
                : marks;
        },
    },
    methods: {
        // 是否有权限
        checkHasRight: function () {
            this.hasRight = User.isEditor();
        },
        // 获取pid
        checkPostID: function () {
            this.pid = getRewrite("pid") || (this.$route && this.$route.params && this.$route.params.id) || 0;
        },
        // 获取type
        checkChannel: function () {
            this.channel = location.pathname.split("/")[1];
        },
        // 加载类型选项
        initTypeOptions: function () {
            let types = [];
            for (let key in __postType) {
                types.push({
                    value: key,
                    label: __postType[key],
                });
            }
            this.type_options = types;
        },
        // 上传
        uploadSuccess: function (res, file, list) {
            this.banner_preview = URL.createObjectURL(file.raw);
            this.post_banner = res.data?.[0] || "";
        },
        uploadFail: function (err, file, fileList) {
            this.$message.error("上传失败");
            console.log(err);
        },
        removeBanner: function () {
            this.post_banner = "";
        },
        // 关闭
        close(done) {
            this.dialog_visible = false;
            this.$emit("update", {
                show: false,
            });
        },
        // 拉
        pull: function () {
            getSetting(this.pid).then((data) => {
                let { ID, color, mark, post_status, post_author, sticky, post_banner, post_type, visible, star, post_subtype, topics } = data;
                this.pid = ID;
                this.post_status = post_status;
                this.visible = visible;
                this.post_author = post_author;
                this.post_type = post_type;
                this.post_banner = post_banner;
                this.color = color;
                if (this.color) this.isHighlight = true;
                this.mark = mark || [];
                this.sticky = sticky || 0;
                if (this.sticky) this.isSticky = true;

                this.isStar = star || 0;
                this.topics = topics?.map(item => item.topic) || [];
                this.post_subtype = post_subtype || "";

                // 设置加载完成标识
                this.pulled = true;
            });
        },
        // 提交
        submit: function () {
            this.pushing = true;
            this.push();
        },
        // 推
        push: function () {
            postSetting(this.data)
                .then((res) => {
                    this.$emit("update", {
                        show: false,
                        data: this.data,
                    });
                    this.$message({
                        message: "设置成功",
                        type: "success",
                    });
                })
                .finally(() => {
                    this.pushing = false;
                    this.close();
                });
        },
        // 获取topic标签
        loadTopic() {
            getTopicBucket({ type: "bbs" }).then((res) => {
                const data = res.data.data?.map((item) => item.name) || [];
                this.tags = data;
            });
        },
        onRefreshCache() {
            emitter.emit("refreshCache", {
                type: this.post_type,
                id: this.pid,
            });
        }
    },
    watch: {
        "$route.params.id": function (id) {
            this.checkPostID();
        },
        show: {
            immediate: true,
            handler(bol) {
                if (this.fromList) {
                    this.dialog_visible = bol;
                    if (bol) {
                        this.pid = this.postId;
                        this.pull();
                    }
                }
            },
        },
    },
    created: function () {
        // 是否mount
        this.checkHasRight();
        // 预设信息
        this.initTypeOptions();
    },
    mounted: function () {
        // 基本信息
        this.checkPostID();
        this.checkChannel();

        // 绑定监听
        Bus.$on("toggleAdminPanel", (data) => {
            this.dialog_visible = !this.dialog_visible;
            this.checkPostID();
            // 文章类型的加载
            if (this.pid && this.hasRight) {
                this.pull();
            }

            if (this.showExtend && this.app && this.dialog_visible) {
                this.loadTopic();
            }
        });
    },
};
</script>

<style lang="less">
@import "../../assets/css/admin.less";
</style>
