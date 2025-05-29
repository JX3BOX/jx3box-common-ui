<!--
 * @Author: zhusha
 * @Date: 2025-05-13 10:00:27
 * @LastEditors: zhusha
 * @LastEditTime: 2025-05-20 17:53:49
 * @Description: 悬浮窗组件
 * 关于搜索跳转的问题：如果项目需要跳转微信原生界面，需要引入微信sdk，并使用微信提供的api进行跳转
 <script type="text/javascript" src="https://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>  版本可根据需要查询微信官方文档
 然后在需要跳转的地方使用以下代码进行跳转
 例如： wx.miniProgram.navigateTo({ url: "/pages/search/search-detail/search-detail?" + params });
 params为跳转的参数，需要根据项目实际情况进行修改，且需转为&连接的字符串形式，例如： "keyword=1&type=2"，可参考以下函数
 miniprogramParams() {
    const params = [];
    for (const key in this.miniprogram) {
        if (this.miniprogram.hasOwnProperty(key)) {
            // params.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.miniprogram[key]));
            params.push(encodeURIComponent(key) + '=' + this.miniprogram[key]);
        }
    }
    return params.join('&');
}
 *
 * Copyright (c) 2025 by zhusha, email: no email, All Rights Reserved.
-->
<template>
    <div class="p-suspend">
        <!-- 初始按钮及配置 -->
        <div class="m-home-box" v-if="btnConfig.showHome">
            <div class="m-base">
                <!-- // TODO自定义展现基础插槽 -->
                <slot name="default"></slot>
            </div>
            <div class="m-more" v-if="btnConfig.showMore" @click="setMore">
                <img class="u-icon" src="../assets/img/suspend/more.svg" svg-inline /> 更多
            </div>
        </div>
        <!-- 样式分类（icon&more） -->
        <div class="m-icon-box" v-if="btnConfig.showIcon && !btnConfig.showHome">
            <div class="m-btn-box">
                <!--        搜索按钮-->
                <div v-if="btnConfig.showSearch" class="u-icon-d" @click="search">
                    <img class="u-icon" src="../assets/img/suspend/search.svg" svg-inline />
                </div>
                <!--        固定按钮-->
                <div v-if="btnConfig.showFixed" class="u-icon-d" @click="clickDrawer({ type: 'pin', text: '固定按钮' }, 1)">
                    <img class="u-icon active" src="../assets/img/suspend/pin_touchbar_24.svg" svg-inline
                        v-if="!fixIsActive" />
                    <img class="u-icon active" src="../assets/img/suspend/pin_slash_24.svg" svg-inline v-else />
                </div>
                <!--        收藏按钮-->
                <div v-if="btnConfig.showCollect" class="u-icon-d"
                    @click="clickDrawer({ type: 'collect', text: '收藏' }, 1)">
                    <img class="u-icon active" src="../assets/img/suspend/collect.svg" svg-inline v-if="!isCollect" />
                    <img class="u-icon active" src="../assets/img/suspend/collect_slash.svg" svg-inline v-else />
                </div>
                <!-- 稍后在看 -->
                <div v-if="btnConfig.showLaterOn" class="u-icon-d" @click="laterOn">
                    <img class="u-icon" src="../assets/img/suspend/later-on.svg" svg-inline />
                </div>

            </div>
            <div class="m-more" v-if="btnConfig.showMore" @click="setMore">
                <img class="u-icon" src="../assets/img/suspend/more.svg" svg-inline /> 更多
            </div>
        </div>
        <!-- 横向固定内容区域 -->
        <div class="m-pin-box" v-if="btnConfig.showPin && !btnConfig.showHome && !btnConfig.showIcon">
            <div class="u-item" v-for="(item, index) in fixList" :key="'fix' + index">
                <div class="u-text-r" v-if="item.type == 'text'">
                    {{ item.title.match(/[\u3400-\u9FFF\uF900-\uFAFF]/)?.[0] || '固' }}
                </div>
                <img :src="item.imgUrl" class="u-icon" v-else>
            </div>
            <!-- 不足三个时显示空位，只在编辑界面显示 -->
            <div class="u-item" v-for="(item, index) in (3 - fixList.length)" :key="'fix_no' + index">
                <img src="../assets/img/suspend/circle.svg" svg-inline class="u-icon">
            </div>
        </div>
        <!-- 抽屉弹出层，支持默认样式和自定义插槽样式 -->
        <el-drawer :title="drawerConfig.drawerTitle" :visible.sync="drawer" :direction="drawerConfig.direction"
            :with-header="false" custom-class="u-drawer" :modal-append-to-body="false" append-to-body class="p-drawer">
            <div class="p-drawer-box" v-show="areaKey === 'home'">
                <div class="u-drawer-box">
                    <div class="u-item top" v-for="item in drawerFiltration(drawerType.one)" :key="item.type"
                        @click="clickDrawer(item)">
                        <div class="u-icon" v-if="item.icon || item.icon_slash">
                            <img :src="item.type == 'pin' ? fixIsActive ? item.icon_slash : item.icon : item.icon"
                                svg-inline />
                        </div>
                        <div class="u-self" v-if="item.isSlot">
                            <!-- 三个圆堆叠式展示 -->
                            <div class="u-circle-top">
                                <div v-if="fixList?.[0]">
                                    <div class="u-text-r" v-if="fixList?.[0]?.type == 'text'">
                                        {{ fixList?.[0]?.title.match(/[\u3400-\u9FFF\uF900-\uFAFF]/)?.[0] || '固' }}
                                    </div>
                                    <img :src="fixList?.[0]?.imgUrl" class="u-icon" v-else>
                                </div>
                                <img src="../assets/img/suspend/circle.svg" svg-inline v-else />

                            </div>
                            <div class="u-circle-bottom">
                                <div class="u-circle" v-for="(item, index) in 2" :key="item">
                                    <div v-if="fixList?.[index + 1]">
                                        <div class="u-text-r" v-if="fixList?.[index + 1]?.type == 'text'">
                                            {{ fixList?.[index + 1].title.match(/[\u3400-\u9FFF\uF900-\uFAFF]/)?.[0] || '固' }}
                                        </div>
                                        <img :src="fixList?.[index + 1].imgUrl" class="u-icon" v-else>
                                    </div>
                                    <img src="../assets/img/suspend/circle.svg" svg-inline v-else />
                                </div>
                            </div>

                        </div>
                        <div class="u-text" :class="item.type">
                            {{ item.type == 'pin' ? fixIsActive ? item.text_slash : item.text : item.text }}
                        </div>
                    </div>
                </div>
                <div class="u-drawer-box">
                    <div class="u-item" v-for="item in drawerFiltration(drawerType.two)" :key="item.type"
                        @click="clickDrawer(item)">
                        <div class="u-icon" v-if="item.icon">
                            <img :src="item.icon" svg-inline />
                        </div>
                        <div class="u-text" :class="item.type">
                            {{ item.text }}
                        </div>
                    </div>
                </div>
                <div class="u-drawer-box">
                    <div class="u-item" :class="item.type" v-for="item in drawerFiltration(drawerType.three)"
                        :key="item.type" @click="clickDrawer(item)">
                        <div class="u-author" v-if="item.isSlot">
                            <div class="u-avatar">
                                <img :src="drawerConfig.author.avatar">
                                <!-- <slot name="avatar"></slot> -->
                            </div>
                            <div class="u-author-name">
                                <!-- <slot name="author"></slot> -->
                                {{ drawerConfig.author.name }}
                            </div>

                        </div>
                        <div class="u-text" v-if="!item.isSlot">
                            {{ item.text }}
                        </div>
                    </div>
                </div>
            </div>
            <!-- 收藏区域 、订阅区域 -->
            <div class="p-drawer-collect" v-show="areaKey === 'collect' || areaKey === 'rss'">
                <div class="u-collect-icon">
                    <img src="../assets/img/suspend/collect_touchbar_100.svg" svg-inline
                        v-if="areaKey === 'collect' && !isCollect" />
                    <img src="../assets/img/suspend/collect_slash_touchbar_100.svg" svg-inline
                        v-if="areaKey === 'collect' && isCollect" />
                    <img src="../assets/img/suspend/rss_touchbar_100.svg" svg-inline
                        v-if="areaKey === 'rss' && !isSubscribe" />
                    <img src="../assets/img/suspend/report_100.svg" svg-inline
                        v-if="areaKey === 'rss' && isSubscribe" />
                    <div class="u-text"
                        v-if="(areaKey === 'collect' && !isCollect) || (areaKey === 'rss' && !isSubscribe)">
                        {{ areaKey === 'collect' ? '收藏' : '订阅' }}作品
                    </div>
                </div>
                <div class="u-collect-tips" v-if="areaKey === 'collect'">
                    {{ isCollect ? '你已经收藏该作品' : '喜欢程度不够？可以试试添加到稍后再看' }}
                </div>
                <div class="u-collect-tips" v-if="areaKey === 'rss'">
                    {{ isSubscribe ? '你已经订阅该作品' : '喜欢程度不够？可以试试添加到稍后再看' }}
                </div>
                <div class="u-btn-box">
                    <div class="u-btn collect" @click="collectOrSubscribe">
                        {{ areaKey === 'collect' ? isCollect ? '取消收藏' : '收藏' : isSubscribe ? '取消订阅' : '订阅' }}作品
                    </div>
                    <div class="u-btn" @click="laterOn">添加到稍后再看</div>
                </div>
            </div>
            <!-- 固定配置相关页面 -->
            <div class="p-drawer-fix" v-show="areaKey === 'pin' || areaKey === 'fix'">
                <!-- 固定，取消固定,超量 -->
                <div class="u-collect-icon" v-if="!fixIsEdit">
                    <img src="../assets/img/suspend/pin_touchbar_100.svg" svg-inline
                        v-if="!fixIsActive && !fixIsFull" />
                    <img src="../assets/img/suspend/pin_slash_touchbar.svg" svg-inline
                        v-if="fixIsActive && !fixIsFull" />
                    <img src="../assets/img/suspend/report_100.svg" svg-inline v-if="fixIsFull" />
                    <div class="u-text">{{ fixIsActive ? '取消固定' : '固定内容' }}</div>
                </div>
                <div class="u-collect-tips" v-if="!fixIsActive && !fixIsEdit">
                    你可以随时在其他页面查看固定的内容
                </div>
                <div class="u-edit-title" v-if="fixIsEdit">固定内容</div>
                <div class="u-pin-box">
                    <div class="u-item" v-if="!fixIsEdit">
                        <div class="u-text-r" v-if="fixPageConfig.type == 'text'">
                            {{ fixPageConfig.title.match(/[\u3400-\u9FFF\uF900-\uFAFF]/)?.[0] || '固' }}
                        </div>
                        <img :src="fixPageConfig.imgUrl" class="u-icon" v-else>
                        <div class="u-text">{{ fixPageConfig.title }}</div>
                    </div>
                    <!-- 只在编辑界面显示 -->
                    <div class="u-item" v-for="(item, index) in fixIsEdit ? fixList : []" :key="'fix' + index">
                        <div class="u-text-r" v-if="item.type == 'text'">
                            {{ item.title.match(/[\u3400-\u9FFF\uF900-\uFAFF]/)?.[0] || '固' }}
                        </div>
                        <img :src="item.imgUrl" class="u-icon" v-else>
                        <div class="u-text">{{ item.title }}</div>
                        <div class="u-slash" v-if="fixIsEdit" @click="cancelFix(item)">
                            <img src="../assets/img/suspend/pin_slash_touchbar_24.svg" svg-inline />
                        </div>
                    </div>
                    <!-- 不足三个时显示空位，只在编辑界面显示 -->
                    <div class="u-item" v-for="(item, index) in fixIsEdit ? (3 - fixList.length) : 0"
                        :key="'fix_no' + index">
                        <img src="../assets/img/suspend/circle.svg" svg-inline class="u-icon">
                    </div>
                </div>
                <div class="u-btn-box" v-if="!fixIsEdit">
                    <div class="u-btn collect" @click="fixClick">确定</div>
                    <!-- <div class="u-btn">编辑固定内容</div> -->
                </div>
                <div class="u-collect-tips" v-if="fixIsActive && !fixIsEdit">
                    你可以在原页面再次将其固定
                </div>
                <div class="u-collect-tips edit" v-if="fixIsEdit">
                    在支持固定的页面可以按
                    <img src="../assets/img/suspend/pin_touchbar_24.svg" svg-inline class="u-icon" />
                    将页面固定
                </div>
            </div>

        </el-drawer>
    </div>
