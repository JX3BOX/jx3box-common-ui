<template>
    <div class="m-medal">
        <a :href="medalLink(item)" class="u-medal" v-for="item in medals" :key="item.id" :title="item.medal_desc">
            <img class="u-medal-img" :src="medalImagePath(item.medal)" alt="">
        </a>
    </div>
</template>

<script>
import { getMedals } from '../../service/next'
import { __imgPath } from '@jx3box/jx3box-common/data/jx3box.json'
import { getMedalLink } from '@jx3box/jx3box-common/js/utils'
export default {
    name: 'author_medal',
    props: {
        authorId: {
            type: Number,
            default: 0
        },
    },
    data() {
        return {
            medals: [],
        }
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
        loadAuthorMedal() {
            getMedals(this.authorId).then(res => {
                this.medals = res.data.data
            })
        },
        medalImagePath(medal) {
            return `${__imgPath}image/medals/user/${medal}.gif`
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
