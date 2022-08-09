<template>
    <div class="c-author-medals" v-if="ready">
        <div class="u-label">
            <i class="el-icon-trophy"></i>
            <span>作者荣誉</span>
        </div>
        <div class="u-medals" v-if="medals && medals.length">
            <a
                :href="getMedalLink(item)"
                target="_blank"
                class="u-medal"
                v-for="item in medals"
                :key="item.id"
                :title="item.medal_desc"
            >
                <img class="u-medal-img" :src="showIcon(item.medal)" />
            </a>
        </div>
    </div>
</template>

<script>
import { getMedalLink } from "@jx3box/jx3box-common/js/utils";
import { getUserMedals } from "../../service/author";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
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
            return getMedalLink(medal.rank_id, (medal.medal_type = "rank"));
        },
    },
    created: function () {},
    mounted: function () {},
};
</script>

<style scoped lang="less">
.c-author-medals {
    .u-label {
        i {
            .y;
        }
    }
    .u-medals {
        display: flex;
        .u-medal {
            cursor: pointer;
            .u-medal-img {
                width: 20px;
                height: 20px;
            }
        }
    }
}
</style>
