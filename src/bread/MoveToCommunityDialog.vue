<template>
    <el-dialog
        custom-class="m-design-task"
        :width="isPhone ? '95%' : '600px'"
        :visible="modelValue"
        @close="close"
        title="迁移至论坛"
        append-to-body
    >
        <el-form :model="form" ref="form" :label-position="isPhone ? 'top' : 'left'" label-width="80px">
            <el-form-item label="分类">
                <el-select v-model="form.category" placeholder="请选择文章分类" style="width: 100%" filterable>
                    <el-option
                        v-for="item in categoryList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="简介">
                <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form.introduction"> </el-input>
            </el-form-item>
        </el-form>

        <el-divider content-position="left">附图</el-divider>
        <div class="u-imgs">
            <div
                :class="`u-imgs-item ${form.banner_img === item && 'active'}`"
                v-for="(item, i) in form.extra_images"
                :key="i"
                @click="setBannerIndex(item)"
            >
                <el-image :src="item" fit="cover" style="width: 148px; height: 148px" />
                <div class="u-mark">封面</div>
            </div>
        </div>

        <el-divider content-position="left"></el-divider>

        <div class="u_r_box">
            <el-popover placement="top" trigger="manual" size="mini" content="请确认此操作不可逆" v-model="visible">
                <el-checkbox slot="reference" v-model="checked">我已确认此操作不可逆</el-checkbox>
            </el-popover>
        </div>
        <template #footer>
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="onConfirm">确 定</el-button>
        </template>
    </el-dialog>
</template>

<script>
import { getTopicBucket, recoverTopicFromPosts } from "../../service/community";

export default {
    name: "MoveToCommunityDialog",
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
        post: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
    model: {
        prop: "modelValue",
        event: "update:modelValue",
    },
    emits: ["update:modelValue"],
    data() {
        return {
            visible: false,
            checked: false,
            form: {
                category: "",
                id: "",
                introduction: "",
                banner_img: undefined,
                extra_images: undefined,
            },
            categoryList: [],
            isPhone: window.innerWidth < 768,
        };
    },
    watch: {
        modelValue(val) {
            if (val) {
                this.getCategoryList();
                this.initForm();
            }
        },
        checked(val) {
            if (val) {
                this.visible = false;
            }
        },
    },
    methods: {
        initForm() {
            this.form.id = this.post.ID;
            const content = this.post.post_content;
            this.form.introduction = this.getIntroduction(content);
            const imgs = this.getImgSrc(content);
            if (imgs.length > 0) this.form.extra_images = [...new Set(imgs)];
        },

        close() {
            this.$emit("update:modelValue", false);
        },
        clearForm() {
            this.form = { category: "", id: "", introduction: "", banner_img: "", extra_images: [] };
        },
        setBannerIndex(img) {
            this.form.banner_img = img;
        },
        onConfirm() {
            if (!this.post?.ID) {
                this.$message.error("文章ID不存在!");
                return;
            }
            if (!this.form.category) {
                this.$message.error("请选择分类!");
                return;
            }
            if (!this.checked) {
                this.visible = true;
                return;
            }
            recoverTopicFromPosts(this.form).then(() => {
                this.$message.success("操作成功");
                this.close();
                this.clearForm();
            });
        },
        onCancel() {
            this.close();
            this.clearForm();
        },
        getCategoryList() {
            getTopicBucket({ type: "community" }).then((res) => {
                this.categoryList = res.data.data;
            });
        },
        getIntroduction(str) {
            // 使用正则表达式匹配HTML标签并将其替换为空字符串
            const withoutTags = str.replace(/<[^>]*>|\n|&nbsp;| &nbsp;/g, "");

            // 获取前100个字符，如果字符串长度小于200，则获取全部字符
            return withoutTags.slice(0, 200);
        },
        getImgSrc: function (htmlString) {
            // 创建一个正则表达式来匹配没有class属性的<img>标签，并且捕获src属性的值
            const imgSrcRegex = /<img\s+(?![^>]*\bclass\b)[^>]*src="([^"]*)"/g;
            let matches;
            const imgSrcs = [];

            // 使用正则表达式全局匹配HTML字符串中的所有<img>标签
            while ((matches = imgSrcRegex.exec(htmlString)) !== null) {
                // matches[1] 是正则表达式中捕获组的内容，即src的值
                imgSrcs.push(matches[1]);
            }

            return imgSrcs;
        },
    },
};
</script>

<style lang="less">
.u_r_box {
    display: flex;
    justify-content: flex-end;
}
.u-imgs {
    display: flex;
    overflow-x: auto;
    gap: 8px;
}
.u-imgs-item {
    min-width: 148px;
    overflow: hidden;
    border-radius: 6px;
    box-sizing: border-box;
    height: 148px;
    cursor: pointer;
    position: relative;
    border: 2px solid transparent;
    transition: 0.35s;
    background-color: @bg-light;
    &:hover {
        border-color: #0366d6;
    }
    &.active {
        border-color: #0366d6;
        .u-mark {
            display: block;
        }
    }
    img {
        width: 100%;
    }
    .u-mark {
        display: none;
        position: absolute;
        top: 2px;
        right: 2px;
        padding: 4px 8px;
        font-size: 12px;
        background-color: #0366d6;
        color: white;
        border-radius: 4px;
    }
}
.m-design-task {
    .el-form-item {
        margin-bottom: 12px;
    }
    .m-star-line {
        .el-form-item__content {
            top: 10px;
        }
    }
    .u-time {
        color: #c0c4cc;
    }
}

@media screen and (max-width: @phone) {
    .m-design-task {
        .m-star-line {
            .el-form-item__content {
                top: 0;
            }
        }
    }
}
</style>
