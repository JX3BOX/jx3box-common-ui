<template>
    <div class="m-medal">
        <a :href="medalLink(item)" target="_blank" class="u-medal" v-for="item in medals" :key="item.id" :title="item.medal_desc">
            <img class="u-medal-img" :src="showIcon(item.medal)">
        </a>
    </div>
</template>

<script>
import { getMedalLink } from '@jx3box/jx3box-common/js/utils'
export default {
    name: 'author_medal',
    props: {
        medals: {
            type: Array,
            default: () => [], // [{ rank_id, medal_desc, medal }]
        },
        showIcon: {
            type: Function,
            default: () => true,
        }
    },
    methods: {

        medalLink({ rank_id, medal_type = 'rank' }) {
            return getMedalLink(rank_id, medal_type)
        }
    }
}
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
