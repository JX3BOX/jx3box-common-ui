import Header from './Header.vue'
import Breadcrumb from './Breadcrumb.vue'

import LeftSidebar from './LeftSidebar.vue'
import Main from './Main.vue'
import RightSidebar from './RightSidebar.vue'

import Footer from './Footer.vue'

import Bottom from './Bottom.vue'
import RightSideMsg from './RightSideMsg.vue'
import Github_REPO from './Github_REPO.vue'


const components = {
    Header,
    Breadcrumb,

    LeftSidebar,
    Main,
    RightSidebar,

    Footer,

    Bottom,
    RightSideMsg,
    Github_REPO,

}

const install = function (Vue, Option) {
     Object.keys(components).forEach((key) => {
        Vue.component(components[key].name, components[key])
    })
}

export default {
    install
}