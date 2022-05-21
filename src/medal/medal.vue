<template>
    <div class="m-medal">
        <a :href="medalLink(item)" class="u-medal" v-for="item in medals" :key="item.id" :title="item.medal_desc">
            <img class="u-medal-img" :onerror="`this.src=${errorPath}`" :src="medalImagePath(item.medal)" alt="">
        </a>
    </div>
</template>

<script>
import { __imgPath } from '@jx3box/jx3box-common/data/jx3box.json'
import { getMedalLink } from '@jx3box/jx3box-common/js/utils'
export default {
    name: 'author_medal',
    props: {
        medals: {
            type: Array,
            default: () => [], // [{ id, medal_desc, medal }]
        },
        subtype: {
            type: String,
            default: '', // team, user
        },
    },
    watch: {
        authorId: {
            immediate: true,
            handler(val) {
                val && this.loadAuthorMedal()
            }
        }
    },
    methods: {
        medalImagePath(medal) {
            return `${__imgPath}image/medals/${this.subtype}/${medal}.gif`
        },
        errorPath(medal) {
            return `${__imgPath}image/medals/${this.subtype}/${medal}.png`
        },
        medalLink({ rank_id, subtype }) {
            return getMedalLink(rank_id, subtype)
        }
    }
}
</script>

<style lang="less" scoped>
.m-medal {
    display: block;
    margin: 5px 0;

    .u-medal {
        cursor: pointer;
        .u-medal-img {
            width: 20px;
            height: 20px;
            margin-right: 5px;
        }
    }
}
</style>
