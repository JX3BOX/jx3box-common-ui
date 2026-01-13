require("events").EventEmitter.defaultMaxListeners = 2333;
const path = require("path");
const pkg = require("./package.json");
const { JX3BOX } = require("@jx3box/jx3box-common");

module.exports = {
    //❤️ define path for static files ~
    publicPath:
        //FOR Localhost => development
        (process.env.NODE_ENV === "development" && "/") ||
        //BY origin
        (process.env.STATIC_PATH === "origin" && `${JX3BOX.__staticPath["origin"]}${pkg.name}/`) ||
        //BY github
        (process.env.STATIC_PATH === "github" && `${JX3BOX.__staticPath["github"]}${pkg.name}/`) ||
        //BY jsdelivr
        (process.env.STATIC_PATH === "jsdelivr" && `${JX3BOX.__staticPath["jsdelivr"]}${pkg.name}@gh-pages/`) ||
        //BY OSS=>CDN
        (process.env.STATIC_PATH === "mirror" && `${JX3BOX.__staticPath["mirror"]}${pkg.name}/`) ||
        //BY relative path
        (process.env.STATIC_PATH === "repo" && `/${pkg.name}/`) ||
        //BY root path or bind a domain
        (process.env.STATIC_PATH == "root" && "/") ||
        //for lost
        "/",

    //❤️ Proxy ~
    devServer: {
        // Webpack 5 (Dev Server 4) 废弃了 disableHostCheck，改用 allowedHosts
        allowedHosts: "all",
        proxy: {
            "/api/vip": {
                target: "https://pay.jx3box.com",
                onProxyReq: function (request) {
                    request.setHeader("origin", "");
                },
            },
            "/api/inspire": {
                target: "https://pay.jx3box.com",
                onProxyReq: function (request) {
                    request.setHeader("origin", "");
                },
            },
            "/api/team": {
                target: "https://team.api.jx3box.com",
                onProxyReq: function (request) {
                    request.setHeader("origin", "");
                },
            },
            "/api/cms": {
                target: "https://cms.jx3box.com",
            },
            "/api/article": {
                target: "https://next2.jx3box.com",
            },
            "/api/messages": {
                target: "https://helper.jx3box.com",
            },
            "/api/post/favorite": {
                target: "https://helper.jx3box.com",
            },
            "/api/wiki": {
                target: "https://helper.jx3box.com",
            },
            "/api/personal": {
                target: "https://pay.jx3box.com",
                onProxyReq: function (request) {
                    request.setHeader("origin", "");
                },
            },
            "/api/cny": {
                target: "https://pay.jx3box.com",
                onProxyReq: function (request) {
                    request.setHeader("origin", "");
                },
            },
            "/api/next2": {
                target: "https://dev.next2.jx3box.com",
                onProxyReq: function (request) {
                    request.setHeader("origin", "");
                },
            },
            "/api": {
                target: "https://dev.next2.jx3box.com",
                onProxyReq: function (request) {
                    request.setHeader("origin", "");
                },
            },
        },
        client: {
            overlay: {
                warnings: false,
                errors: false,
            },
        },
    },
    configureWebpack: {
        ignoreWarnings: [
            // 使用正则匹配警告信息，匹配到的统统不显示
            /Should not import the named export/,
            // /export '.*' \(imported as '.*'\) was not found in/,
        ],
    },
    chainWebpack: (config) => {
        //💝 in-line small imgs ~
        // Vue CLI 5 (Webpack 5) 修正写法：
        // 不再使用 url-loader，而是修改 parser 配置
        config.module.rule("images").set("parser", {
            dataUrlCondition: {
                maxSize: 10240, // 10kb
            },
        });

        //💝 in-line svg imgs ~
        config.module.rule("vue").use("vue-svg-inline-loader").loader("vue-svg-inline-loader");

        //💖 import common less var * mixin ~
        const types = ["vue-modules", "vue", "normal-modules", "normal"];
        var preload_styles = [];
        preload_styles.push(
            path.resolve(__dirname, "./node_modules/csslab/base.less"),
            path.resolve(__dirname, "./node_modules/@jx3box/jx3box-common/css/var.less")
        );
        function addStyleResource(rule) {
            rule.use("style-resource").loader("style-resources-loader").options({
                patterns: preload_styles,
            });
        }
        types.forEach((type) => addStyleResource(config.module.rule("less").oneOf(type)));
    },
};
