<template>
  <aside
    class="c-sidebar-left c-sidebar m-theme"
    :class="{
            isclose: !isOpen,
            isopen: isOpen,
            'without-bread': withoutBread,
        }"
    v-if="!isApp"
    :style="{backgroundImage:bg}"
  >
    <div class="c-sidebar-left-inner">
      <slot></slot>
    </div>
    <span
      class="c-sidebar-left-toggle"
      :class="!isOpen && 'close-sidebar-left'"
      @click="toggleLeftSide"
      :title="isOpen ? '收起侧边栏' : '打开侧边栏'"
    >
      <!-- <img
        v-show="isOpen"
        svg-inline
        src="../assets/img/leftsidebar/close.svg"
      /> -->
      <span v-show="isOpen"><i class="el-icon-arrow-left"></i></span>
      <span v-show="!isOpen"><i class="el-icon-arrow-right"></i></span>
      <!-- <img
        v-show="!isOpen"
        svg-inline
        src="../assets/img/leftsidebar/open.svg"
      /> -->
    </span>
  </aside>
</template>

<script>
import Bus from "../service/bus";
import { isApp } from "../assets/js/app.js";
import {getDecoration} from "../service/cms"
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import User from '@jx3box/jx3box-common/js/user'
export default {
  name: "LeftSidebar",
  props: ["open", "withoutBread","uid"],
  data: function () {
    return {
      isOpen: true,
      user_id:null,
      isApp: isApp(),
      bg:""
    };
  },
  computed: {
    stickyHeader: function () {
      return this.withoutBread;
    }
  },
  watch: {
    open: function (newval) {
      this.isOpen = newval === undefined ? true : !!newval;
    },
    uid: function (newval) {
      this.user_id = newval ;
      this.getDecoration()

    },
  },
  methods: {
    toggleLeftSide: function () {
      let status = !this.isOpen;
      Bus.$emit("toggleLeftSide", status);
    },
    showDecoration:function(val,type){
        return __imgPath + `decoration/images/${val}/${type}.png`;
    },
    getDecoration(){
      if(!this.user_id){
        return;
      }
      let decoration_sidebar=sessionStorage.getItem('decoration_sidebar'+this.user_id)
      if(decoration_sidebar == 'no'){
        this.bg =""
        return;
      }
      //已有缓存，读取解析
      if(decoration_sidebar){
        this.setDecoration(JSON.parse(decoration_sidebar))
        return;
      }
      getDecoration({using:1,user_id:this.user_id}).then(data=>{
        let res=data.data.data
        if(res.length==0){
          //空 则为无主题，不再加载接口，界面设No
          sessionStorage.setItem('decoration_sidebar'+this.user_id,'no')
          this.bg =""
          return;
        }
        let decoration=res.filter(val => {
          return val.type === 'sidebar'
        })
        if(decoration.length>0){
          sessionStorage.setItem('decoration_sidebar'+this.user_id,JSON.stringify(decoration[0]))
          this.setDecoration(decoration[0])
        }else{
          //空 则为无主题，不再加载接口，界面设No
          sessionStorage.setItem('decoration_sidebar'+this.user_id,'no')
          this.bg =""
        }
      })
    },
    setDecoration(decoration_sidebar){
        this.bg = `url(${this.showDecoration(decoration_sidebar.val,decoration_sidebar.type)})`;
    }
  },
  mounted: function () {
    Bus.$on("toggleLeftSide", (data) => {
      this.isOpen = data;
    });

    if (window.innerWidth < 1024) {
      this.isOpen = false;

      document.addEventListener("click", function () {
        Bus.$emit("toggleLeftSide", false);
      });
    }
  },
  created: function () {
    this.isOpen = this.open === undefined ? true : this.open;
    this.user_id = this.uid
    this.getDecoration()
  },
};
</script>

<style lang="less">
@import "../assets/css/left-sidebar.less";
// 虚拟装扮主题
.m-theme{
  // background: url(../assets/testbg.png) no-repeat;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top right;
}
</style>
