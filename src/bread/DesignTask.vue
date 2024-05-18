<template>
    <el-dialog custom-class="m-design-task" :width="isPhone ? '95%' : '600px'" :visible="modelValue" @close="close" title="快捷推送" append-to-body>
        <el-form :model="form" ref="form" :label-position="isPhone ? 'top' : 'left'" label-width="80px">
            <el-form-item label="标题">
                <el-input v-model="form.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="类型">
                <el-select v-model="form.type" placeholder="请选择类型" style="width:100%;" filterable>
                    <el-option v-for="item in config" :key="item.id" :label="item.label" :value="item.name"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="版本">
                <el-radio-group v-model="form.version">
                    <el-radio-button v-for="(label, key) in versions" :key="key" :label="key">{{ label }}</el-radio-button>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="form.remark" placeholder="请输入备注"></el-input>
            </el-form-item>
            <el-form-item label="星级" class="m-star-line">
                <el-rate v-model="form.star" :colors="colors"></el-rate>
            </el-form-item>
        </el-form>

        <el-divider content-position="left">
            近期推送
        </el-divider>
        <template v-if="logs && logs.length">
            <el-table :data="logs" border size="small" max-height="300px">
                <el-table-column label="推送时间" prop="push_at" align="center">
                    <template #default="{row}">
                        {{ formatTime(row.push_at) }}
                    </template>
                </el-table-column>
                <el-table-column label="推送人" prop="pusher.display_name" align="center"></el-table-column>
                <el-table-column label="星级" prop="star" align="center">
                    <template #default="{row}">
                        <el-rate v-model="row.star" disabled :colors="colors"></el-rate>
                    </template>
                </el-table-column>
                <el-table-column label="备注" prop="remark" align="center"></el-table-column>
            </el-table>
        </template>
        <el-alert v-else title="当前文章暂无历史推送" type="info" show-icon :closable="false"></el-alert>
        <template #footer>
            <el-button @click="close">取 消</el-button>
            <el-button type="primary" @click="onConfirm">确 定</el-button>
        </template>
    </el-dialog>
</template>

<script>
import { createDesignTask, getDesignTask, getConfigBannerTypes } from "../../service/design";
import {pick} from "lodash";
import dayjs from "dayjs";
import User from "@jx3box/jx3box-common/js/user";
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
                subtype: "",
                version: "std"
            },
            colors: ['#99A9BF', '#F7BA2A', '#FF9900'],

            logs: [],
            config: [],

            isPhone: window.innerWidth < 768,
            isEditor: User.isEditor(),

            versions: {
                "std": "旗舰",
                "origin": "缘起",
                "wujie": "无界",
                "test": "体服"
            }
        }
    },
    watch: {
        modelValue(val) {
            if (val) {
                if (this.post) {
                    this.form.title = this.post.post_title;
                }
                this.loadLogs();

                if (User.isTeammate()) {
                    this.loadConfig();
                }
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
                subtype: "",
                version: "std",
            }

            this.$refs?.form?.clearValidate();
        },
        onConfirm() {
            if (!this.post?.ID) return;
            const data = pick(this.post, ["client", "author"]);
            data.title = this.form.title;
            data.remark = this.form.remark;
            data.star = this.form.star;
            data.subtype = this.form.type;
            data.version = this.form.version;

            data.source_type = this.post?.post_type;
            data.source_id = String(this.post?.ID);
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
            if (!this.post?.ID) return;
            getDesignTask({ source_id: this.post?.ID }).then(res => {
                this.logs = res.data.data || [];
            })
        },
        loadConfig() {
            getConfigBannerTypes({ _no_page: 1 }).then(res => {
                this.config = res.data.data || [];
                this.config = this.config.filter(item => item.parent_id == 1);
            })
        },
        formatTime(time) {
            return dayjs(time).format("YYYY-MM-DD HH:mm:ss");
        }
    }
}
</script>

<style lang="less">
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
