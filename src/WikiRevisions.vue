<template>
    <WikiPanel class="c-wiki-revisions" scene="detail">
        <template slot="head-title">
            <i class="el-icon-time"></i>
            <span>历史版本</span>
        </template>
        <template slot="body">
            <div class="m-revisions-panel">
                <div class="u-empty" v-if="!versions || !versions.length">
                    <span v-if="versions === null">🎉 数据加载中...</span>
                    <span v-if="versions === false">⚠️ 数据加载异常</span>
                    <span v-if="versions && !versions.length">💧 暂无数据</span>
                </div>
                <table v-if="versions && versions.length" class="m-histories">
                    <tr>
                        <th>版本</th>
                        <th>更新时间</th>
                        <th>贡献者</th>
                        <th>修订说明</th>
                    </tr>
                    <tr
                        class="history"
                        v-for="(ver, key) in versions"
                        :key="key"
                    >
                        <td>
                            <a
                                :href="link(type, `${ver.source_id}/${ver.id}`)"
                                v-text="'v' + (versions.length - key)"
                            ></a>
                        </td>
                        <td v-text="ts2str(ver.updated)"></td>
                        <td>
                            <a
                                :href="
                                    ver.user_id ? author_url(ver.user_id) : null
                                "
                                v-text="ver.user_nickname"
                            ></a>
                        </td>
                        <td v-text="ver.remark"></td>
                    </tr>
                </table>
            </div>
        </template>
    </WikiPanel>
</template>

<script>
import WikiPanel from "./WikiPanel";
import { WikiPost } from "@jx3box/jx3box-common/js/helper";
import { getLink, authorLink, ts2str } from "@jx3box/jx3box-common/js/utils";

export default {
    name: "WikiRevisions",
    props: ["type", "sourceId"],
    data: function() {
        return {
            versions: null,
        };
    },
    methods: {
        link: getLink,
        author_url: authorLink,
        ts2str,
    },
    components: {
        WikiPanel,
    },
    watch: {
        sourceId: {
            immediate: true,
            handler() {
                if (this.sourceId) {
                    WikiPost.versions(this.type, this.sourceId).then(
                        (res) => {
                            res = res.data;
                            this.versions =
                                res.code === 200 ? res.data.versions : false;
                        },
                        () => {
                            this.versions = false;
                        }
                    );
                }
            },
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/wiki-revisions.less";
</style>
