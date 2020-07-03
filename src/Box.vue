<template>
    <div class="c-jx3box" :class="{ on: status }">
        <ul class="u-list">
            <!-- 栏目 -->
            <li>
                <a class="u-item" href="/" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/home.svg"
                    />
                    <span class="u-txt">首页</span>
                </a>
            </li>
            <li>
                <a class="u-item" href="/macro" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/macro.svg"
                    />
                    <span class="u-txt">云端宏</span>
                </a>
            </li>
            <li>
                <a class="u-item" href="/jx3dat" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/jx3dat.svg"
                    />
                    <span class="u-txt">插件数据</span>
                </a>
            </li>
            <li>
                <a class="u-item" href="/fb" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/fb.svg"
                    />
                    <span class="u-txt">副本专栏</span>
                </a>
            </li>
            <li>
                <a class="u-item" href="/bps" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/bps.svg"
                    />
                    <span class="u-txt">职业专栏</span>
                </a>
            </li>
            <li>
                <a class="u-item" href="/cj" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/cj.svg"
                    />
                    <span class="u-txt">成就百科</span>
                </a>
            </li>
            <li>
                <a
                    class="u-item"
                    href="/item"
                    :target="target"
                >
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/item.svg"
                    />
                    <span class="u-txt">物品百科</span>
                </a>
            </li>
            <li>
                <a class="u-item" href="/house" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/house.svg"
                    />
                    <span class="u-txt">家园分享</span>
                </a>
            </li>
            <li>
                <a class="u-item" href="/share" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/share.svg"
                    />
                    <span class="u-txt">捏脸分享</span>
                </a>
            </li>
            <li>
                <a class="u-item" href="/tool" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/tool.svg"
                    />
                    <span class="u-txt">工具教程</span>
                </a>
            </li>
            <li>
                <a class="u-item" href="/bbs" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/bbs.svg"
                    />
                    <span class="u-txt">茶馆交流</span>
                </a>
            </li>
            <li>
                <a
                    class="u-item"
                    href="/emotion"
                    :target="target"
                >
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/pig.svg"
                    />
                    <span class="u-txt">沙雕表情</span>
                </a>
            </li>
            <li>
                <a
                    class="u-item u-doing"
                    href="/wiki"
                    :target="target"
                    title="即将上线"
                >
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/wiki.svg"
                    />
                    <span class="u-txt">剑三百科</span>
                </a>
            </li>

            <li class="u-app-start">
                <a class="u-item" href="/app/database" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/database.svg"
                    />
                    <span class="u-txt">数据库</span>
                </a>
            </li>
            <li>
                <a class="u-item" href="/app/talent" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/talent.svg"
                    />
                    <span class="u-txt">奇穴模拟</span>
                </a>
            </li>
            <li>
                <a class="u-item" href="/app/icons" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/icons.svg"
                    />
                    <span class="u-txt">图标大全</span>
                </a>
            </li>
            <li>
                <a class="u-item" href="/app/macroeditor" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/macroeditor.svg"
                    />
                    <span class="u-txt">宏编辑器</span>
                </a>
            </li>
            <li>
                <a class="u-item" href="/app/servers" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/servers.svg"
                    />
                    <span class="u-txt">开服监控</span>
                </a>
            </li>
            <li>
                <a class="u-item" href="/app/price" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/price.svg"
                    />
                    <span class="u-txt">金价走势</span>
                </a>
            </li>
            <li>
                <a class="u-item" href="/app/facedata" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/mirror.svg"
                    />
                    <span class="u-txt">妆容解析</span>
                </a>
            </li>
            <li>
                <a class="u-item" href="/app/furniture" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/furniture.svg"
                    />
                    <span class="u-txt">家具大全</span>
                </a>
            </li>
            <li>
                <a class="u-item" href="/app/flower" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/flower.svg"
                    />
                    <span class="u-txt">实时花价</span>
                </a>
            </li>

            <li class="u-app-start">
                <a class="u-item" href="/fb/#/rank" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/trophy2.svg"
                    />
                    <span class="u-txt">副本百强</span>
                </a>
            </li>
            <li>
                <a class="u-item" href="/fb/#/skill" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/skull.svg"
                    />
                    <span class="u-txt">副本解包</span>
                </a>
            </li>
            <!-- <li>
                <a class="u-item" href="/bps/#/lua" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/role.svg"
                    />
                    <span class="u-txt">职业源码</span>
                </a>
            </li> -->
            <li>
                <a class="u-item" href="/fb/#/drop" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/drop.svg"
                    />
                    <span class="u-txt">副本掉落</span>
                </a>
            </li>
            <li>
                <a
                    class="u-item u-doing"
                    href="/app/dbm"
                    :target="target"
                    title="即将上线"
                >
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/jx3datbuilder.svg"
                    />
                    <span class="u-txt">数据构建</span>
                </a>
            </li>
            <li>
                <a
                    class="u-item u-doing"
                    href="/app/flog"
                    :target="target"
                    title="即将上线"
                >
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/flog.svg"
                    />
                    <span class="u-txt">战斗分析</span>
                </a>
            </li>
            <li>
                <a
                    class="u-item u-doing"
                    href="/app/team"
                    :target="target"
                    title="即将上线"
                >
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/team.svg"
                    />
                    <span class="u-txt">团队OA</span>
                </a>
            </li>
            <li>
                <a
                    class="u-item"
                    href="/exam"
                    :target="target"
                >
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/100.svg"
                    />
                    <span class="u-txt">趣味题库</span>
                </a>
            </li>
            <li>
                <a class="u-item" href="/app/translator" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/translator.svg"
                    />
                    <span class="u-txt">繁体转换</span>
                </a>
            </li>

            <li class="u-app-start">
                <a class="u-item" href="https://www.j3pz.com/" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/j3pz.svg"
                    />
                    <span class="u-txt">在线配装</span>
                </a>
            </li>
            <li>
                <a
                    class="u-item"
                    href="https://www.j3pz.com/tools/haste/"
                    :target="target"
                >
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/speed.svg"
                    />
                    <span class="u-txt">急速阈值</span>
                </a>
            </li>
            <li>
                <a
                    class="u-item"
                    href="http://minamistudio.online/jx3simulator/index.html"
                    :target="target"
                >
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/minami.svg"
                    />
                    <span class="u-txt">DPS模拟</span>
                </a>
            </li>
            <li>
                <a
                    class="u-item"
                    href="https://j3cx.com/exam/"
                    :target="target"
                >
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/keju.svg"
                    />
                    <span class="u-txt">科举题库</span>
                </a>
            </li>
            <li>
                <a
                    class="u-item"
                    href="https://j3cx.com/serendipity"
                    :target="target"
                >
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/qiyu.svg"
                    />
                    <span class="u-txt">奇遇查询</span>
                </a>
            </li>
            <li>
                <a
                    class="u-item"
                    href="https://www.j3pz.com/tools/prediction/"
                    :target="target"
                >
                    <img
                        class="u-pic"
                        svg-inline
                        src="../assets/img/box/guishi.svg"
                    />
                    <span class="u-txt">瑰石查询</span>
                </a>
            </li>
            <span class="u-close" @click="closeBox($event)">
                <i class="el-icon-upload2"></i>
                <span>收起</span>
            </span>
        </ul>
    </div>
</template>

<script>
import Bus from "../service/bus";
// import { buildTarget } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Box",
    props: [],
    data: function() {
        return {
            status: false,
        };
    },
    computed: {
        target: function() {
            return "_self";
            // return buildTarget();
        },
    },
    methods: {
        closeBox: function() {
            Bus.$emit("toggleBox", false);
        },
    },
    mounted: function() {
        Bus.$on("toggleBox", (status) => {
            if (status == undefined) {
                this.status = !this.status;
            } else {
                this.status = status;
            }
        });
        document.addEventListener("click", function() {
            Bus.$emit("toggleBox", false);
        });
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/box.less";
</style>
