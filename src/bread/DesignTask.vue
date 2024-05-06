<template>
    <el-dialog custom-class="m-design-task" :visible="modelValue" @close="close" title="快捷推送" append-to-body>
        <el-form :model="form" :rules="rules" ref="form" label-position="left" label-width="80px">
            <el-form-item label="标题" required>
                <el-input v-model="form.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
            <el-form-item label="星级" class="m-star-line">
                <el-rate v-model="form.star" :colors="colors"></el-rate>
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="onConfirm">确 定</el-button>
        </template>
    </el-dialog>
</template>

<script>
import { createDesignTask, getDesignTask } from "../../service/design";
import {pick} from "lodash";
export default {
    name: "DesignTask",
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        post: {
            type: Object,
            default: () => {}
        }
    },
    model: {
        prop: "modelValue",
        event: "update:modelValue"
    },
    emits: ["update:modelValue"],
    data() {
        return {
            form: {
                title: "",
                remark: "",
                star: 0,
            },
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],

            logs: [],
            rules: {
                title: [
                    { required: true, message: "请输入标题", trigger: "blur" },
                ],
            },
        }
    },
    watch: {
        modelValue(val) {
            if (val) {
                this.loadLogs();
            }
        }
    },
    methods: {
        close(){
            this.$emit("update:modelValue",false)
        },
        clearForm() {
            this.form = {
                title: "",
                remark: "",
                star: 0,
            }

            this.$refs?.form?.clearValidate();
        },
        onConfirm() {
            if (!this.post?.ID) return;
            const data = pick(this.post, ["client", "author"]);
            data.title = this.form.title;
            data.remark = this.form.remark;
            data.star = this.form.star;
            data.source_type = this.post?.post_type;
            data.source_id = this.post?.ID;
            data.link = `/${this.post?.post_type}/${this.post?.ID}`;
            data.flow = 0;

            createDesignTask(data).then(() => {
                this.$message.success("提交成功");
                this.close();
            })
        },
        onCancel() {
            this.close();
            this.clearForm();
        },
        loadLogs() {
            getDesignTask().then(res => {
                this.logs = res.data.data || [];
            })
        }
    }
}
</script>

<style lang="less">
.m-design-task {
    .m-star-line {
        .el-form-item__content {
            top: 10px;
        }
    }
}
</style>
