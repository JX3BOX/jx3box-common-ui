<template>
  <div class="container-page">
    <Header></Header>
    <Breadcrumb name="频道名称" slug="slug" root="/slug" :publishEnable="true" :feedbackEnable="true" :adminEnable="true">
      <img slot="logo" svg-inline src="../assets/img/jx3.svg" />
      bread info
    </Breadcrumb>

    <LeftSidebar :open="true" :uid="8">
      <LeftSideToggle :mobileOnly="true" />
      <Author :author="author" :uid="8" />
    </LeftSidebar>

    <Main :withoutLeft="false" :withoutRight="false">
      <el-tabs v-model="tab" type="card">
        <el-tab-pane label="CMS作品" name="post">
          <el-radio-group v-model="post_id">
            <el-radio label="41346">临时测试</el-radio>
            <el-radio label="35605">Markdown</el-radio>
            <el-radio label="32035">仅小册</el-radio>
            <el-radio label="30017">仅联合创作者</el-radio>
            <el-radio label="30582">小册和联合创作者</el-radio>
            <el-radio label="31129">无小册和联合创作者</el-radio>
          </el-radio-group>
          <singlebox :post="post" @extendUpdate="updateExtend" />
        </el-tab-pane>
        <el-tab-pane label="通用组件" name="widget">
          <PostHeader :post="post" />
          <Creators :postId="30432" style="margin-bottom: 10px" />
          <Collection :id="59" :defaultVisible="true" />
          <UserPop title="添加用户" v-model="visible" @confirm="addUser" />
          <el-button @click="visible = true">用户POP</el-button>
          <Thx :postId="23865" postType="bbs" postTitle="bbs23865的标题" type="batchReward" :userId="7"
            :adminBoxcoinEnable="true" :userBoxcoinEnable="true"
            :items="[{ user_id: 10, article_id: '11111', article_type: '' }]" />
          <hr />
          <Like mode="heart" :count="100" :showCount="true" />
          <Down :count="100" :showCount="true" />
          <Mark label="KEY" value="VALUE" BGL="#000" BGR="#F39" />
          <Fav post-id="90" post-type="jx3dat" post-title="jx3dat测试标题" />
          <Feed post-id="90" post-type="jx3dat" />
          <Print title="传入标题" />
          <QRcode />
          <Sharing />

          <hr />

          <markBy />
          <menuBy :data="['test1', 'test2']" />
          <orderBy />
          <tagBy :data="['PVE', 'PVX']" :type="tag" />
          <clientBy type="" />
          <zlpBy />

          <hr />
          <uploadImage v-model="upload" info="非必选。首页海报尺寸1100*300（推荐2200*600支持高分屏），最大20M。"></uploadImage>
          <AuthorMedal :author-id="8"></AuthorMedal>
        </el-tab-pane>
        <el-tab-pane label="百科组件" name="wiki">
          <WikiPanel :wiki-post="wikiPost">
            <template slot="head-title">
              <i class="el-icon-location-information"></i>
              <span class="u-title">通识正文</span>
            </template>
            <template slot="head-actions">
              <a class="el-button el-button--primary u-publish">
                <i class="el-icon-edit"></i>
                <span>完善百科通识</span>
              </a>
              <span class="u-more">查看更多</span>
            </template>
            <template slot="body">正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容</template>
          </WikiPanel>
          <hr />

          <WikiRevisions type="achievement" source-id="2996" />
          <hr />

          <WikiComments type="achievement" source-id="2996" />
          <hr />
        </el-tab-pane>
        <el-tab-pane label="头像" name="avatar">
          <el-radio-group v-model="avatar_size">
            <el-radio label="xxs">xxs-36/48</el-radio>
            <el-radio label="xs">xs-48/68</el-radio>
            <el-radio label="s">s-68/88</el-radio>
            <el-radio label="m">m-88/123</el-radio>
            <el-radio label="l">l-120/168</el-radio>
            <el-radio label="xl">xl-150/210</el-radio>
          </el-radio-group>
          <div style="padding:60px;background-color: #e3e3e3;">
            <Avatar :id="8" url="https://console.cnyixun.com/upload/avatar/2022/3/2/8_9860765.png" :size="avatar_size"
              frame="moon_1" />
          </div>
        </el-tab-pane>
      </el-tabs>

      <RightSidebar>
        <RightSideMsg>Hello</RightSideMsg>
        <div id="directory"></div>
        <PostCollection :id="59" />
      </RightSidebar>

      <Footer></Footer>
      <Bottom></Bottom>
    </Main>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Breadcrumb from "./Breadcrumb.vue";