</template>

<script>
import {
    subscribeAuthor,
    unsubscribeAuthor,
    subscribePost,
    unsubscribePost,
    subscribeArticle,
    unsubscribeArticle,
    subscribeWiki,
    unsubscribeWiki,
    getSubscribeStatus,
    getSubscribePostStatus,
    getSubscribeArticleStatus,
    getSubscribeWikiStatus,
    later,
    setCollect,
    getCollectList,
    cancelCollect,
} from '../service/suspend'
export default {
    components: {},
    props: {
        btnOptions: {
            type: Object,
            default: () => {
                return {}
            }
        },
        //通用弹出框配置
        drawerOptions: {
            type: Object,
            default: () => {
                return {}
            },
        },
        //固定页缓存相关配置
        fixPageOptions: {
            type: Object,
            default: () => {
                return {}
            }
        },
    },
    data() {
        return {
            isDarkModeStatus: false,
            drawer: false,
            areaKey: 'home',
            //弹窗type组合
            drawerType: {
                one: [
                    { type: 'search', text: '搜索内容', icon: require('../assets/img/suspend/search_touchbar.svg') },
                    { type: 'pin', text: '固定本页', icon: require('../assets/img/suspend/pin_touchbar.svg'), text_slash: '取消固定', icon_slash: require('../assets/img/suspend/pin_slash_touchbar_40.svg') },
                    { type: 'fix', text: '查看固定', icon: null, isSlot: true },
                ],
                two: [
                    { type: 'collect', text: '收藏作品', icon: require('../assets/img/suspend/collect_touchbar.svg') },
                    { type: 'rss', text: '订阅作品', icon: require('../assets/img/suspend/rss_touchbar.svg') },
                    { type: 'laterOn', text: '稍后再看', icon: require('../assets/img/suspend/lafter_touchbar.svg') },
                ],
                three: [
                    { type: 'user', text: '作者', isSlot: true, },
                    { type: 'report', text: '举报' },
                ]
            },
            fixList: [],
            fixIsEdit: false, //固定页是否编辑状态
            //是否已收藏
            isCollect: false,
            collectInfo: {},
            //是否已订阅
            isSubscribe: false,
            subscribeInfo: {},
        };
    },
    computed: {
        btnConfig() {
            const defaultConfig = {
                showHome: false, //是否显示home区域，和Icon区域二选一,home区域优先级高于icon区域
                showIcon: true, //是否显示icon区域,此处为false后，则下列配置无效
                showPin: true, //是否显示横向固定区域，需要home和icon都是false才有效
                showSearch: true, //是否显示搜索图标
                showFixed: true, //是否显示固定图标
                showCollect: true, //是否显示收藏图标
                showLaterOn: true, //是否显示稍后再看图标
                showMore: true, //是否显示更多
            }
            return Object.assign({}, defaultConfig, this.btnOptions);
        },
        drawerConfig() {
            const defaultConfig = {
                hideType: ['report'], //需要隐藏的type,如['search','pin']
                direction: 'btt', //弹出框方向，btt、ttb、rtl、ltr
                drawerTitle: '',//弹出框标题
                author: {
                    name: '', //作者名称
                    avatar: '', //作者头像
                    author_id: '', //作者id
                },
                subscribeType: '', //订阅类型，用于区分调用百科、文章、作者、帖子等订阅接口，
                postType: '',//订阅、收藏接口的type,如'face','bps','article'等
                id: '', //页面数据ID，用于收藏订阅操作
                title: document.title || '', //默认固定标题,默认取页面标题
                url: window.location.href, //默认取浏览器地址
                laterOn: {
                    author_id: 0,
                    content_meta_id: 0
                }
            }
            return Object.assign({}, defaultConfig, this.drawerOptions);
        },
        fixPageConfig() {
            const defaultConfig = {
                key: 'jx3box-common-fixed', //默认本地缓存Key
                type: 'text', //默认固定类型，text、img
                imgUrl: '', //type是img时需传入图片url用作显示
                title: document.title || '', //默认固定标题,默认取页面标题
                url: window.location.href, //默认取浏览器地址
            }
            return Object.assign({}, defaultConfig, this.fixPageOptions);
        },
        //通过drawerConfig判断是否显示弹窗
        drawerIsShow() {
            return Object.keys(this.drawerConfig).length > 0;
        },
        //通过drawerConfig判断是否显示作者信息
        drawerIsAuthor() {
            return Object.keys(this.drawerConfig.author).length > 0;
        },
        // 通过fixList判断是否已满
        fixIsFull() {
            return this.fixList.length >= 3;
        },
        // 通过fixList判断当前界面是否已经存在固定列表内
        fixIsActive() {
            return this.fixList.some(item => item.url === this.fixPageConfig.url);
        },
    },
    created() {
        this.isDarkModeFun();
        this.fixList = JSON.parse(localStorage.getItem(this.fixPageConfig.key)) || [];
        this.getCollectInfo();
        this.getSubscribeInfo();
    },
    methods: {
        isDarkModeFun() {
            // 使用 window.matchMedia 检查系统是否启用了暗色模式
            const mediaQueryList = window.matchMedia('(prefers-color-scheme: dark)');
            this.isDarkModeStatus = mediaQueryList.matches;
        },
        //搜索按钮点击事件
        search() {
            this.$emit('search');
        },
        //打开更多弹窗，父级界面如需在界面其他操作后打开，可通过ref调用此方法
        // 例如：this.$refs.suspendCommon.setMore()
        setMore() {
            this.drawer = true;
            this.areaKey = 'home'
        },
        // 筛选弹窗type，过滤掉需隐藏的type
        drawerFiltration(arr) {
            if (this.drawerConfig.hideType.length > 0) {
                return arr.filter(item => !this.drawerConfig.hideType.includes(item.type));
            }
            return arr;
        },
        /**
         * @description: 弹出层按钮的点击事件通过emit传递给父组件处理
         * @param {*} item 按钮的type和text
         * @param {type} 1 代表从默认图标的点击事件，需要打开弹窗
         * @return {*}
         * 组件可处理事件交由组件处理，但点击事件依旧抛出，便于特殊情况处理
         * */
        clickDrawer(item, type) {
            if (type == 1) this.drawer = true;
            // 支持切换界面的 type
            let switchType = ['collect', 'rss', 'pin', 'fix'];
            if (switchType.includes(item.type)) {
                this.areaKey = item.type;
            }
            // 如果点击的是search
            if (item.type === 'search') {
                this.search();
            }
            //查看固定页转到编辑状态
            if (item.type === 'fix') {
                this.fixIsEdit = true;
            } else {
                this.fixIsEdit = false;
            }
            //稍后在看处理
            if (item.type === 'laterOn') this.laterOn()
            this.$emit('clickBtn', { type: item.type, text: item.text });
        },
        /**
         * @description: 固定页的确认点击事件,操作结束后areaKey转到home界面
         * @return {*}
         */
        fixClick() {
            // 判断是否已满，已满则不进行操作
            if (this.fixIsFull) return;
            // 判断是否已经存在，存在则执行删除操作
            if (this.fixIsActive) {
                this.fixList = this.fixList.filter(item => item.url !== this.fixPageConfig.url);
                localStorage.setItem(this.fixPageConfig.key, JSON.stringify(this.fixList));
            } else {
                let json = {
                    type: this.fixPageConfig.type,
                    title: this.fixPageConfig.title,
                    url: this.fixPageConfig.url,
                    imgUrl: this.fixPageConfig.imgUrl,
                }
                this.fixList.push(json);
                localStorage.setItem(this.fixPageConfig.key, JSON.stringify(this.fixList));
            }
            this.areaKey = 'home';
            this.$emit('fixPage');
        },

        /**
         * @description: 查看固定页取消固定
         * @param {*} value
         * @return {*}
         * */
        cancelFix(value) {
            this.fixList = this.fixList.filter(item => item.url !== value.url);
            localStorage.setItem(this.fixPageConfig.key, JSON.stringify(this.fixList));
            this.areaKey = 'home';
            this.$emit('fixCancelIndividually');
        },
        /**
         * @description: 收藏或订阅,操作完成后areaKey转到home界面
         * @return {*}
         */
        collectOrSubscribe() {
            this.areaKey == 'collect' ? this.collect() : this.subscribe()
        },

        /**
         * @description: 收藏或取消操作，操作完成后更新界面，无需跳转
         */
        collect() {
            let drawerConfig = this.drawerConfig
            if (this.isCollect) {
                //取消,需传入收藏id
                cancelCollect(this.collectInfo.id,).then(res => {
                    this.isCollect = false;
                    this.collectInfo = {}
                })
            } else {
                setCollect(drawerConfig.id, drawerConfig.postType, drawerConfig.title).then(res => {
                    this.isCollect = true;
                    this.collectInfo = res.data?.data
                })
            }
            this.$emit('collect', { isCollect: this.isCollect });
        },
        //获取收藏信息
        getCollectInfo() {
            if(!this.drawerConfig.id && !this.drawerConfig.postType) return;
            getCollectList(this.drawerConfig.id, this.drawerConfig.postType).then(res => {
                this.collectInfo = res.data.data
                this.isCollect = this.collectInfo?.id > 0
            })
        },
        /**
         * @description: 订阅或取消操作，操作完成后更新界面，无需跳转,需根据subscribeType判断接口调用
         */
        subscribe() {
            let drawerConfig = this.drawerConfig
            // 作者相关接口
            if (drawerConfig.subscribeType === 'author') {
                if (this.isSubscribe) {
                    unsubscribeAuthor(drawerConfig.author.author_id).then(res => {
                        this.isSubscribe = false;
                        this.subscribeInfo = {}
                    })
                } else {
                    subscribeAuthor(drawerConfig.author.author_id, { title: drawerConfig.title }).then(res => {
                        this.isSubscribe = true;
                        this.subscribeInfo = res.data?.data
                    })
                }
            }
            //帖子
            if (drawerConfig.subscribeType === 'community') {
                if (this.isSubscribe) {
                    unsubscribePost(drawerConfig.id).then(res => {
                        this.isSubscribe = false;
                        this.subscribeInfo = {}
                    })
                } else {
                    subscribePost(drawerConfig.id, { title: drawerConfig.title }).then(res => {
                        this.isSubscribe = true;
                        this.subscribeInfo = res.data?.data
                    })
                }
            }
            //文章
            if (drawerConfig.subscribeType === 'posts') {
                if (this.isSubscribe) {
                    unsubscribeArticle(drawerConfig.postType, drawerConfig.id).then(res => {
                        this.isSubscribe = false;
                        this.subscribeInfo = {}
                    })
                } else {
                    subscribeArticle(drawerConfig.postType, drawerConfig.id, { title: drawerConfig.title }).then(res => {
                        this.isSubscribe = true;
                        this.subscribeInfo = res.data?.data
                    })
                }
            }
            //百科
            if (drawerConfig.subscribeType === 'wiki') {
                if (this.isSubscribe) {
                    unsubscribeWiki(drawerConfig.postType, drawerConfig.id).then(res => {
                        this.isSubscribe = false;
                        this.subscribeInfo = {}
                    })
                } else {
                    subscribeWiki(drawerConfig.postType, drawerConfig.id, { title: drawerConfig.title }).then(res => {
                        this.isSubscribe = true;
                        this.subscribeInfo = res.data?.data
                    })
                }
            }
            this.$emit('subscribe', { isSubscribe: this.isSubscribe });
        },
        /**
         * 订阅状态查询
         */
        getSubscribeInfo() {
            let drawerConfig = this.drawerConfig
            // 作者相关接口
            if (drawerConfig.subscribeType === 'author' && drawerConfig.author.author_id) {
                getSubscribeStatus(drawerConfig.author.author_id).then(res => {
                    this.isSubscribe = res.data.data?.subscribed
                    this.subscribeInfo = res.data.data
                })
            }
            //帖子
            if (drawerConfig.subscribeType === 'community' && drawerConfig.id) {
                getSubscribePostStatus(drawerConfig.id).then(res => {
                    this.isSubscribe = res.data.data?.subscribed
                    this.subscribeInfo = res.data.data
                })
            }
            //文章
            if (drawerConfig.subscribeType === 'posts' && drawerConfig.id && drawerConfig.postType) {
                getSubscribeArticleStatus(drawerConfig.postType, drawerConfig.id).then(res => {
                    this.isSubscribe = res.data.data?.subscribed
                    this.subscribeInfo = res.data.data
                })
            }
            //百科
            if (drawerConfig.subscribeType === 'wiki' && drawerConfig.id && drawerConfig.postType) {
                getSubscribeWikiStatus(drawerConfig.postType, drawerConfig.id).then(res => {
                    this.isSubscribe = res.data.data?.subscribed
                    this.subscribeInfo = res.data.data

                })
            }
        },
        /**
   * @description: 稍后再看,操作完成后areaKey转到home界面
   * @return {*}
   */
        laterOn() {
            let drawerConfig = this.drawerConfig
            let params = {
                author_id: parseInt(drawerConfig.laterOn.author_id),
                banner: "",
                category: drawerConfig.postType,
                content_meta_id: parseInt(drawerConfig.laterOn.content_meta_id),
                link: drawerConfig.url,
                title: drawerConfig.title
            }
            later(params).then(res => {
                console.log(res)
                this.areaKey = 'home';
                this.$emit('laterOn');
            })

        },
    },
};
</script>

