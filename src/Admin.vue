<template>
    <el-drawer
        class="c-admin"
        title="管理面板"
        :visible.sync="visible"
        :before-close="handleClose"
        :append-to-body="true"
        v-loading="loading"
        :modal="false"
        :withHeader="false"
    >
        <div class="c-admin-wrapper">
            <el-divider content-position="left">状态变更</el-divider>
            <el-radio-group
                v-model="statusRadioValue"
                size="small"
                class="c-admin-status"
            >
                <el-radio-button label="publish">默认</el-radio-button>
                <el-radio-button label="draft">草稿</el-radio-button>
                <el-radio-button label="pending">待审核</el-radio-button>
                <el-radio-button label="dustbin">删除</el-radio-button>
            </el-radio-group>

            <el-divider content-position="left">推荐角标</el-divider>
            <el-checkbox-group v-model="markCheckboxValue">
                <el-checkbox
                    v-for="option of markCheckboxOptions"
                    :key="option.label"
                    :label="option.label"
                    >{{ option.name }}</el-checkbox
                >
            </el-checkbox-group>

            <el-divider content-position="left">加粗高亮</el-divider>
            <el-checkbox
                class="c-admin-highlight-checkbox"
                v-model="isHighlight"
                >开启高亮</el-checkbox
            >
            <template v-if="isHighlight">
                <el-color-picker
                    v-model="highlightColorValue"
                    show-alpha
                    :predefine="predefineColors"
                    size="mini"
                ></el-color-picker>
                <span
                    class="c-admin-highlight-preview"
                    :style="{ color: highlightColorValue }"
                    >预览标题效果</span
                >
            </template>

            <el-divider content-position="left">是否置顶</el-divider>
            <el-switch
                v-model="isPostPinned"
                active-text="置顶"
                class="switch-post-pinned drawer-item-content"
            ></el-switch>

            <el-divider content-position="left">封面海报</el-divider>
            <el-upload
                class="c-admin-upload upload-cover drawer-item-content"
                :action="coverUploadUrl"
                list-type="picture-card"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :limit="1"
                :on-exceed="handleExceed"
                :file-list="fileList"
                :auto-upload="true"
                :with-credentials="true"
                :before-upload="handleUploadBefore"
                :on-success="handleUploadSuccess"
                :on-error="handleUploadError"
                :class="{
                    'upload-plus-hide':
                        coverUploadProgress === 'uploading' ||
                        coverUploadProgress === 'success' ||
                        fileList.length >= 1,
                }"
            >
                <i slot="default" class="el-icon-plus"></i>
                <!-- <el-button size="small" type="primary">点击上传</el-button> -->
            </el-upload>

            <el-divider content-position="left">元信息</el-divider>
            <div class="c-admin-info">
                <div class="c-admin-type">
                    <el-select
                        v-model="typeSelectValue"
                        placeholder="请选择类型"
                        class="drawer-item-content"
                    >
                        <el-option
                            v-for="type in typeOptions"
                            :key="type.value"
                            :label="type.label"
                            :value="type.value"
                        ></el-option>
                    </el-select>
                </div>
                <div class="c-admin-author">
                    <el-input
                        v-model="authorInputValue"
                        placeholder="请输入作者uid"
                        class="input-author drawer-item-content"
                    ></el-input>
                </div>
            </div>

            <div class="c-admin-buttons">
                <el-button
                    type="primary"
                    @click="submitChange"
                    :loading="
                        coverUploadProgress === 'uploading' || dataUploading
                    "
                    >提交</el-button
                >
                <el-button type="plain" @click="close">取消</el-button>
            </div>
        </div>
    </el-drawer>
</template>

