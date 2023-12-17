<template>
    <div class="m-single-collection" v-if="list && list.length">
        <!-- <div class="u-title"><i class="el-icon-connection"></i> 关联</div>
        <ul class="u-list">
            <li v-for="(item, i) in list" :key="i">
                <el-tooltip class="item" effect="dark" :content="item.title" placement="left">
                    <a :href="showLink(item)" target="_blank">
                        <i class="el-icon-link"></i>
                        {{ item.title }}
                    </a>
                </el-tooltip>
            </li>
        </ul> -->
        <a class="u-image" :href="`collection/${store.id}`">
            <img :src="getCover(store.image)" />
        </a>
    </div>
</template>

<script>
import { showAvatar, getLink, resolveImagePath, authorLink } from "@jx3box/jx3box-common/js/utils";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { getCollection } from "../../service/cms";
export default {
    name: "PostCollection",
    props: ["id", "store"],
    components: {},
    data: function() {
        return {
            data: {
                title: "",
                posts: [],
            },
        };
    },
    computed: {
        list: function() {
            return this.store?.posts || this.data?.posts;
        },
    },
    watch: {
        id: {
            immediate: true,
            handler: function(val) {
                !!~~val && this.loadData();
            },
        },
    },
    methods: {
        loadData: function() {
            getCollection(this.id).then((res) => {
                this.data = res.data?.data;
            });
        },
        showLink: function(item) {
            if (item.type == "custom") {
                return item.url;
            } else {
                return getLink(item.type, item.id);
            }
        },
        getCover: function (val) {
            return val ? resolveImagePath(val) : `${__imgPath}image/collection/default_cover.png`;
        },
    },
};
</script>
<style scoped lang="less">
.m-single-collection {
    .u-image {
        img {
            .w(100%);
            height: 226px;
            object-fit: cover;
            // border-radius: 4px;
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
        }
        a {
            .db;
            transition: 0.15s ease-in-out;
            .nobreak;
            &:hover {
                background-color: #e6f0fb;
            }
        }
    }
}
</style>
