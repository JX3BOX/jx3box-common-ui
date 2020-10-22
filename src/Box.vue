<template>
    <div
        class="c-jx3box"
        :class="{ on: status, isOverlay: overlayEnable && isOverlay }"
    >
        <ul class="u-list">
            <li v-for="(item,i) in data" :key="i" :class="{'u-app-start':isLF(item.uuid)}">
                <a class="u-item" :href="item.href" :target="target">
                    <img
                        class="u-pic"
                        svg-inline
                        :src="item.img | getBoxIcon"
                    />
                    <span class="u-txt">{{item.name}}</span>
                </a>
            </li>
        </ul>
        <span class="u-close" @click="closeBox($event)">
            <i class="el-icon-upload2"></i>
            <span>收起</span>
        </span>
    </div>
</template>

<script>
import Bus from "../service/bus";
import { __imgPath } from "@jx3box/jx3box-common/js/jx3box.json";
import origin from "@jx3box/jx3box-common/data/box.json";
import _ from "lodash";
const breakIcons = ['database','fbrank','j3pz']
export default {
    name: "Box",
    props: ["overlayEnable"],
    data: function() {
        return {
            status: false,
            isOverlay: false,
            data : origin,
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
        isLF : function (name){
            return breakIcons.includes(name)
        }
    },
    created: function() {
        if (this.overlayEnable) {
            const vm = this;
            window.addEventListener(
                "scroll",
                _.throttle(() => {
                    vm.isOverlay = window.scrollY > 200 ? true : false;
                }, 200)
            );
        }
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
    filters : {
        getBoxIcon : function (val){
            return __imgPath + 'image' + val
        }
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/box.less";
</style>
