import Header from './src/Header.vue'
import Box from './src/Box.vue'
import Breadcrumb from './src/Breadcrumb.vue'

import LeftSidebar from './src/LeftSidebar.vue'
import LeftSideToggle from './src/LeftSideToggle.vue'
import Author from './src/Author.vue'
import Avatar from './src/Avatar.vue'
import RightSidebar from './src/RightSidebar.vue'
import RightSideMsg from './src/RightSideMsg.vue'
import Main from './src/Main.vue'
import Footer from './src/Footer.vue'
import Bottom from './src/Bottom.vue'

import Mark from './src/interact/Mark.vue'
import Like from './src/interact/Like.vue'
import Down from './src/interact/Down.vue'
import Fav from './src/interact/Fav.vue'
import Print from './src/interact/Print.vue'
import QRcode from './src/interact/QRcode.vue'
import Sharing from './src/interact/Sharing.vue'
import Feed from './src/interact/Feed.vue'

import markBy from './src/filters/markBy.vue'
import tagBy from "./src/filters/tagBy.vue";
import orderBy from "./src/filters/orderBy.vue";
import menuBy from "./src/filters/menuBy.vue";
import clientBy from "./src/filters/clientBy.vue";
import zlpBy from "./src/filters/zlpBy.vue";

import Thx from './src/single/Thx.vue'
import WikiPanel from './src/wiki/WikiPanel.vue'

const components = {
    Header,
    Breadcrumb,
    Box,

    LeftSidebar,
    LeftSideToggle,
    Main,
    RightSidebar,
    Footer,
    Bottom,

    RightSideMsg,
    Author,
    Avatar,

    Thx,
    Like,
    Down,
    Mark,
    Fav,
    QRcode,
    Print,
    Sharing,
    Feed,

    tagBy,
    orderBy,
    markBy,
    menuBy,
    clientBy,
    zlpBy,

    WikiPanel,
}

const install = function (Vue, Option) {
    Object.keys(components).forEach((key) => {
        Vue.component(components[key].name, components[key])
    })
}

export default {
    install
}