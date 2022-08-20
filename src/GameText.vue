<!--
 * @Author: X3ZvaWQ
 * @Date: 2022-08-20 20:23:57
 * @LastEditors: X3ZvaWQ
 * @LastEditTime: 2022-08-20 23:12:34
 * @Description: 用于渲染游戏内Text标签的文本
-->
<template>
    <span v-html="html"></span>
</template>

<script>
import { extractTextContent, getLink } from "@jx3box/jx3box-common/js/utils";
import { getResource } from "../service/resource";

export default {
    name: "GameText",
    props: {
        text: {
            type: String,
            default: "",
        },
        client: {
            type: String,
            default: "std",
        },
    },
    data: function () {
        return {
            html: "",
        };
    },
    methods: {
        /**
         * 渲染某一个单独的Text标签成Span或链接
         * @param {*} school_id
         * @returns
         */
        renderItemHtml: function (item) {
            let content = item.text;
            let style = ``;
            let link = null;
            content = content.replace(/\n/g, "<br />").replace(/\\/g, "");
            if ([item.r, item.g, item.b].every((v) => v != undefined && v > 0)) {
                style = `color: rgb(${item.r}, ${item.g}, ${item.b});`;
            } else if (item.font != undefined) {
                const fonts = require("../assets/data/game_font.json");
                for (let color in fonts) {
                    if (fonts[color].includes(item.font)) {
                        style = `color: ${color};`;
                        break;
                    }
                }
            }
            if (item.name == "iteminfolink" && item.script) {
                let item_type = item.script?.match(/this\.dwTabType=(\d+)/i)?.[1];
                let item_index = item.script?.match(/this\.dwIndex=(\d+)/i)?.[1];
                if (item_type && item_index) {
                    let item_id = `${item_type}_${item_index}`;
                    link = getLink("item", item_id);
                }
            }
            if (link) {
                return `<a style="${style} text-decoration: none;" target="_blank" href="${link}">${content}</a>`;
            } else {
                return `<span style="${style}">${content}</span>`;
            }
        },
        /**
         * 将一段游戏内文本转换为Html
         * @param {Object[]} texts 标签对象
         */
        renderTextHtml: function (Text) {
            let result = Text;
            const matches = Text.match(/<Text>(.*?)<\/text>/gimsy);
            if (!matches) return Text;
            for (let match of matches) {
                let text = extractTextContent(match);
                let html = this.renderItemHtml(text[0]);
                result = result.replace(match, html);
            }
            return result;
        },
        /**
         * 获取形如<BUFF 110 1 desc>的资源字段并转换
         */
        renderResource: function () {
            const matches = this.html.match(/<BUFF (\d+) (\d+) (.*?)>/gim);
            if (!matches) return;
            for (let match of matches) {
                let [, id, level, type] = match.match(/<BUFF (\d+) (\d+) (.*?)>/i);
                type = type.toLowerCase();
                let type_map = {
                    desc: "Desc",
                    time: "Interval",
                };
                getResource(`buff.${id}_${level}`, this.client)
                    .then((res) => {
                        let data = res.data;
                        let attr = type_map[type] || type;
                        let value = data[attr];
                        if (typeof value == "number" && type == "time") {
                            let time = value / 16;
                            if (time > 60) {
                                time = `${Math.floor(time / 60)}分钟`;
                            } else {
                                time = `${time}秒`;
                            }
                            this.html = this.html.replace(match, time);
                            return;
                        }
                        if (!value) return;
                        let _matches = value.match(/<BUFF ([0-9a-zA-Z]+)>/gi);
                        if (!_matches) this.html = this.html.replace(match, value);
                        for (let _match of _matches) {
                            let [, _attr] = _match.match(/<BUFF ([0-9a-zA-Z]+)>/i);
                            for (let i = 1; i < 15; i++) {
                                if (data[`BeginAttrib${i}`] == _attr) {
                                    value = value.replace(_match, data[`BeginValue${i}A`]);
                                }
                            }
                        }
                        this.html = this.html.replace(match, value);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
    },
    watch: {
        text: {
            immediate: true,
            handler: function (val) {
                this.html = this.renderTextHtml(val);
                this.renderResource();
            },
        },
    },
};
</script>

<style>
</style>
