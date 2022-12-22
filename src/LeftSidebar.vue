<template>
  <aside
    class="c-sidebar-left c-sidebar"
    :class="{
            isclose: !isOpen,
            isopen: isOpen,
            'without-bread': withoutBread,
        }"
    v-if="!isApp"
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
      <span v-show="isOpen">&lt;</span>
      <span v-show="!isOpen">&gt;</span>
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
export default {
  name: "LeftSidebar",
  props: ["open", "withoutBread"],
  data: function () {
    return {
      isOpen: true,
      isApp: isApp(),
    };
  },
  computed: {
    stickyHeader: function () {
      return this.withoutBread;
    },
  },
  watch: {
    open: function (newval) {
      this.isOpen = newval === undefined ? true : !!newval;
    },
  },
  methods: {
    toggleLeftSide: function () {
      let status = !this.isOpen;
      Bus.$emit("toggleLeftSide", status);
    },
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
  },
};
</script>

<style lang="less">
@import "../assets/css/left-sidebar.less";
</style>
