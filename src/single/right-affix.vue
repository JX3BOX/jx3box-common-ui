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
      v-if="showComment"
      effect="dark"
      content="去评论"
      placement="left"
    >
      <div
        class="item"
        @click="toComment"
      >
        <i class="el-icon-chat-dot-square"></i>
      </div>
    </el-tooltip>
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
    "showComment"
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
    },
    toComment () {
      this.$emit('toComment')
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

<style lang="less">
.right-affix {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    right: @aside-right;
    top: @header-height + @bread-height + 100px;
    background-color: #fafbfc;
    padding: 8px 5px;
    z-index: 200;
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    .item {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        cursor: pointer;
        &:hover {
            background-color: #eee;
        }
        .el-icon-chat-dot-square {
            font-size: 20px;
            font-weight: bold;
            color: #3871e0;
        }
    }
    .to-top {
        width: 0;
        height: 0;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 15px solid #5a9cf9;
    }
}
</style>
