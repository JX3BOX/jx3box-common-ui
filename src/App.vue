<template>
    <div class="c-container-page">

        <Header></Header>

        <Breadcrumb name="频道名称" slug="slug" root="/slug" :publishEnable="true" :feedbackEnable="true" :adminEnable="true">
            <img slot="logo" svg-inline src="../assets/img/jx3.svg" />
            bread info
        </Breadcrumb>

        <LeftSidebar :open="true">
            <div id="directory"></div>
            <Author :author="author" uid="5507"/>
            <Authorposts uid="2"/>
        </LeftSidebar>

        <Main :withoutLeft="false" :withoutRight="false" style="position:relative;height:5000px">

            <LeftSideToggle :mobileOnly="true"/>

            <Print title="传入标题" />
            <hr>

            <QRcode />
            <hr>

            <Sharing  />
            <hr>

            <Fav post-id="90" post-type="jx3dat"/>
            <hr>

            <Like mode="heart" :count="100" :showCount="true"/>
            <hr>

            <Down :count="100" :showCount="true" />
            <hr>

            <Mark label="KEY" value="VALUE" BGL="#000" BGR="#F39"/>
            <hr>

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
            <hr>

            <WikiRevisions type="achievement" source-id="9096" />
            <hr>

            <WikiComments type="achievement" source-id="9096" />
            <hr>

            <RightSidebar>
                <div style="height:1200px;">
                    
                    <RightSideMsg>Test</RightSideMsg>

                    <Author :author="author" uid="8"/>
                    <Authorposts uid="2"/>

                    <Github_REPO REPO="jx3box-common" coder="8,1"></Github_REPO>

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
import Main from "./Main.vue";
import RightSidebar from "./RightSidebar.vue";
import Footer from "./Footer.vue";
import Bottom from "./Bottom.vue";
import RightSideMsg from "./RightSideMsg.vue";
import Github_REPO from "./Github_REPO.vue";
import Mark from "./Mark.vue";
import Author from "./Author.vue";
import Authorposts from "./Authorposts.vue";
import Fav from "./Fav.vue";
import Like from "./Like.vue";
import Down from "./Down.vue";
import Print from "./Print.vue";
import QRcode from "./QRcode.vue";
import Sharing from "./Sharing.vue";
import LeftSideToggle from "./LeftSideToggle.vue";
import WikiPanel from "./WikiPanel.vue";
import WikiRevisions from "./WikiRevisions.vue";
import WikiComments from "./WikiComments.vue";

import axios from 'axios'
import {__server} from '@jx3box/jx3box-common/js/jx3box.json'
import {WikiPost} from '@jx3box/jx3box-common/js/helper'

export default {
    name : 'App',
    components: {
        Header,
        Breadcrumb,
        LeftSidebar,
        Main,
        RightSidebar,
        Footer,
        Bottom,
        RightSideMsg,
        Github_REPO,
        Mark,
        Author,
        Authorposts,
        Fav,
        Like,
        Down,
        Print,
        Sharing,
        QRcode,
        LeftSideToggle,
        WikiPanel,
        WikiRevisions,
        WikiComments,
    },
    data : function (){
        return {
            author : '',
            wikiPost : null,
        }
    },
    created : function (){
        // axios.get(__server + 'user/info?uid=8').then((res) => {
        //     this.author = res.data.data
        // })

        WikiPost.view(11042).then(
            (res) => {
                res = res.data;
                if (res.code === 200) this.wikiPost = res.data;
            }
        );
    },
    methods : {
        
    }
};
</script>
