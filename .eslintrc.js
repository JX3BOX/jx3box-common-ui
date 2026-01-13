module.exports = {
    // 停止在父级目录中寻找配置文件
    root: true,

    // 定义环境，防止因为使用 window 或 module 等全局变量报错
    env: {
        node: true,
        browser: true,
        es6: true,
    },

    // 关键配置：继承 Vue 的官方规则
    // 这会自动设置 parser 为 'vue-eslint-parser'，从而解决 "Unexpected token <"
    extends: ["plugin:vue/essential", "eslint:recommended"],

    // 解析器选项
    parserOptions: {
        // 这里指定 script 标签内的代码使用 babel 解析器
        // 这解决了 "import is reserved" 和可选链等新语法报错
        parser: "@babel/eslint-parser",
        requireConfigFile: false,

        // 允许使用 ES 模块 (import/export)
        sourceType: "module",

        // 支持最新的 JS 特性
        ecmaVersion: 2020,
    },

    // 自定义规则
    rules: {
        "no-console": "off",
        "no-debugger": "off",
        // 如果你有未使用的变量报错，可以暂时关掉
        "no-unused-vars": "off",
        "no-useless-escape": "off",
        "vue/multi-word-component-names": "off",
        "vue/no-mutating-props": "off",
        "no-undef": "off",
        "no-extra-boolean-cast": "off",
    },
};
