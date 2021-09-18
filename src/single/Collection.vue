<template>
    <div class="w-collection" v-if="list && list.length">
        <div class="w-collection-title" @click="handleShow" :class="{ on: visible }">
            <span>
                <i class="el-icon-notebook-1"></i> 该作品已被收录至作者的剑三小册
            </span>
            <a @click.stop :href="id | collectionLink">《{{ title }}》</a>
        </div>
        <transition name="fade">
            <div class="w-collection-list" v-if="visible">
                <ol
                    v-if="list && list.length"
                    class="u-list"
                    :style="{ display: visible ? 'block' : 'none' }"
                >
                    <li v-for="(item, i) in list" :key="i" class="u-item">
                        <a v-if="item" :href="item | showLink" target="_blank">
                            <!-- <i class="el-icon-link"></i> -->
                            {{ item.title }}
                        </a>
                    </li>
                </ol>
            </div>
        </transition>
    </div>
</template>

<script>
import { getLink } from "@jx3box/jx3box-common/js/utils";
import { getCollection } from "../../service/helper";
export default {
    name: "Collection",
    props: ["id",'defaultVisible'],
    inject: [],
    components: {},
    data: function () {
        return {
            visible: this.defaultVisible || false,
            data: {
                title: "",
                posts: [],
            },
        };
    },
    computed: {
        title: function () {
            return this.data?.title;
        },
        list: function () {
            return this.data?.posts;
        },
    },
    watch: {
        id: {
            immediate: true,
            handler: function (val) {
                !!~~val && this.loadData();
            },
        },
        defaultVisible : function (val){
            this.visible = val
        }
    },
    methods: {
        handleShow: function () {
            this.visible = !this.visible;
        },
        loadData: function () {
            getCollection(this.id).then((res) => {
                this.data = res.data?.data?.collection;
            });
        },
    },
    filters: {
        collectionLink: function (id) {
            return getLink("collection", id);
        },
        showLink: function (item) {
            if (item.type == "custom") {
                return item.url;
            } else {
                return getLink(item.type, item.id);
            }
        },
    },
    created: function () {},
    mounted: function () {},
};
</script>

<style scoped lang="less">
.w-collection {
    &-title {
        cursor: pointer;
        position: relative;
        border: 1px solid #ddd;
        background-color: #fafbfc;
        padding: 8px 10px 8px 10px;
        display: block;
        margin-bottom: 0;
        border-radius: 4px;
        line-height: 1.6;
        font-size: 13px;
        letter-spacing: 0.5px;
        i {
            .fz(16px);
            .y(-1px);
        }

        &::after {
            content: ">";
            display: block;
            position: absolute;
            right: 10px;
            top: 8px;
            font-family: "宋体", Consolas;
            color: #aaa;
            -webkit-transform: rotate(0);
            transform: rotate(0);
        }

        a {
            .underline(@color-link);
        }
    }

    counter-reset: collection;
    .u-item {
        .fz(13px,32px);
        border-bottom: 1px solid #eee;
        transition: 0.15s ease-in-out;
        .nobreak;
        a {
            .db;
            &:before {
                counter-increment: collection;
                content: counter(collection) ". ";
                color: #aaa;
                .mr(5px);
            }
            &:hover {
                background-color: #f0f6fd;
                color: @pink;
            }
        }
        &:last-child{
            border-bottom:none;
        }
    }

    .u-list {
        padding: 10px 20px;
        margin: 0;
        border: 1px dashed #ddd;
        background: none;
        border-top: none;
    }

    .on {
        &::after {
            transform: rotate(90deg);
        }
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }

    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
}
</style>