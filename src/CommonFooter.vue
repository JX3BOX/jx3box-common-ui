<template>
    <footer class="box-border bg-gray-900 px-6 py-12 text-gray-400 md:px-10 lg:px-16 xl:px-20">
        <div class="mx-auto w-full" style="max-width: 92rem">
            <div
                class="grid grid-cols-1 gap-10 pb-10 lg:grid-cols-12 lg:gap-8"
            >
                <section class="lg:col-span-3">
                    <div class="flex items-center space-x-3">
                        <img class="h-9 w-9" svg-inline src="../assets/img/footer/logo.svg" alt="JX3BOX" />
                        <span class="text-2xl font-bold tracking-tight text-white">JX3BOX</span>
                    </div>
                    <p class="mt-5 text-sm leading-7 text-gray-400" style="max-width: 20rem">
                        一站式剑三工具与资源聚合站。<br>
                        江湖路远，幸甚有你。
                    </p>
                    <div class="mt-6 flex flex-wrap gap-3">
                        <div v-for="item in socials" :key="item.name">
                            <el-popover
                                v-if="item.qrcode"
                                trigger="hover"
                                placement="top"
                                popper-class="c-footer-v4__popover"
                            >
                                <div class="flex w-36 flex-col items-center p-3">
                                    <img
                                        class="h-32 w-32 rounded-md object-cover"
                                        :src="item.qrcode"
                                        :alt="item.name"
                                    />
                                    <span class="mt-2 text-xs text-gray-300">{{
                                        item.label || item.name
                                    }}</span>
                                </div>
                                <a
                                    slot="reference"
                                    class="flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 bg-gray-800 transition hover:border-blue-500 hover:bg-blue-600"
                                    :title="item.name"
                                    href="javascript:;"
                                >
                                    <img class="h-5 w-5" svg-inline :src="item.icon" :alt="item.name" />
                                </a>
                            </el-popover>
                            <a
                                v-else
                                class="flex h-11 w-11 items-center justify-center rounded-full border border-gray-700 bg-gray-800 transition hover:border-blue-500 hover:bg-blue-600"
                                :href="item.href"
                                target="_blank"
                                rel="noopener noreferrer"
                                :title="item.name"
                            >
                                <img class="h-5 w-5" svg-inline :src="item.icon" :alt="item.name" />
                            </a>
                        </div>
                    </div>
                </section>

                <section class="lg:col-span-3">
                    <div class="grid grid-cols-1 gap-8 sm:grid-cols-3">
                        <div v-for="group in footerGroups" :key="group.title">
                            <h3 class="text-sm font-semibold tracking-wide text-white">
                                {{ group.title }}
                            </h3>
                            <div class="mt-4 space-y-3">
                                <a
                                    v-for="item in group.links"
                                    :key="item.name"
                                    class="block text-xs text-gray-400 transition hover:text-blue-400"
                                    :href="item.href"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {{ item.name }}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section class="lg:col-span-4 lg:col-start-9">
                    <h3 class="text-sm font-semibold tracking-wide text-white">下载中心</h3>
                    <div class="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div v-for="item in downloadLinks" :key="item.name">
                            <el-popover
                                v-if="item.qrcode"
                                trigger="hover"
                                placement="top"
                                popper-class="c-footer-v4__popover"
                            >
                                <div class="flex flex-col items-center p-3">
                                    <img
                                        class="h-32 w-32 rounded-md object-cover"
                                        :src="item.qrcode"
                                        :alt="item.name"
                                    />
                                    <span class="mt-2 text-xs text-gray-300">{{ item.label }}</span>
                                </div>
                                <a
                                    slot="reference"
                                    class="flex h-12 items-center rounded-xl border border-gray-700 bg-gray-800 px-4 text-xs text-gray-300 transition hover:border-blue-500 hover:bg-gray-700"
                                    :href="item.href || 'javascript:;'"
                                    :target="item.href ? '_blank' : null"
                                    :rel="item.href ? 'noopener noreferrer' : null"
                                >
                                    <span class="mr-2.5 flex h-4 w-4 items-center justify-center">
                                        <img class="h-4 w-4" svg-inline :src="item.icon" :alt="item.name" />
                                    </span>
                                    <span>{{ item.name }}</span>
                                </a>
                            </el-popover>
                            <a
                                v-else
                                class="flex h-12 items-center rounded-xl border border-gray-700 bg-gray-800 px-4 text-xs text-gray-300 transition hover:border-blue-500 hover:bg-gray-700"
                                :href="item.href || 'javascript:;'"
                                :target="item.href ? '_blank' : null"
                                :rel="item.href ? 'noopener noreferrer' : null"
                            >
                                <span class="mr-2.5 flex h-4 w-4 items-center justify-center">
                                    <img class="h-4 w-4" svg-inline :src="item.icon" :alt="item.name" />
                                </span>
                                <span>{{ item.name }}</span>
                            </a>
                        </div>
                    </div>

                    <div
                        class="mt-4 flex items-center justify-between rounded-xl border p-4"
                        style="
                            border-color: rgba(59, 130, 246, 0.2);
                            background-image: linear-gradient(90deg, rgba(30, 64, 175, 0.2), rgba(31, 41, 55, 0.4));
                        "
                    >
                        <div class="flex items-center space-x-3">
                            <div
                                class="flex h-10 w-10 items-center justify-center rounded-lg text-blue-400"
                                style="background-color: rgba(59, 130, 246, 0.2)"
                            >
                                <img class="h-6 w-6" src="../assets/img/footer/qqbot.svg" alt="QQ机器人" />
                            </div>
                            <div>
                                <p
                                    class="font-bold uppercase tracking-wider text-gray-500"
                                    style="font-size: 10px"
                                >
                                    QQ 机器人服务
                                </p>
                                <p class="mt-1 font-mono text-sm font-semibold text-white">3889010020</p>
                            </div>
                        </div>
                        <a
                            class="rounded-md bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-500"
                            href="tencent://AddContact/?uin=3889010020&Site=www.jx3box.com&Menu=yes"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            添加
                        </a>
                    </div>
                </section>
            </div>

            <div
                class="flex flex-col items-center justify-between pt-8 text-gray-500 md:flex-row"
                style="border-top: 1px solid rgba(55, 65, 81, 1); font-size: 11px"
            >
                <div
                    class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-start"
                >
                    <span>© 2019-2026 JX3BOX. 由开源社区驱动。</span>
                    <a
                        class="text-gray-500 hover:underline"
                        href="https://beian.miit.gov.cn/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        湘ICP备2021002288号
                    </a>
                </div>
                <div class="mt-4 flex items-center space-x-6 md:mt-0">
                    <a
                        class="text-gray-500 transition-colors hover:text-white"
                        href="https://rx-planet.com/contact"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        联系我们
                    </a>
                    <a
                        class="text-gray-500 transition-colors hover:text-white"
                        href="https://www.jx3box.com/feedback"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        反馈建议
                    </a>
                </div>
            </div>

        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer",
    data() {
        return {
            socials: [
                {
                    name: "公众号",
                    key: "wechat",
                    href: "",
                    icon: require("../assets/img/tv/wechat.svg"),
                    qrcode: require("../assets/img/mobile/mp.jpg"),
                },
                {
                    name: "B站",
                    key: "bilibili",
                    href: "https://space.bilibili.com/2066064028",
                    icon: require("../assets/img/tv/bilibili3.svg"),
                },
                {
                    name: "微博",
                    key: "weibo",
                    href: "https://weibo.com/jx3box",
                    icon: require("../assets/img/tv/weibo.svg"),
                },
                {
                    name: "抖音",
                    key: "douyin",
                    href: "https://www.douyin.com/user/MS4wLjABAAAAP3OHPy-BYsW6IMiPZfP1FP3J_zYAAYNVVlk9XyoKhOs",
                    icon: require("../assets/img/tv/douyin.svg"),
                },
            ],
            aboutLinks: [
                { name: "团队成员", href: "https://www.jx3box.com/about/" },
                { name: "加入我们", href: "https://www.jx3box.com/notice/21899" },
                { name: "开发文档", href: "https://www.jx3box.com/tool?subtype=4" },
                { name: "代码仓库", href: "https://github.com/JX3BOX" },
            ],
            legalLinks: [
                { name: "用户协议", href: "https://www.jx3box.com/about/license" },
                { name: "创作公约", href: "https://www.jx3box.com/about/treaty" },
                { name: "隐私政策", href: "https://www.jx3box.com/about/privacy" },
                { name: "创作激励", href: "https://www.jx3box.com/about/incentives" },
            ],
            extraLinks: [
                { name: "游戏版本", href: "https://www.jx3box.com/topic" },
                { name: "活动中心", href: "https://www.jx3box.com/event" },
                { name: "全站地图", href: "https://www.jx3box.com/app/" },
            ],
            downloadLinks: [
                {
                    name: "App Store",
                    href: "",
                    icon: require("../assets/img/footer/ios.svg"),
                    // qrcode: require("../assets/img/mobile/mp.jpg"),
                },
                {
                    name: "Android",
                    href: "",
                    icon: require("../assets/img/footer/android.svg"),
                    // qrcode: require("../assets/img/mobile/mp.jpg"),
                },
                {
                    name: "鸿蒙 NEXT",
                    href: "",
                    icon: require("../assets/img/footer/harmony.svg"),
                    // qrcode: require("../assets/img/mobile/mp.jpg"),
                },
                {
                    name: "小程序",
                    label: "JX3BOX小助手",
                    href: "",
                    icon: require("../assets/img/footer/miniprogram.svg"),
                    qrcode: require("../assets/img/mobile/miniprogram.jpg"),
                },
            ],
        };
    },
    computed: {
        footerGroups() {
            return [
                {
                    title: "关于我们",
                    links: this.aboutLinks,
                },
                {
                    title: "法律合规",
                    links: this.legalLinks,
                },
                {
                    title: "更多入口",
                    links: this.extraLinks,
                },
            ];
        },
    },
};
</script>

<style>
/* @tailwind components; */
/* @tailwind utilities; */

.c-footer-v4__popover {
    background: #1f2937;
    border: 1px solid #374151;
    border-radius: 12px;
    box-shadow: 0 16px 40px rgba(3, 7, 18, 0.45);
    padding: 0 !important;
}

.c-footer-v4__popover .popper__arrow,
.c-footer-v4__popover .popper__arrow:after {
    display: none !important;
}
</style>
