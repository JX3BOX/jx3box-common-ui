<template>
    <div class="c-container-page">

        <Header></Header>

        <Breadcrumb name="频道名称" slug="slug" root="/slug" :publishEnable="true">
            <img slot="logo" svg-inline src="../assets/img/jx3.svg" />
            bread info
        </Breadcrumb>

        <LeftSidebar>
            left nav
        </LeftSidebar>

        <Main :withoutRight="false" style="position:relative">

            primary content
            <Mark label="KEY" value="VALUE" BGL="#000" BGR="#F39"/>

            <RightSidebar>
                right extend
                <RightSideMsg>Test</RightSideMsg>
                <Postauthor :author="author"/>
                <Github_REPO REPO="jx3box-common" coder="8,1"></Github_REPO>
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
import Postauthor from "./Postauthor.vue";

import axios from 'axios'
import {__server} from '@jx3box/jx3box-common/js/jx3box.json'

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
        Postauthor
    },
    data : function (){
        return {
            author : {}
        }
    },
    created : function (){
        axios.get(__server + 'user/info?uid=8').then((res) => {
            this.author = res.data.data
        })
    }
};
</script>