<script>
import Bus from "../service/bus";
import { getRewrite } from "@jx3box/jx3box-common/js/utils";
import { __server, __postType } from "@jx3box/jx3box-common/js/jx3box.json";
import { User } from "@jx3box/jx3box-common";
import { axios } from "../service/api.js";
export default {
    name: "Admin",
    data() {
        return {
            loading: false,
            visible: true,

            // 角标
            markCheckboxValue: [],
            markCheckboxOptions: [
                { label: "newbie", name: "新手易用" },
                { label: "advanced", name: "进阶推荐" },
                { label: "recommended", name: "编辑精选" },
                { label: "geek", name: "骨灰必备" },
            ],

            // 高亮
            isHighlight: false,
            highlightColorValue: "rgb(255,0,1)",
            predefineColors: [
                "rgb(255,0,1)",
                "rgb(2,209,248)",
                "rgb(147,217,25)",
                "rgb(255,154,2)",
                "rgb(255,44,142)",
                "rgb(142,46,255)",
            ],

            // 置顶
            isPostPinned: false,

            // 海报
            coverUploadUrl: `${__server}upload`,
            coverUploadProgress: "none",
            fileList: [],

            // 类型
            typeSelectValue: "",
            typeOptions: [],

            // 作者
            authorInputValue: "",

            // 状态
            statusRadioValue: "publish",

            // 提交
            dataUploading: false,
        };
    },
    computed: {
        isName() {
            return false;
        },
    },
    methods: {
        openDrawer() {
            // 如果没有作者id，说明是第一次加载，需要先从服务器获取数据
            if (this.authorInputValue === "") {
                this.loadingPostData = true;
                this.fetchServerData();
            }
            // 打开抽屉
            this.drawerVisible = true;
        },
        handleUploadBefore() {
            this.coverUploadProgress = "uploading";
        },
        handleUploadSuccess(response, file, fileList) {
            if (response.code === 10026) {
                this.coverUploadProgress = "success";
                this.coverRealUrl = response.data.list[0];
                this.$message.success("上传图片成功");
            }
        },
        handleUploadError(err, file, fileList) {
            this.$message.error("上传图片出错");
            this.coverUploadProgress = "failed";
            console.log(file);
        },
        fetchServerData() {
            // 获取文章pid
            // this.pid = parseInt(getRewrite('pid'))
            this.pid = 28;
            if (User.isLogin()) {
                this.userid = User.getInfo().uid;
            } else {
                User.toLogin();
                return;
            }
            console.log(this.userid);
            axios(`${__server}post/query?id=${this.pid}`, "GET", true)
                .then((res) => {
                    if (res.code == 10064) {
                        let data = res.data.post;
                        console.log(data);
                        this.pid = data.ID;
                        if (data.color === null) {
                            this.isHighlight = false;
                        } else {
                            this.isHighlight = true;
                            this.highlightColorValue = data.color;
                        }
                        this.markCheckboxValue = data.mark ? data.mark : [];
                        this.authorInputValue = data.post_author.toString();
                        if (data.post_banner) {
                            this.fileList = [
                                {
                                    name: data.post_banner,
                                    url: data.post_banner,
                                },
                            ];
                        } else {
                            this.fileList = [];
                        }
                        this.statusRadioValue = data.post_status;
                        this.typeSelectValue = data.post_type;
                        if (data.sticky && data.sticky != 0) {
                            this.isPostPinned = true;
                        } else {
                            this.isPostPinned = false;
                        }
                    }
                })
                .catch((e) => {
                    switch (e.code) {
                        case -1:
                            // 网络异常
                            this.$message.error(e.msg);
                            break;
                        case 9999:
                            this.$message.error("登录失效, 请重新登录");
                            //1.注销
                            User.destroy();
                            setTimeout(() => {
                                User.toLogin();
                            }, 2000);
                            //不指定url时则自动跳回当前所在页面
                            break;
                        default:
                            // 服务器错误
                            this.$message.error(`[${e.code}]${e.msg}`);
                    }
                    this.drawerVisible = false;
                })
                .then(() => {
                    this.loadingPostData = false;
                });
        },
        submitChange() {
            if (this.authorInputValue.replace(/\ /g, "") === "") {
                this.$confirm("请输入作者uid", "提交失败", {
                    confirmButtonText: "确定",
                    type: "error",
                    showCancelButton: false,
                    showClose: false,
                }).catch(() => {});
                return;
            }
            this.dataUploading = true;
            let url = `${__server}post/setting`;
            if (this.fileList.length >= 1) {
                this.coverRealUrl = this.fileList[0].url;
            }
            axios(url, "POST", true, {
                ID: this.pid,
                color: this.isHighlight ? this.highlightColorValue : null,
                mark: this.markCheckboxValue,
                post_author: this.authorInputValue,
                post_banner: this.coverRealUrl ? this.coverRealUrl : null,
                post_status: this.statusRadioValue,
                post_type: this.typeSelectValue,
                sticky: this.isPostPinned ? Date.now() : 0,
            })
                .then((res) => {
                    if (res.code === 10070) {
                        this.drawerVisible = false;
                        this.$message.success("设置成功！");
                    } else {
                        this.$message.error("设置出错！");
                    }
                })
                .catch((e) => {
                    switch (e.code) {
                        case -1:
                            // 网络异常
                            this.$message.error(e.msg);
                            break;
                        case 9999:
                            this.$message.error("登录失效, 请重新登录");
                            //1.注销
                            User.destroy();
                            setTimeout(() => {
                                User.toLogin();
                            }, 2000);
                            //不指定url时则自动跳回当前所在页面
                            break;
                        default:
                            // 服务器错误
                            this.$message.error(`[${e.code}]${e.msg}`);
                    }
                })
                .then(() => {
                    this.dataUploading = false;
                });
        },
        handleClose(done) {
            done();
        },
        handleRemove(file, fileList) {
            this.coverUploadProgress = "none";
            this.fileList = [];
            this.coverRealUrl = null;
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`只能选择一个文件！`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
        drawer: function() {},
        close: function() {},
        initTypeOptions : function (){
            let types = [];
            for (let key in __postType) {
                types.push({
                    value: key,
                    label: __postType[key],
                });
            }
            this.typeOptions = types
        }
    },
    created: function() {
        // 加载类型选项
        this.initTypeOptions()
    },
    mounted: function() {
        // 监听跨模块开关事件
        Bus.$on('toggleAdminPanel',(data)=>{
            this.visible = !this.visible
        })
    },
};
</script>

<style lang="less">
@import "../assets/css/admin.less";
</style>
