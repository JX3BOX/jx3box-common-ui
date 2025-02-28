<template>
    <el-dialog
        custom-class="m-version-contrast-dialog"
        :title="`版本比对 - ${title}`"
        :visible="modelValue"
        append-to-body
        width="90%"
        @close="close"
    >
        <div class="m-version-container" v-loading="loading">
            <div class="m-toolbar">
                <el-radio-group v-model="type">
                    <el-radio-button :label="item.value" v-for="item in types" :key="item.value">{{
                        item.label
                    }}</el-radio-button>
                </el-radio-group>
                <div class="m-select">
                    <el-select
                        class="u-select"
                        v-model="version1"
                        placeholder="请选择版本1"
                        @change="versionChange($event, 1)"
                    >
                        <el-option
                            v-for="item in versions"
                            :key="item.id"
                            :label="item.version"
                            :value="item.commit_hash"
                        ></el-option>
                        <template v-slot:prefix>
                            <span class="u-label">版本1</span>
                        </template>
                    </el-select>
                    <el-select
                        class="u-select"
                        v-model="version2"
                        placeholder="请选择版本2"
                        @change="versionChange($event, 2)"
                    >
                        <el-option
                            v-for="item in versions"
                            :key="item.id"
                            :label="item.version"
                            :value="item.commit_hash"
                        ></el-option>
                        <template v-slot:prefix> <span class="u-label">版本2</span> </template>
                    </el-select>
                </div>
            </div>
            <div v-if="type === 'view'" class="m-content-container">
                <div class="u-content">
                    <Article :content="content1" />
                </div>
                <div class="u-content">
                    <Article :content="content2" />
                </div>
            </div>
            <div v-if="type === 'code'" class="m-content-container">
                <code-diff
                    class="m-content-view"
                    :old-string="content1"
                    :new-string="content2"
                    :context="1024"
                    output-format="side-by-side"
                    maxHeight="520px"
                    :filename="`${content1Len}字`"
                    :newFilename="`${content2Len}字`"
                    ignoreMatchingLines="data:image/png;base64,"
                ></code-diff>
            </div>
        </div>
    </el-dialog>
</template>

<script>
import { getCommitByHash } from "../../service/commit-history";
import Article from "@jx3box/jx3box-editor/src/Article.vue";
import { CodeDiff } from "v-code-diff";
export default {
    name: "VersionDialog",
    components: {
        CodeDiff,
        Article,
    },
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: "",
        },
        content: {
            type: String,
            default: "",
        },
        commit_hash: {
            type: String,
            default: "",
        },
        link_content_meta_id: {
            type: [Number, String],
            default: 0,
        },
        versions: {
            type: Array,
            default: () => [],
        },
    },
    model: {
        prop: "modelValue",
        event: "update:modelValue",
    },
    emits: ["update:modelValue"],
    data() {
        return {
            loading: false,
            type: "view",
            types: [
                { label: "可视化", value: "view" },
                { label: "源码", value: "code" },
            ],
            version1: "", // 版本1 默认最新，下拉可指定
            version2: "", // 版本2 默认点击的版本，下拉可指定
            content1: "",
            content2: "",
        };
    },
    computed: {
        content1Len() {
            const content = this.content1 || "";
            return content
                .replace(/(<([^>]+)>)/gi, "")
                .replace(/\n/g, "")
                .replace(/\s/g, "")
                .replaceAll("&nbsp;", "").length;
        },
        content2Len() {
            const content = this.content2 || "";
            return content
                .replace(/(<([^>]+)>)/gi, "")
                .replace(/\n/g, "")
                .replace(/\s/g, "")
                .replaceAll("&nbsp;", "").length;
        },
    },
    watch: {
        modelValue: {
            immediate: true,
            handler(val) {
                if (val) {
                    this.content1 = this.content;
                    console.log(this.content, this.content1);
                    this.version2 = this.commit_hash;
                    if (this.version2) {
                        this.load(this.version2, "content2");
                    }
                }
            },
        },
    },
    methods: {
        close() {
            this.$emit("update:modelValue", false);
        },
        versionChange(val, i) {
            if (val) {
                this[`version${i}`] = val;
                const key = `content${i}`;
                this.load(val, key);
            }
        },
        load(hash, key) {
            if (!this.link_content_meta_id) return;
            this.loading = true;
            getCommitByHash(this.link_content_meta_id, hash)
                .then((res) => {
                    this[key] = res.data?.data?.content;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
};
</script>

<style lang="less">
.m-version-contrast-dialog {
    .el-dialog__body {
        padding: 0 20px 20px;
    }
    .m-toolbar {
        display: flex;
        gap: 10px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .m-select {
            display: flex;
            gap: 20px;
            width: 100%;
            .u-select {
                flex: 1;
            }
            .el-input--prefix .el-input__inner {
                padding-left: 55px;
            }
            .el-input__prefix {
                left: 10px;
                top: 10px;
            }
        }
    }
    .m-content-container {
        display: flex;
        gap: 20px;
        margin-top: 20px;
        max-height: 520px;
        overflow-x: hidden;
        overflow-y: auto;
        .u-content {
            flex: 1;
            border: 1px solid #ebeef5;
            padding: 20px;
            box-sizing: border-box;
            .r(5px);
        }
        .m-content-view {
            margin: 0;
        }
    }
}
</style>
