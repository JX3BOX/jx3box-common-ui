<template>
    <div class="f-manage-panel">
        <el-button class="btn-manage" type="primary" size="small" icon="el-icon-s-data" @click="openDrawer()">管理帖子</el-button>
        <el-drawer title="管理面板" :visible.sync="drawerVisible" direction="rtl" :before-close="handleClose" :append-to-body="true" size="20%">
            <div style="height: 100%;" v-loading="loadingPostData" v-if="loadingPostData"></div>
            <div class="drawer-wrapper" v-else>
                <el-divider content-position="left">推荐角标</el-divider>
                <el-checkbox-group v-model="markCheckboxValue" size="small">
                    <el-checkbox v-for="option of markCheckboxOptions" :key="option.label" :label="option.label" border>{{ option.name }}</el-checkbox>
                </el-checkbox-group>

                <el-divider content-position="left">高亮</el-divider>
                <el-checkbox v-model="isHighlight" class="checkbox-post-highlight drawer-item-content">开启高亮</el-checkbox>
                <template v-if="isHighlight">
                    <el-color-picker v-model="highlightColorValue" show-alpha :predefine="predefineColors"></el-color-picker>
                    <span class="highlight-preview-text" :style="{ color: highlightColorValue }">预览</span>
                </template>

                <el-divider content-position="left">封面头条图</el-divider>
                <el-upload
                    class="upload-cover drawer-item-content"
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
                    :class="{ 'upload-plus-hide': coverUploadProgress === 'uploading' || coverUploadProgress === 'success' || fileList.length >= 1 }"
                >
                    <i slot="default" class="el-icon-plus"></i>
                    <!-- <el-button size="small" type="primary">点击上传</el-button> -->
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
                </el-upload>

                <el-divider content-position="left">设置置顶</el-divider>
                <el-switch v-model="isPostPinned" active-text="置顶" class="switch-post-pinned drawer-item-content"></el-switch>

                <el-divider content-position="left">修改类型</el-divider>
                <el-select v-model="typeSelectValue" placeholder="请选择类型" class="drawer-item-content">
                    <el-option v-for="type in typeOptions" :key="type.value" :label="type.label" :value="type.value"></el-option>
                </el-select>

                <el-divider content-position="left">修改作者</el-divider>
                <el-input v-model="authorInputValue" placeholder="请输入作者uid" class="input-author drawer-item-content"></el-input>

                <el-divider content-position="left">状态变更</el-divider>
                <el-radio-group v-model="statusRadioValue" size="small" class="drawer-item-content">
                    <el-radio label="publish" border>默认</el-radio>
                    <el-radio label="draft" border>草稿</el-radio>
                    <el-radio label="dustbin" border>删除</el-radio>
                </el-radio-group>

                <el-button type="primary" @click="submitChange" :loading="coverUploadProgress === 'uploading' || dataUploading">提交修改</el-button>
            </div>
        </el-drawer>
    </div>
</template>

