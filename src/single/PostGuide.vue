<template>
    <div class="m-post-guide" v-if="hasGuide">
        <a :href="getPostLink(post.prev_post)" class="el-button el-button--default el-button--small u-prev" :class="{'is-disabled': !post.prev_post }">
            <i class="el-icon-arrow-left"></i>
            <span>上一篇: {{ getPostTitle(post.prev_post) }}</span>
        </a>
        <a :href="getPostLink(post.next_post)" class="el-button el-button--default el-button--small u-next" :class="{'is-disabled': !post.next_post }">
            <span>下一篇: {{ getPostTitle(post.next_post) }}</span>
            <i class="el-icon-arrow-right"></i>
        </a>
    </div>
</template>

<script>
import { getLink } from '@jx3box/jx3box-common/js/utils';
export default {
    props: {
        post: {
            type: Object,
            default: () => {},
        },
    },
    computed: {
        hasGuide() {
            return this.post.prev_post || this.post.next_post;
        }
    },
    methods: {
        getPostLink({ ID: id, post_type }) {
            const link = id ? getLink(post_type, id) : "javascript:;";
            return link;
        },
        getPostTitle(item) {
            return item?.post_title || "";
        }
    },
};
</script>

<style lang="less">
.m-post-guide {
    .flex;
    align-items: center;
    justify-content: space-between;
}

@media screen and (max-width: @phone) {
    .m-post-guide {
        flex-wrap: wrap;

        .u-prev,.u-next {
            width: 100%;
            .nobreak;
        }

        .u-prev {
            margin-bottom: 10px;
        }

        .u-next {
            margin-left: 0;
        }
    }
}
</style>
