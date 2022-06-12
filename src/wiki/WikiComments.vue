<template>
    <WikiPanel class="c-wiki-comments" scene="detail">
        <template slot="head-title">
            <i class="el-icon-chat-line-round"></i>
            <span>百科评论</span>
        </template>
        <template slot="body">
            <div class="m-comments-panel">
                <div class="u-empty" v-if="!comments || !comments.length">
                    <span v-if="comments === null">🎉 数据加载中...</span>
                    <span v-if="comments === false">⚠️ 数据加载异常</span>
                    <span v-if="comments && !comments.length">💧 暂无评论</span>
                </div>
                <!-- 递归评论组件 -->
                <Comment :comments="comments" :source-id="sourceId" />
                <!-- 回复表单 -->
                <div id="m-reply-form" class="m-reply-form">
                    <h4 class="u-title">
                        <i class="el-icon-chat-dot-round"></i>
                        <span>回复</span>
                    </h4>
                    <textarea
                        class="u-reply-content"
                        v-model="reply_form.content"
                    ></textarea>
                    <div class="u-author">
                        <span>昵称：</span>
                        <input v-model="reply_form.user_nickname" type="text" />
                    </div>
                    <el-button
                        type="primary"
                        class="u-submit"
                        @click="create_comment(reply_form)"
                    >
                        <i class="el-icon-check"></i>
                        <span>提交</span>
                    </el-button>
                </div>
            </div>
        </template>
    </WikiPanel>
</template>

<script>
import WikiPanel from "./WikiPanel";
import Comment from "./WikiComment.vue";
import { wikiComment } from "@jx3box/jx3box-common/js/wiki";
import qs from "qs";
import User from "@jx3box/jx3box-common/js/user";

export default {
    name: "WikiComments",
    props: ["type", "sourceId"],
    data() {
        return {
            comments: null,
            reply_form: {
                content: "",
                user_nickname: User.getInfo().name,
            },
        };
    },
    computed: {
        client: function () {
            return location.href.includes("classic") || location.href.includes("origin") ? "origin" : "std";
        },
    },
    methods: {
        get_comments() {
            if (!this.type || !this.sourceId) return;
            // WikiComment.list(this.type, this.sourceId, this.client)
            wikiComment.list({ type: this.type, id: this.sourceId }, { client: this.client })
            .then(
                (res) => {
                    res = res.data;
                    if (res.code === 200) {
                        let comments = res.data.comments;
                        for (let i = 0; i < comments.length; i++) {
                            comments[i]["reply_form"] = {
                                show: false,
                                content: "",
                                user_nickname: User.getInfo().name,
                            };
                        }
                        this.comments = filter(comments, 0);
                    }
                },
                () => {
                    this.comments = false;
                }
            );

            function filter(comments, parent) {
                let outputs = [];
                for (let index in comments) {
                    let c = comments[index];
                    if (!c) continue;
                    if (c.parent_id === parent) {
                        // 置空当前元素
                        comments[index] = null;
                        // 递归执行
                        let children = filter(comments, c.id);
                        c.children = children ? children : [];
                        outputs.push(c);
                    }
                }
                return outputs;
            }
        },
        create_comment(form, parent_id = 0) {
            // 校验评论内容
            if (!form.content) {
                this.$message({
                    message: "请先填写评论内容再尝试提交",
                    type: "warning",
                });
                return;
            }
            const data = {
                comment: {
                    type: this.type,
                    source_id: this.sourceId,
                    parent_id: parent_id,
                    user_nickname: form.user_nickname || User.getInfo().name,
                    content: form.content,
                },
                client: this.client
            }
            wikiComment.post({ data: qs.stringify(data) }, {})
                .then(
                    (res) => {
                        res = res.data;
                        if (res.code === 200) {
                            form.content = "";
                            this.$message({
                                message: "提交成功，请等待审核",
                                type: "success",
                            });
                        } else
                            this.$message({
                                message: `${res.message}`,
                                type: "warning",
                            });
                    },
                    () => {
                        this.$message({
                            message: "网络异常，提交失败",
                            type: "warning",
                        });
                    }
                )
                .finally(() => {
                    form.show = false;
                });
        },
    },
    components: {
        WikiPanel,
        Comment,
    },
    watch: {
        sourceId: {
            immediate: true,
            handler() {
                this.get_comments();
            },
        },
    },
};
</script>

<style lang="less">
@import "../../assets/css/wiki-comments.less";
</style>
