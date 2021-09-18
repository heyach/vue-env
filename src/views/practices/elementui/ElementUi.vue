<template>
    <div class="element-ui">
        <div class="title">常用的element-ui组件</div>
        <div class="block-item">
            <div class="intro">
                <p>button</p>
                <p>按钮类型type（primary，success）</p>
                <p>圆角round</p>
                <p>图标按钮icon（el-icon-message）</p>
                <p>禁用disabled</p>
                <p>大小（small，mini，medium）</p>
            </div>
            <div class="com-item">
                <el-button type="primary" @click="btnClick">确认</el-button>
                <el-button type="primary" round @click="btnClick">确认</el-button>
                <el-button type="primary" disabled @click="btnClick">确认</el-button>
                <el-button type="primary" size="mini" @click="btnClick">确认</el-button>
                <el-button type="primary" icon="el-icon-message" size="mini" @click="btnClick">确认</el-button>
            </div>
        </div>
        <div class="block-item">
            <div class="intro">
                <p>radio-group</p>
                <p>绑定v-model，设值为label</p>
                <p>禁用disabled</p>
                <p>change</p>
            </div>
            <div class="com-item">
                <el-radio v-model="radioModel" label="1">选项1</el-radio>
                <el-radio v-model="radioModel" label="2">选项2</el-radio>
                <el-radio-group v-model="radioGroupModel" @change="radioChange">
                    <el-radio :label="3">选项3</el-radio>
                    <el-radio :label="4" disabled>选项4</el-radio>
                    <el-radio :label="5">选项5</el-radio>
                </el-radio-group>
            </div>
        </div>
        <div class="block-item">
            <div class="intro">
                <p>checkbox</p>
                <p>checkbox单独使用单独绑定model</p>
                <p>checkbox-group一组绑定一个model，通过label来设置选项的值和选中状态</p>
                <p>通过model预设checkbox的选中状态</p>
            </div>
            <div class="com-item">
                <el-checkbox v-model="checkboxModel1">选项1</el-checkbox>
                <el-checkbox v-model="checkboxModel2">选项2</el-checkbox>
                <el-checkbox-group v-model="checkboxGroupModel">
                    <el-checkbox :label="3">选项3</el-checkbox>
                    <el-checkbox :label="4">选项4</el-checkbox>
                </el-checkbox-group>
            </div>
        </div>
        <div class="block-item">
            <div class="intro">
                <p>input</p>
                <p>清除按钮clearable</p>
                <p>前后置文本和icon，prepend等slot</p>
                <p>默认100%宽度，通过el-col来控制</p>
            </div>
            <div class="com-item">
                <el-row>
                    <el-col :span="6">
                        <el-input v-model="inputModel" clearable>
                            <template slot="prepend">hello</template>
                        </el-input>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="block-item">
            <div class="intro">
                <p>select</p>
                <p>通过model获取选中结果</p>
                <p>通过label设置option展示内容</p>
                <p>通过value设置option的值，配合model初始化选中</p>
            </div>
            <div class="com-item">
                <el-select v-model="selectModel">
                    <el-option :value="1" label="选项1"></el-option>
                    <el-option :value="2" label="选项2"></el-option>
                    <el-option :value="3" label="选项3"></el-option>
                </el-select>
            </div>
        </div>
        <div class="block-item">
            <div class="intro">
                <p>cascader</p>
                <p>级联选择器下级内容一般是异步加载的，看源码实现自定义级联选择器</p>
            </div>
            <div class="com-item"></div>
        </div>
        <div class="block-item">
            <div class="intro">
                <p>datepicker</p>
            </div>
            <div class="com-item">
                <el-date-picker v-model="dataPickerModel" type="date" placeholder="选择日期"></el-date-picker>
            </div>
        </div>
        <div class="block-item">
            <div class="intro">
                <p>upload</p>
                <p>移除文件钩子on-remove</p>
                <p>上传成功钩子on-success</p>
                <p>上传接口地址action</p>
                <p>预览文件列表file-list</p>
                <p>上传数量限制limit</p>
            </div>
            <div class="com-item">
                <el-upload
                    :limit="uploadFileListLimit"
                    :action="uploadFileUrl"
                    :on-remove="removeFile"
                    :on-success="uploadFileSuccess"
                    name="file"
                    :file-list="uploadFileList"
                    list-type="picture-card"
                >
                    <i class="el-icon-plus"></i>
                </el-upload>
            </div>
        </div>
        <div class="block-item">
            <div class="intro">
                <p>form</p>
                <p>form-item</p>
                <p>table</p>
                <p>table-column</p>
                <p>col</p>
                <p>form-item label和必填提示</p>
                <p>form校验rules和自定义校验validateUserName</p>
                <p>table表头label和列数据prop</p>
                <p>slot-scope自定义操作行数据</p>
                <p>dialog为遮罩弹出层</p>
            </div>
            <div class="com-item">
                <el-form ref="userForm" :rules="rules" :model="formModel">
                    <el-form-item label="用户姓名" prop="userName">
                        <el-col :span="4">
                            <el-input size="small" v-model="formModel.userName"></el-input>
                        </el-col>
                    </el-form-item>
                    <el-form-item label="用户列表" prop="userList">
                        <el-table :data="userList">
                            <el-table-column prop="id" label="用户id"></el-table-column>
                            <el-table-column prop="name" label="用户name"></el-table-column>
                            <el-table-column prop="info" label="用户info">
                                <template slot-scope="scope">
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        v-if="scope.row.id == 1"
                                        @click="editTableItem(scope.row.info)"
                                        >编辑</el-button
                                    >
                                    <el-button
                                        type="primary"
                                        size="mini"
                                        v-if="scope.row.id == 2"
                                        @click="showDailog(scope.row)"
                                        >删除</el-button
                                    >
                                    {{ scope.row.info }}
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-form-item>
                    <el-button type="primary" @click="formCommit">提交</el-button>
                </el-form>
            </div>
        </div>
        <el-dialog :title="dialogDetail.title" :visible.sync="dialogVisible" width="30%">
            <span>{{ dialogDetail.content }}</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    Button,
    Row,
    Col,
    RadioGroup,
    Radio,
    Checkbox,
    CheckboxGroup,
    Input,
    Select,
    Option,
    Cascader,
    Slider,
    TimePicker,
    DatePicker,
    Upload,
    Form,
    FormItem,
    Pagination,
    MessageBox,
    Dialog,
    Popover,
    Table,
    TableColumn,
} from "element-ui";
export default {
    components: {
        "el-button": Button,
        "el-radio-group": RadioGroup,
        "el-radio": Radio,
        "el-checkbox-group": CheckboxGroup,
        "el-checkbox": Checkbox,
        "el-input": Input,
        "el-row": Row,
        "el-col": Col,
        "el-select": Select,
        "el-option": Option,
        "el-datePicker": DatePicker,
        "el-upload": Upload,
        "el-form": Form,
        "el-form-item": FormItem,
        "el-table": Table,
        "el-table-column": TableColumn,
        "el-dialog": Dialog,
    },
    data() {
        //自定义字段校验规则
        var validateUserName = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("用户名不能为空"));
            } else {
                return callback();
            }
        };
        return {
            radioModel: "1",
            radioGroupModel: 3,
            checkboxModel1: true,
            checkboxModel2: false,
            checkboxGroupModel: [3],
            inputModel: 10,
            selectModel: 2,
            dataPickerModel: "",
            uploadFileList: [],
            uploadFileListLimit: 5,
            uploadFileUrl: "http://mch.plym.com/upload/image",
            rules: {
                userName: [{ validator: validateUserName }],
            },
            formModel: {
                userName: "",
            },
            userList: [
                {
                    id: 1,
                    name: "aaa",
                    info: "aaaa",
                },
                {
                    id: 2,
                    name: "bbb",
                    info: "bbbb",
                },
            ],
            dialogVisible: false,
            dialogDetail: {},
        };
    },
    methods: {
        removeFile(file, fileList) {
            this.uploadFileList = fileList;
        },
        uploadFileSuccess(response, file, fileList) {
            this.uploadFileList = fileList;
        },
        btnClick() {
            console.log("btnclick");
        },
        radioChange() {
            console.log(this.radioModel, this.radioGroupModel);
        },
        editTableItem(item) {
            console.log(item);
        },
        formCommit() {
            this.$message("这是一条消息提示");
            this.$refs["userForm"].validate((valid) => {
                console.log(222, valid);
            });
        },
        showDailog(item) {
            this.dialogVisible = true;
            this.dialogDetail = {
                title: item.name,
                content: item.info,
            };
            console.log(item);
        },
        ttt() {
            console.log(this.formModel);
        },
    },
};
</script>
<style lang="less" scoped>
.element-ui {
    box-sizing: border-box;
    padding: 20px;
    background: #fff;

    .title {
        line-height: 50px;
    }
}
</style>
