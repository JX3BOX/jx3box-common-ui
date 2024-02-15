<template>
    <div class="m-medal">
        <a
            :href="medalLink(item)"
            target="_blank"
            class="u-medal"
            v-for="item in medals"
            :key="item.id"
            :title="item.medal_desc"
        >
            <img class="u-medal-img" :src="showIcon(item.medal)" />
        </a>
    </div>
</template>

<script>
import { getMedalLink } from "@jx3box/jx3box-common/js/utils";
import { __Root } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "author_medal",
    props: {
        medals: {
            type: Array,
            default: () => [], 
        },
        showIcon: {
            type: Function,
            default: () => true,
        },
    },
    methods: {
        medalLink(medal) {
            if (medal.medal_url) return `${__Root}${medal.medal_url}`
            return medal.rank_id ? getMedalLink(medal.rank_id, medal.medal_type || "rank") : "";
        },
    },
};
</script>

<style lang="less">
.m-medal {
    display: flex;
    .u-medal {
        cursor: pointer;
        .u-medal-img {
            width: 20px;
            height: 20px;
        }
    }
}
</style>
