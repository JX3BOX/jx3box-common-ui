import Header from './src/Header.vue'
import clientSwitch from './src/header/clientSwitch.vue'
import Breadcrumb from './src/Breadcrumb.vue'
import Admin from './src/Admin.vue'
import Adminbutton from './src/Adminbutton.vue'
import Box from './src/Box.vue'

import LeftSidebar from './src/LeftSidebar.vue'
import LeftSideToggle from './src/LeftSideToggle.vue'
import Main from './src/Main.vue'
import RightSidebar from './src/RightSidebar.vue'
import Footer from './src/Footer.vue'
import Bottom from './src/Bottom.vue'

import RightSideMsg from './src/RightSideMsg.vue'
import Author from './src/Author.vue'
import Authorposts from './src/Authorposts.vue'

import Mark from './src/Mark.vue'
import Like from './src/Like.vue'
import Down from './src/Down.vue'

import Print from './src/Print.vue'
import QRcode from './src/QRcode.vue'
import Sharing from './src/Sharing.vue'

import markBy from './src/markBy.vue'
import tagBy from "./src/tagBy.vue";
import orderBy from "./src/orderBy.vue";
import menuBy from "./src/menuBy.vue";
import clientBy from "./src/clientBy.vue";

import Fav from './src/Fav.vue'
import WikiPanel from './src/WikiPanel.vue'

const components = {
    Header,
    clientSwitch,
    Breadcrumb,
    Admin,
    Adminbutton,
    Box,

    LeftSidebar,
    LeftSideToggle,
    Main,
    RightSidebar,
    Footer,
    Bottom,

    RightSideMsg,
    Author,
    Authorposts,

    Like,
    Down,
    Mark,

    QRcode,
    Print,
    Sharing,

    tagBy,
    orderBy,
    markBy,
    menuBy,
    clientBy,

    Fav,
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