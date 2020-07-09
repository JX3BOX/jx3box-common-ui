import Header from './src/Header.vue'
import Breadcrumb from './src/Breadcrumb.vue'

import LeftSidebar from './src/LeftSidebar.vue'
import Main from './src/Main.vue'
import RightSidebar from './src/RightSidebar.vue'

import Footer from './src/Footer.vue'

import Bottom from './src/Bottom.vue'
import RightSideMsg from './src/RightSideMsg.vue'
import Github_REPO from './src/Github_REPO.vue'
import Mark from './src/Mark.vue'
import Author from './src/Author.vue'
import Authorposts from './src/Authorposts.vue'

import Admin from './src/Admin.vue'

import Fav from './src/Fav.vue'
import Like from './src/Like.vue'
import Down from './src/Down.vue'
import Print from './src/Print.vue'
import QRcode from './src/QRcode.vue'
import Sharing from './src/Sharing.vue'

import Box from './src/Box.vue'


const components = {
    Header,
    Breadcrumb,
    
    Box,

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
    
    
    Admin,

    Fav,
    Like,
    Down,

    QRcode,
    Print,
    Sharing

}

const install = function (Vue, Option) {
    Object.keys(components).forEach((key) => {
        Vue.component(components[key].name, components[key])
    })
}

export default {
    install
}