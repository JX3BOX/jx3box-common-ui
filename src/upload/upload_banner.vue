<template>
    <div class="c-upload-banner">
        <el-alert class="u-tip" :title="info" type="info" show-icon></el-alert>
        <div v-if="data" class="u-upload" :style="uploadStyle">
            <img :src="preview" />
            <i class="u-upload-mask"></i>
            <i class="u-upload-delete el-icon-delete" title="移除" @click="remove"></i>
        </div>
        <div v-else class="u-upload el-upload el-upload--picture-card" @click="select">
            <i class="el-icon-plus"></i>
        </div>
        <input class="u-upload-input" type="file" @change="upload" ref="uploadInput" accept=".jpg, .jpeg, .png, .gif, .bmp" />
    </div>
</template>

<script>
import { getThumbnail } from "@jx3box/jx3box-common/js/utils";
import { uploadImage } from '../../service/cms.js';
export default {
    name: 'upload-banner',
    props: {
        content: {
            type: String,
            default: '',
        },
        info: {
            type: String,
            default: '用于展示tips',
        },
        size: {
            type: [Array, Number],
            default: 148,
        }
    },
    data() {
        return {
            data: this.content || '',
        };
    },
    model: {
        prop: 'content',
        event: 'input',
    },
    watch: {
        content(val) {
            this.data = val;
        },
        data(val) {
            this.$emit('input', val);
        },
    },
    computed: {
        fileInput: function () {
            return this.$refs.uploadInput;
        },
        preview() {
            let size = Array.isArray(this.size) ? this.size : [this.size, this.size];
            return getThumbnail(this.data, size, true);
        },
        uploadStyle() {
            let size = Array.isArray(this.size) ? this.size : [this.size, this.size];
            return {
                width: size[0] + 'px',
                height: size[1] + 'px',
            };
        },
    },
    methods: {
        select() {
            this.fileInput.dispatchEvent(new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
            }));
        },
        upload() {
            const file = this.fileInput.files[0];
            if (!file) return;
            const formData = new FormData();
            formData.append('avatar', file);
            uploadImage(formData).then(res => {
                this.data = res.data.data[0];
                this.$message({
                    message: "上传成功",
                    type: "success",
                });
            });
        },
        remove() {
            this.data = '';
        },
    }
}
</script>

<style lang="less">
.c-upload-banner {
    .u-tip{
        padding:5px 15px;
    }
    .u-upload {
        .pr;
        .size(148px);
        .mt(10px);
        img {
            .size(100%);
            .y(bottom);
        }
        .u-upload-mask {
            .none;
            .pa;
            .lt(0);
            .size(100%);
            background-color: rgba(0, 0, 0, 0.6);
        }
        .u-upload-delete {
            .pa;
            .lt(50%);
            .size(24px);
            .fz(24px);
            padding: 40px;
            transform: translate(-50%, -50%);
            color: #fff;
            .pointer;
            .none;
        }
        &:hover {
            .u-upload-mask,
            .u-upload-delete {
                .db;
            }
        }
    }
    .u-upload-input {
        .none;
    }
}
</style>
