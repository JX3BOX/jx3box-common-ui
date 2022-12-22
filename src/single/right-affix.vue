<template>
  <div class="right-affix">
    <div class="item">
      <fav
        :postId="postId"
        :postType="postType"
        :postTitle="postTitle"
        :hiddenNum="true"
      ></fav>
    </div>
    <el-tooltip
      effect="dark"
      content="回到顶部"
      placement="bottom"
    >
      <div
        class="item"
        v-show="scrollBtnShow"
        @click="goTop"
      >
        <div class="to-top"></div>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import Fav from "../interact/Fav2.vue";
export default {
  name: 'RightAffix',
  props: [
    "postId",
    "postType",
    "postTitle",
  ],
  data () {
    return {
      scrollToptimer: null,
      scrollBtnShow: false,
      isTop: true
    }
  },
  components: {
    Fav,
  },
  methods: {
    goTop () {
      //设置定时器
      const self = this
      this.scrollToptimer = setInterval(function () {
        //获取滚动条距离顶部高度
        var osTop = document.documentElement.scrollTop || document.body.scrollTop;
        var ispeed = Math.floor(-osTop / 7);
        document.documentElement.scrollTop = document.body.scrollTop = osTop + ispeed;
        //到达顶部，清除定时器
        if (osTop === 0) {
          clearInterval(self.scrollToptimer);
        };
        self.isTop = true;
      }, 30);
    }
  },
  mounted () {
    //获取页面可视区高度
    var clientHeight = document.documentElement.clientHeight;
    const self = this
    window.addEventListener('scroll', function () {
      //显示回到顶部按钮
      var osTop = document.documentElement.scrollTop || document.body.scrollTop;
      if (osTop >= clientHeight) {
        self.scrollBtnShow = true
      } else {
        self.scrollBtnShow = false
      };
      //回到顶部过程中用户滚动滚动条，停止定时器
      if (!self.isTop) {
        clearInterval(self.scrollToptimer);
      };
      self.isTop = false;
    })
  }
}
</script>

<style lang="less" scoped>
.right-affix {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    right: 20px;
    top: 25%;
    background-color: #fafbfc;
    padding: 5px;
    z-index: 99999;
    .item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        cursor: pointer;
        &:hover {
            background-color: #eee;
        }
    }
    .to-top {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 15px solid skyblue;
    }
}
</style>