<style lang="less">
@bgColor: #24292E;
@color: #FEDAA3;
@color2: #24292E;

html {
    font-size: clamp(16px, calc(100vw / 414 * 16), 36px);
}

.p-suspend {
    .pf;
    .z(1994);
    bottom: 0;
    margin: 0 calc(calc(100% - 23.438rem) / 2);
    .w(23.438rem);
    padding: 1.25rem 0px 1.5rem 0px;
    border-radius: 1.25rem 1.25rem 0 0;
    background: @bgColor;
    color: @color;
    .fz(1rem, 1.5rem);
    .bold(700);

    .m-home-box,
    .m-pin-box,
    .m-icon-box {
        .flex;
        .flex(o);
    }

    .m-pin-box {
        gap: 1.125rem;

        .u-item {
            .flex;
            .flex(o);

            img {
                .size(1.5rem);
                .r(50%);
            }

            .u-text-r {
                .size(1.5rem);
                .r(50%);
                background-color: #D9D9D9;
                .flex;
                .flex(o);
            }
        }

    }

    .m-btn-box {
        .flex;
        align-items: center;
        justify-content: space-between;
        flex: auto;
        // gap: 3rem;
        padding: 0 1.25rem;

        .u-icon-d {
            .flex;
            .flex(o);
            .size(1.5rem);

            .u-icon {
                &.active {
                    fill: #FEDAA3;
                    stroke: #FEDAA3
                }
            }
        }
    }

    .m-more {
        .w(7.5rem);
        .flex;
        .flex(o);
        flex-shrink: 0;
        border-left: 0.5px solid rgba(254, 218, 163, 0.2);
        gap: 0.5rem
    }
}