import LeftSidebar from "./LeftSidebar.vue";
import LeftSideToggle from "./LeftSideToggle.vue";
import Author from "./Author.vue";
import Avatar from "./author/Avatar.vue";
import UserPop from "./author/UserPop.vue";

import Main from "./Main.vue";
import RightSidebar from "./RightSidebar.vue";
import RightSideMsg from "./RightSideMsg.vue";

import Footer from "./Footer.vue";
import Bottom from "./Bottom.vue";

// import cmsList from "./list/cms-list.vue";
import singlebox from "./single/cms-single.vue";
import PostHeader from "./single/PostHeader.vue";
import PostCollection from "./single/PostCollection.vue";

import Thx from "./single/Thx.vue";
import Collection from "./single/Collection.vue";
import Creators from "./single/Creators.vue";

import Mark from "./interact/Mark.vue";
import Fav from "./interact/Fav.vue";
import Like from "./interact/Like.vue";
import Down from "./interact/Down.vue";
import Print from "./interact/Print.vue";
import QRcode from "./interact/QRcode.vue";
import Sharing from "./interact/Sharing.vue";
import Feed from "./interact/Feed.vue";

import markBy from "./filters/markBy.vue";
import menuBy from "./filters/menuBy.vue";
import orderBy from "./filters/orderBy.vue";
import tagBy from "./filters/tagBy.vue";
import clientBy from "./filters/clientBy.vue";
import zlpBy from "./filters/zlpBy.vue";

import uploadImage from "./upload/upload_banner.vue";
import AuthorMedal from "./medal/medal.vue";

import WikiPanel from "./wiki/WikiPanel.vue";
import WikiRevisions from "./wiki/WikiRevisions.vue";
import WikiComments from "./wiki/WikiComments.vue";
import axios from "axios";
import { __server } from "@jx3box/jx3box-common/data/jx3box.json";
import { wiki } from "@jx3box/jx3box-common/js/wiki";

export default {
  name: "App",
  components: {
    Header,
    Breadcrumb,
    LeftSidebar,
    LeftSideToggle,
    Main,
    Footer,
    Bottom,
    RightSidebar,

    // cmsList,
    singlebox,
    PostHeader,
    PostCollection,

    Thx,
    Collection,
    Creators,

    RightSideMsg,
    Author,
    Avatar,

    Mark,
    Like,
    Down,
    Fav,
    Feed,

    Print,
    Sharing,
    QRcode,

    markBy,
    menuBy,
    orderBy,
    tagBy,
    clientBy,
    zlpBy,

    uploadImage,
    AuthorMedal,

    WikiPanel,
    WikiRevisions,
    WikiComments,

    UserPop,
  },
  data: function () {
    return {
      tab: "avatar",

      post: "",
      post_id: "35605",

      author: "",
      wikiPost: null,
      tag: "",
      visible: false,

      avatar_size: 'xl',

      upload: "",
      text: `<Text>text="使用：<BUFF 3222 1 desc>，持续<BUFF 3222 1 time>。\\\n" font=105 </text><Text>text="红豆沙做馅儿，精致细腻的广式月饼。" font=100 </text><Text>text="使用：能在唐门套装供应商处换取如下装备。\\\n" font=105 </text><Text>text="[燕云·重泉靴]" name="iteminfolink" eventid=513 script="this.nVersion=0 this.dwTabType=7 this.dwIndex=35244 this.OnItemLButtonDown=function() OnItemLinkDown(this) end" font=100 r=255 g=40 b=255 </text><Text>text="，" font=105 </text><Text>text="[燕云·铭松靴]" name="iteminfolink" eventid=513 script="this.nVersion=0 this.dwTabType=7 this.dwIndex=35245 this.OnItemLButtonDown=function() OnItemLinkDown(this) end" font=100 r=255 g=40 b=255 </text><Text>text="。" font=100 </text>`,
    };
  },
  created: function () {
    wiki.getById(25594).then((res) => {
      res = res.data;
      this.wikiPost = res.data;
    });
  },
  methods: {
    addUser: function (val) {
      console.log(val);
    },
    loadPost: function () {
      axios.get(`/api/cms/post/${this.post_id}`).then((res) => {
        this.post = res.data.data;
        this.$forceUpdate();
      });
    },
    updateExtend: function (val) {
      console.log(val);
    },
  },
  watch: {
    post_id: {
      immediate: true,
      handler: function (val) {
        this.loadPost();
      },
    },
  },
};
</script>

<style lang="less">
body {
  padding-top: 0;
}
</style>
