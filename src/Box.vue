<template>
    <div
        class="c-jx3box"
        :class="{ on: status, isOverlay: overlayEnable && isOverlay }"
    >
        <ul class="u-list">
            <li>
                <a class="u-item" href="/index">
                    <img
                        class="u-pic"
                        svg-inline
                        :src="homeicon"
                    />
                    <img
                        class="u-pic-hover"
                        svg-inline
                        :src="homeicon"
                    />
                    <span class="u-txt">首页</span>
                </a>
            </li>
            <li>
                <a class="u-item" href="/origin">
                    <img
                        class="u-pic"
                        svg-inline
                        :src="originicon"
                    />
                    <img
                        class="u-pic-hover"
                        svg-inline
                        :src="originicon"
                    />
                    <span class="u-txt">怀旧服</span>
                </a>
            </li>
            <li v-for="(item,i) in data" :key="i" :class="{'u-app-start':isLF(item.uuid)}">
                <a class="u-item" :href="item.href" :target="item.href | getTarget">
                    <img
                        class="u-pic"
                        svg-inline
                        :src="item.img | getBoxIcon"
                    />
                    <img
                        class="u-pic-hover"
                        svg-inline
                        :src="item.hover | getBoxIcon"
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
import _ from "lodash";
import Bus from "../service/bus";
import {getBox} from '../service/header.js'
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import box_data from "../assets/data/box.json";
import box_data_origin from "../assets/data/box_origin.json";
const breakIcons = ['database','team','j3pz']

export default {
    name: "Box",
    props: ["overlayEnable",'client'],
    data: function() {
        return {
            status: false,
            isOverlay: false,
            data : this.client == 'origin' ? box_data_origin : box_data,
        };
    },
    computed: {
        homeicon : function (){
            return __imgPath + 'image/box/home.svg'
        },
        homeicon_hover : function (){
            return __imgPath + 'image/box/home_on.svg'
        },
        originicon : function (){
            return __imgPath + 'image/box/origin.svg'
        }
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
        getBox().then((res) => {
            this.data = res.data
        })
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
        },
        getTarget : function (val){
            if(val.startsWith('/')){
                return '_self'
            }else{
                return '_blank'
            }
        }
    },
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/box.less";
</style>
