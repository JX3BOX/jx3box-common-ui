<template>
    <div class="c-container-page">

        <Header></Header>

        <Breadcrumb name="频道名称" slug="slug" root="/slug" :publishEnable="true">
            <img slot="logo" svg-inline src="../assets/img/jx3.svg" />
            bread info
        </Breadcrumb>

        <LeftSidebar>
            <div id="directory"></div>
            left nav
        </LeftSidebar>

        <Main :withoutRight="false" style="position:relative;">

            <Article :content="content" directorybox="#directory" style="padding:20px;" @contentRendered="test1" @directoryRendered="test2"/>

            <Mark label="KEY" value="VALUE" BGL="#000" BGR="#F39"/>

            <RightSidebar>
                <div style="height:1200px;">
                    right extend
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
import Article from "./Article.vue";
import Authorposts from "./Authorposts.vue";

import axios from 'axios'
import {__server} from '@jx3box/jx3box-common/js/jx3box.json'

import demohtml from '../demo/article'

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
        Article,
        Authorposts
    },
    data : function (){
        return {
            author : {},
            content : demohtml
        }
    },
    created : function (){
        axios.get(__server + 'user/info?uid=8').then((res) => {
            this.author = res.data.data
        })
    },
    methods : {
        test1 : function(){
            console.log('文章已渲染')
        },
        test2 :function (){
            console.log('目录已渲染')
        }
    }
};
</script>
