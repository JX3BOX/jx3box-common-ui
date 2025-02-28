<template>
    <div class="m-post-version" v-if="list && list.length">
        <div class="m-title">
            <div class="u-title"><i class="el-icon-time"></i> 历史版本</div>
            <div class="u-op" @click="toggle"><i class="el-icon-d-caret"></i> 折叠</div>
        </div>
        <ul v-show="show" class="u-list">
            <!-- <el-button @click="onAdd">创建</el-button> -->
            <li v-for="(item, i) in list" class="u-item" :key="i">
                <div class="u-version">
                    <span>{{ item.version }}</span> - <span>{{ item.created_at }}</span>
                </div>
                <el-button size="small" type="text" @click="handleContrast(item)">对比</el-button>
            </li>
        </ul>
        <el-pagination small layout="prev, pager, next" :total="total" :current-page.sync="index" hide-on-single-page>
        </el-pagination>
        <version-dialog
            v-if="visible"
            v-model="visible"
            :link_content_meta_id="link_content_meta_id"
            :title="title"
            :content="content"
            :commit_hash="commit_hash"
            :versions="list"
        ></version-dialog>
    </div>
</template>

<script>
import { getCommitHistories, commitHistory } from "../../service/commit-history";
import VersionDialog from "./VersionDialog.vue";
export default {
    name: "PostVersion",
    props: ["post"],
    components: { VersionDialog },
    data() {
        return {
            loading: false,
            index: 1,
            pageSize: 50,
            total: 0,
            list: [],
            show: true,
            visible: false,
            commit_hash: "",
        };
    },
    computed: {
        link_content_meta_id() {
            return this.post?.link_content_meta_id || 0;
        },
        content() {
            return this.post?.post_content || "";
        },
        title() {
            return this.post?.post_title || "";
        },
        pageParams() {
            return {
                index: this.index,
                pageSize: this.pageSize,
            };
        },
    },
    watch: {
        link_content_meta_id: {
            immediate: true,
            handler: function (val) {
                !!val && this.load();
            },
        },
        page() {
            this.load();
        },
    },
    methods: {
        onAdd() {
            commitHistory(this.link_content_meta_id, {
                commit: "提交测试4",
                content: `每日机缘4`,
            })
                .then((res) => {
                    this.$message.success("创建成功");
                    this.load();
                })
                .catch((err) => {
                    this.$message.error(err.message);
                });
        },
        handleContrast(item) {
            this.commit_hash = item.commit_hash;
            this.visible = true;
        },
        load() {
            this.loading = true;
            getCommitHistories(this.link_content_meta_id, this.pageParams)
                .then((res) => {
                    const list = res.data?.data?.list || [];
                    if (list.length) {
                        this.list = list.map((item, i) => {
                            return {
                                ...item,
                                version: "v" + (list.length - i),
                            };
                        });
                        this.total = res.data?.data?.page?.total || 0;
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        toggle() {
            this.show = !this.show;
        },
    },
};
</script>
<style scoped lang="less">
.m-post-version {
    .m-title {
        .flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
        .u-op {
            font-size: 14px;
            float: right;
            padding: 0 5px;
            line-height: 25px;
            color: #cdd1db;
            cursor: pointer;
            &:hover {
                color: #a1a9bb;
            }
        }
    }
    .u-title {
        font-weight: 300;
        font-size: 20px;
    }
    .u-list {
        list-style: none;
        padding: 10px 20px;
        margin: 0;
        li {
            .fz(13px, 36px);
            .flex;
            justify-content: space-between;
            align-items: center;
            transition: 0.15s ease-in-out;
            .nobreak;
            &:hover {
                background-color: #e6f0fb;
            }
        }
    }
}
</style>