.p-drawer {
    .size(100%);
    .lt(0);

    .u-drawer {
        border-radius: 1.25rem 1.25rem 0 0;
        position: fixed !important;
        bottom: 0;
        margin: auto;
        outline: none;
        -webkit-tap-highlight-color: transparent;
        user-select: none;
        -webkit-touch-callout: none;
        .w(23.438rem);
        .h(auto) !important;
        padding: 1.25rem 0.75rem 2.5rem 0.75rem;
        background: @bgColor;

        // .el-drawer__body {}

        .p-drawer-box {
            .flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .u-drawer-box {
            .flex;
            .w(100%);
            align-items: center;
            justify-content: space-between;
            gap: 0.75rem;

            .u-item {
                border-radius: 12px;
                background: rgba(255, 255, 255, 0.05);
                .flex;
                .flex(o);
                flex-direction: column;
                gap: 0.75rem;
                flex: auto;
                padding: 0.75rem 0;
                box-sizing: border-box;

                &.top {
                    .h(6.875rem);
                }


                &.report {
                    max-width: 50%;
                }

                .u-icon {
                    .flex;
                    .flex(o);
                }

                .u-self {
                    .h(2.5rem);

                    .flex;
                    flex-direction: column;
                    .flex(o);

                    img {
                        .size(1.5rem);
                        .r(50%);
                    }

                    .u-circle-top {
                        .pr;
                        bottom: -0.75rem;
                    }

                    .u-circle-bottom {
                        .flex;
                        gap: 0;
                    }

                    .u-text-r {
                        .size(1.5rem);
                        .r(50%);
                        background-color: #D9D9D9;
                        .flex;
                        .flex(o);
                    }
                }

                .u-text {
                    color: #ACAEAF;
                    .fz(0.875rem, 1.25rem);
                    .bold(700);

                    &.search,
                    &.fix {
                        color: #FEDAA3;
                    }

                }

                .u-author {
                    //作者名字最多显示8个中文字符，超出后，第八个中文字符用...代替

                    .fz(0.875rem, 1.25rem);
                    .bold(700);
                    .flex;
                    .flex(o);
                    gap: 0.2rem;
                    padding: 0 0.75rem;
                    box-sizing: border-box;
                    color: #ACAEAF;
                    .w(100%);

                    .u-avatar {
                        .size(1.25rem);
                        overflow: hidden;
                        .r(50%);
                        flex-shrink: 0;
                    }

                    .u-author-name {
                        flex: auto;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        min-width: 0;
                    }
                }
            }
        }

        .p-drawer-fix,
        .p-drawer-collect {
            color: rgba(255, 255, 255, 0.40);

            .u-collect-icon {
                .flex;
                .flex(o);
                flex-direction: column;
                .w(100%);
                .mb(1.25rem);

                .u-text {
                    .fz(0.875rem, 1.25rem);
                }
            }

            .u-collect-tips {
                .fz(0.75rem, 1rem);
                text-align: center;

                .mb(1.25rem);

                &.edit {
                    .flex;
                    align-items: center;
                    .fz(0.875rem, 1.25rem);
                }
            }

            .u-btn-box {
                .flex;
                .flex(o);
                gap: 0.75rem;
                .mb(1.25rem);

                .u-btn {
                    .flex;
                    .flex(o);
                    .fz(1rem, 1.5rem);
                    .bold(700);
                    border-radius: 0.75rem;
                    background: rgba(255, 255, 255, 0.10);
                    padding: 0.75rem 1rem;
                    color: rgba(255, 255, 255, 0.40);
                    flex: auto;

                    &.collect {
                        background-color: @color;
                        color: @color2;
                    }
                }
            }
        }

        .p-drawer-fix {
            .u-edit-title {
                .mb(1.25rem);
                color: rgba(255, 255, 255, 0.60);
                .fz(0.875rem, 1.25rem);
                .bold(700);
            }

            .u-pin-box {
                .mb(1.25rem);
                .flex;
                flex-direction: column;
                gap: 0.75rem;

                .u-item {
                    .flex;
                    align-items: center;
                    gap: 0.75rem;
                    padding: 0.5rem 1rem;
                    align-self: stretch;
                    .r(0.5rem);
                    background: rgba(255, 255, 255, 0.10);

                    .u-text-r,
                    .u-icon {
                        .size(1.875rem);
                        .r(50%);
                        flex-shrink: 0;
                    }

                    .u-text-r {
                        .flex;
                        .flex(o);
                        background-color: #D9D9D9;
                        color: #000;
                    }

                    .u-text {
                        flex: auto;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        min-width: 0;
                        color: #fff;
                    }

                    .u-slash {
                        .flex;
                        .flex(o);
                        .size(1.875rem);
                        flex-shrink: 0;
                    }
                }
            }
        }
    }

}
</style>
