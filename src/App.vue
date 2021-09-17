<template>
    <div class="container-page">
        <Header></Header>
        <Breadcrumb
            name="频道名称"
            slug="slug"
            root="/slug"
            :publishEnable="true"
            :feedbackEnable="true"
            :adminEnable="true"
        >
            <img slot="logo" svg-inline src="../assets/img/jx3.svg" />
            bread info
        </Breadcrumb>

        <LeftSidebar :open="true">
            <LeftSideToggle :mobileOnly="true" />
            <div id="directory"></div>
            <Author :author="author" :uid="8" />
        </LeftSidebar>

        <Main :withoutLeft="false" :withoutRight="false">
            
            
            <Creators :postId="28" style="margin-bottom:10px"/>
            <Collection :id="59" :defaultVisible="true"/>
            <UserPop title="添加用户" v-model="visible" @confirm="addUser"/>
            <el-button @click="visible = true">用户POP</el-button>

            <Thx :postId="23865" postType="bbs" :userId="7" :adminBoxcoinEnable="true" :userBoxcoinEnable="true"/>

            <hr />

            <Like mode="heart" :count="100" :showCount="true" />
            <Down :count="100" :showCount="true" />
            <Mark label="KEY" value="VALUE" BGL="#000" BGR="#F39" />
            <Fav post-id="90" post-type="jx3dat" />
            <Feed post-id="90" post-type="jx3dat" />
            <Print title="传入标题" />
            <QRcode />
            <Sharing />

            <hr />

            <markBy />
            <menuBy :data="['test1', 'test2']" />
            <orderBy />
            <tagBy :data="['PVE', 'PVX']" :type="tag"/>
            <clientBy type=""/>
            <zlpBy/>

            <hr />

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
                <template slot="body"
                    >正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容正文内容</template
                >
            </WikiPanel>
            <hr />

            <WikiRevisions type="achievement" source-id="9096" />
            <hr>

            <WikiComments type="achievement" source-id="9096" />
            <hr>

            <RightSidebar>
                <div style="height:1200px;">
                    <RightSideMsg>Test</RightSideMsg>

                    <Author :author="author" uid="5" />
                </div>
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
import UserPop from "./author/UserPop.vue";

import Main from "./Main.vue";
import RightSidebar from "./RightSidebar.vue";
import RightSideMsg from "./RightSideMsg.vue";

import Footer from "./Footer.vue";
import Bottom from "./Bottom.vue";

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

import WikiPanel from "./wiki/WikiPanel.vue";
import WikiRevisions from "./wiki/WikiRevisions.vue";
import WikiComments from "./wiki/WikiComments.vue";

import axios from "axios";
import { __server } from "@jx3box/jx3box-common/data/jx3box.json";
import { WikiPost } from "@jx3box/jx3box-common/js/helper";

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

        Thx,
        Collection,
        Creators,

        RightSideMsg,
        Author,
        // Authorposts,

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

        WikiPanel,
        WikiRevisions,
        WikiComments,

        UserPop
    },
    data: function() {
        return {
            author: "",
            wikiPost: null,
            tag : '',
            visible : false,
        };
    },
    created: function() {
        WikiPost.view(11042).then(
            (res) => {
                res = res.data;
                if (res.code === 200) this.wikiPost = res.data;
            }
        );
    },
    methods: {
        addUser : function (val){
            console.log(val)
        }
    },
};
</script>
