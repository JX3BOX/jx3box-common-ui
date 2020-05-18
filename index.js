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
import Article from './src/Article.vue'
import Authorposts from './src/Authorposts.vue'


const components = {
    Header,
    Breadcrumb,

    LeftSidebar,
    Main,
    Article,
    RightSidebar,

    Footer,

    Bottom,
    RightSideMsg,
    Github_REPO,
    Mark,

    Author,
    Authorposts

}

const install = function (Vue, Option) {
     Object.keys(components).forEach((key) => {
        Vue.component(components[key].name, components[key])
    })
}

export default {
    install
}