<script>
import { getRewrite } from '@jx3box/jx3box-common/js/utils';
import { JX3BOX, User } from '@jx3box/jx3box-common';
import { axios } from './api.js';
export default {
    name: 'Admin',
    components: {
        // HelloWorld
    },
    data() {
        return {
            drawerVisible: false,
            loadingPostData: false,
            markCheckboxValue: [],
            markCheckboxOptions: [
                { label: 'newbie', name: '新手易用' },
                { label: 'advanced', name: '进阶推荐' },
                { label: 'topLevel', name: '骨灰必备' },
                { label: 'recommended', name: '编辑精选' },
                { label: 'indexes', name: '索引' },
                { label: 'issueResolved', name: '已解决' },
                { label: 'issueClosed', name: '已关闭' }
            ],
            isHighlight: false,
            highlightColorValue: 'rgb(255,0,1)',
            predefineColors: ['rgb(255,0,1)', 'rgb(2,209,248)', 'rgb(147,217,25)', 'rgb(255,154,2)', 'rgb(255,44,142)', 'rgb(142,46,255)'],
            coverUploadUrl: `${JX3BOX.__server}upload`,
            coverUploadProgress: 'none',
            fileList: [],
            isPostPinned: false,
            typeSelectValue: '',
            typeOptions: [
                { value: 'macro', label: '剑3宏库' },
                { value: 'jx3dat', label: '插件数据' },
                { value: 'fb', label: '副本攻略' },
                { value: 'bps', label: '职业攻略' },
                { value: 'cj', label: '成就百科' },
                { value: 'share', label: '捏脸分享' },
                { value: 'tool', label: '教程工具' },
                { value: 'help', label: '帮助文档' },
                { value: 'post', label: '茶馆交流' }
            ],
            authorInputValue: '',
            statusRadioValue: 'publish',
            dataUploading: false,
        };
    },
    computed: {
        isName() {
            return false;
        }
    },
    methods: {
        openDrawer() {
            // 如果没有作者id，说明是第一次加载，需要先从服务器获取数据
            if (this.authorInputValue === '') {
                this.loadingPostData = true;
                this.fetchServerData();
            }
            // 打开抽屉
            this.drawerVisible = true;
        },
        handleUploadBefore() {
            this.coverUploadProgress = 'uploading';
        },
        handleUploadSuccess(response, file, fileList) {
            if (response.code === 10026) {
                this.coverUploadProgress = 'success';
                this.coverRealUrl = response.data.list[0];
                this.$message.success('上传图片成功');
            }
        },
        handleUploadError(err, file, fileList) {
            this.$message.error('上传图片出错');
            this.coverUploadProgress = 'failed';
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
            axios(`${JX3BOX.__server}post/query?id=${this.pid}`, 'GET', true)
                .then(res => {
                    if (res.code == 10064) {
                        
                        let data = res.data.post
                        console.log(data)
                        this.pid = data.ID
                        if (data.color === null) {
                            this.isHighlight = false
                        } else {
                            this.isHighlight = true
                            this.highlightColorValue = data.color
                        }
                        this.markCheckboxValue = data.mark ? data.mark : []
                        this.authorInputValue = data.post_author.toString()
                        if (data.post_banner) {
                            this.fileList = [{name: data.post_banner, url: data.post_banner}]
                        } else {
                            this.fileList = []
                        }
                        this.statusRadioValue = data.post_status
                        this.typeSelectValue = data.post_type
                        if (data.sticky && data.sticky != 0) {
                            this.isPostPinned = true
                        } else {
                            this.isPostPinned = false
                        }
                    }
                })
                .catch(e => {
                    switch (e.code) {
                        case -1:
                            // 网络异常
                            this.$message.error(e.msg);
                            break;
                        case 9999:
                            this.$message.error('登录失效, 请重新登录');
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
            if (this.authorInputValue.replace(/\ /g, '') === '') {
                this.$confirm('请输入作者uid', '提交失败', {
                    confirmButtonText: '确定',
                    type: 'error',
                    showCancelButton: false,
                    showClose: false
                }).catch(() => {});
                return;
            }
            this.dataUploading = true
            let url = `${JX3BOX.__server}post/setting`;
            if (this.fileList.length >= 1) {
                this.coverRealUrl = this.fileList[0].url
            }
            axios(url, 'POST', true, {
                ID: this.pid,
                color: this.isHighlight ? this.highlightColorValue : null,
                mark: this.markCheckboxValue,
                post_author: this.authorInputValue,
                post_banner: this.coverRealUrl ? this.coverRealUrl : null,
                post_status: this.statusRadioValue,
                post_type: this.typeSelectValue,
                sticky: this.isPostPinned ? Date.now() : 0
            })
            .then((res) => {
                if (res.code === 10070) {
                    this.drawerVisible = false
                    this.$message.success('设置成功！')
                } else {
                    this.$message.error('设置出错！')
                }
            })
            .catch((e) => {
                switch (e.code) {
                    case -1:
                        // 网络异常
                        this.$message.error(e.msg);
                        break;
                    case 9999:
                        this.$message.error('登录失效, 请重新登录');
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
                this.dataUploading = false
            })
        },
        handleClose(done) {
            done();
        },
        handleRemove(file, fileList) {
            this.coverUploadProgress = 'none';
            this.fileList = []
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
        }
    }
};
</script>

<style lang="less">
.el-drawer__wrapper {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    margin: 0;
    .el-drawer__header {
        .mb(10px);
    }
    .el-drawer__body {
        overflow-y: auto;
    }
    .el-divider--horizontal {
        width: 80%;
        .mt(40px);
    }
    .el-checkbox-group {
        margin: 10px;
        .el-checkbox {
            padding: 3px 5px !important;
            border-width: 2px;
            .ml(0) !important;
            .mb(10px);
            .el-checkbox__inner {
                display: none;
            }
            .el-checkbox__label {
                .pl(0);
                line-height: 12px !important;
            }
        }
    }
    .drawer-item-content {
        .ml(10px);
    }
    .checkbox-post-highlight {
        .mr(10px);
        line-height: 40px;
        vertical-align: top;
    }
    .highlight-preview-text {
        .dbi;
        line-height: 40px;
        font-weight: bolder;
        vertical-align: top;
        .ml(20px);
    }
    .upload-cover {
        .el-upload-list--picture-card .el-upload-list__item.is-success {
            width: 90%;
            height: auto;
            line-height: 0;
        }
    }
    .upload-plus-hide .el-upload--picture-card {
        .none;
    }

    .input-author {
        width: 194px;
    }
    .el-radio-group {
        margin: 10px;
        .mt(0);
        .el-radio {
            padding: 5px 5px !important;
            border-width: 2px;
            .ml(0) !important;
            .mb(10px);
            .el-radio__inner {
                display: none;
            }
            .el-radio__label {
                .pl(0);
                line-height: 12px !important;
            }
        }
    }
    .el-button {
        .db;
        .auto(x);
        .mb(20px);
    }
}
.f-manage-panel {
    .dbi;
    .pa;
    top: 8px;
    right: 101px;
    .btn-manage {
        .fz(14px);
        padding: 8px 18px;
    }
}
@media screen and (max-width: @ipad) {
    .f-manage-panel {
        .none;
    }
}
</style>
