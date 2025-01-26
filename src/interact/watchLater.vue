<template>
    <div class="w-watch-later" @click="onWatchLaterClick">
        <el-tooltip effect="dark" :content="favContent" placement="top-start">
            <div>
                <img v-if="favorite" class="u-icon" svg-inline :src="rmSrc" />
                <img v-else class="u-icon" svg-inline :src="addSrc" />
            </div>
        </el-tooltip>
    </div>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
import { __cdn } from "@jx3box/jx3box-common/data/jx3box.json";
import { addWatchLater, delWatchLater } from "../../service/fav";
import { omit } from "lodash";
export default {
    name: "WatchLater",
    props: {
        category: {
            type: String,
            default: "article",
        },
        title: {
            type: String,
            default: "",
        },
        authorId: {
            type: Number,
            default: 0,
        },
        banner: {
            type: String,
            default: "",
        },
    },
    data: function () {
        return {
            login: User.isLogin(),
            favorite: false,
        };
    },
    computed: {
        favContent() {
            return this.favorite ? "已添加稍后在看" : "添加至稍后再看";
        },
        addSrc() {
            return __cdn + "design/vector/icon/time.svg"
        },
        rmSrc() {
            return __cdn + "design/vector/icon/time1.svg"
        },
        data() {
            return {
                category: this.category,
                link: location.href,
                title: this.title,
                author_id: this.authorId,
                banner: this.banner,
            }
        }
    },
    methods: {
        onWatchLaterClick: function () {
            if (this.login) {
                this.favorite ? this.rmWatchLater() : this.addWatchLater();
            } else {
                User.toLogin();
            }
        },
        addWatchLater: function () {
            // add watch later
            addWatchLater(this.data).then((res) => {
                this.favorite = true;
            });
        },
        rmWatchLater: function () {
            // remove watch later
            delWatchLater(omit(this.data, ['title'])).then(() => {
                this.favorite = false;
            });
        },
    }
}
</script>

<style lang="less">
.w-watch-later {
    .pointer;
    .dbi;
    .u-icon {
        .size(26px);
        .y;
        .pr;
    }
    .u-count {
        color: #888;
        .ml(10px);
        top: 4px;
        .pr;
    }
}
</style>
