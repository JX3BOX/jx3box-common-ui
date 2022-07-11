<template>
    <ul class="u-comments">
        <li
            class="u-comment-panel"
            v-for="(comment, key) in comments"
            :key="key"
        >
            <div class="u-comment">
                <!-- 评论内容 -->
                <div class="u-nickname-panel">
                    <a
                        class="u-nickname"
                        :href="
                            comment.user_id ? author_url(comment.user_id) : null
                        "
                        target="_blank"
                        v-text="comment.user_nickname"
                    ></a>
                    <template v-if="comment.parent_id">
                        <span>&nbsp;回复&nbsp;</span>
                        <a
                            class="u-nickname"
                            :href="
                                comment.parent.user_id
                                    ? author_url(comment.parent.user_id)
                                    : null
                            "
                            target="_blank"
                            v-text="comment.parent.user_nickname"
                        ></a>
                    </template>
                </div>
                <p class="u-content" v-html="comment.content"></p>
                <!-- 其他 -->
                <div class="m-reply">
                    <!-- 展开、收起 -->
                    <el-button
                        type="default"
                        v-if="comment.reply_form && comment.reply_form.show"
                        class="u-reply"
                        @click="
                            comment.reply_form.show = !comment.reply_form.show
                        "
                    >
                        <i class="el-icon-arrow-up"></i>
                        <span>收起</span>
                    </el-button>
                    <el-button
                        type="primary"
                        plain
                        v-else
                        class="u-reply"
                        @click="
                            comment.reply_form.show = !comment.reply_form.show
                        "
                    >
                        <i class="el-icon-chat-dot-round"></i>
                        <span>回复</span>
                    </el-button>
                    <!-- 更新时间 -->
                    <span
                        class="u-time"
                        v-text="ts2str(comment.updated)"
                    ></span>
                </div>
                <!-- 评论回复表单 -->
                <div class="m-reply-form" v-if="comment.reply_form && comment.reply_form.show">
                    <textarea
                        class="u-reply-content"
                        v-model="comment.reply_form.content"
                    ></textarea>
                    <div class="u-author">
                        <span>昵称：</span>
                        <input
                            v-model="comment.reply_form.user_nickname"
                            type="text"
                        />
                    </div>
                    <el-button
                        type="primary"
                        class="u-submit"
                        @click="create_comment(comment.reply_form, comment.id)"
                    >
                        <i class="el-icon-check"></i>
                        <span>提交</span>
                    </el-button>
                </div>
            </div>
            <WikiComment
                v-if="comment.children.length"
                :comments="comment.children"
                :source-id="sourceId"
            />
        </li>
    </ul>
</template>

<script>
import { authorLink, ts2str } from "@jx3box/jx3box-common/js/utils";

export default {
    name: "WikiComment",
    props: ["comments", "sourceId"],
    methods: {
        author_url: authorLink,
        ts2str,
        create_comment(form, parent_id) {
            let app = this.$parent;
            if (!app.create_comment) app = app.$parent;
            if (!app.create_comment) {
                this.$message({
                    message: "发布评论异常，请联系管理员",
                    type: "warning",
                });
                return;
            }
            app.create_comment(form, parent_id);
        },
    },
};
</script>
