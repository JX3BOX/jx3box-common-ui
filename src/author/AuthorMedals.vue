<template>
    <div class="c-author-medals" v-if="ready">
        <div class="u-label">
            <i class="el-icon-trophy"></i>
            <!-- <img svg-inline src="../../assets/img/leftsidebar/medal.svg" /> -->
            <span>作者荣誉</span>
        </div>
        <div class="u-medals" v-if="medals && medals.length">
            <el-tooltip
                class="item"
                effect="dark"
                :content="item.medal_desc"
                placement="top"
                v-for="item in medals"
                :key="item.id"
            >
                <a :href="getMedalLink(item)" target="_blank" class="u-medal">
                    <img class="u-medal-img" :src="showIcon(item.medal)" />
                </a>
            </el-tooltip>
        </div>
    </div>
</template>

<script>
import { getMedalLink } from "@jx3box/jx3box-common/js/utils";
import { getUserMedals } from "../../service/author";
import { __imgPath, __Root } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "AuthorMedals",
    props: ["uid"],
    components: {},
    data: function () {
        return {
            medals: [],
        };
    },
    computed: {
        ready: function () {
            return this.uid && this.medals && this.medals.length;
        },
    },
    watch: {
        uid: {
            immediate: true,
            handler: function (val) {
                val && this.loadMedals();
            },
        },
    },
    methods: {
        loadMedals: function () {
            getUserMedals(this.uid).then((data) => {
                this.medals = data || [];
            });
        },
        showIcon(medal) {
            return __imgPath + "image/medals/user/" + medal + ".gif";
        },
        getMedalLink(medal) {
            if (medal.medal_url) return `${__Root}${medal.medal_url}`
            return medal.rank_id ? getMedalLink(medal.rank_id, medal.medal_type || "rank") : "";
        },
    },
    created: function () {},
    mounted: function () {},
};
</script>

<style lang="less">
.c-author-medals {
    .u-medals {
        display: flex;
    }
    .u-medal {
        cursor: pointer;
        .mr(2px);
        .u-medal-img {
            width: 20px;
            height: 20px;
        }
    }
}
</style>
