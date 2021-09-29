<template>
    <div class="iview-practice-container">
        <div class="block-item">
            <div class="intro">
                <p>form input和自定义类型的校验提示</p>
                <p>prop为formData内字段，*用require确定，v-model要对应，trigger有blur和change方式，可兼容，默认是2者都生效</p>
                <p>
                    有些自定义类容无法通过blur和change方式出发检验时机，watch也好，在改变数据的时候也好，可以主动通过refs触发校验
                </p>
                <p>正则校验模式，可以直接指定正则</p>
                <Button @click="submitForm">提交表单</Button>
            </div>
            <div class="com-item">
                <Form ref="form" :model="formData" :label-width="100" :rules="formRules">
                    <FormItem label="input字段：" prop="inputContent">
                        <Input style="width: 300px;" v-model="formData.inputContent" placeholder="在此输入标题"></Input>
                    </FormItem>
                    <FormItem label="select字段：" prop="selectContent">
                        <Select v-model="formData.selectContent" style="width: 300px">
                            <Option v-for="(item, i) in selectData" :value="item.value" :key="i">{{ item.label }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="自定义字段：" prop="customContent">
                        <div class="tabs">
                            <div
                                class="tab-item"
                                :style="formData.customContent == item ? 'color: red' : ''"
                                v-for="item in [1, 2, 3]"
                                :key="item"
                                @click="selectCustom(item)"
                            >
                                {{ item }}
                            </div>
                            <Button @click="clearCustomContent">清空</Button>
                        </div>
                    </FormItem>
                    <FormItem label="reg字段：" prop="regContent">
                        <Input style="width: 300px;" v-model="formData.regContent" placeholder="在此输入手机号"></Input>
                    </FormItem>
                </Form>
            </div>
        </div>
    </div>
</template>
<script>
// mg组件封装
import { Button, Table, Select, Option, Tree, Form, FormItem } from "iview";
export default {
    components: {
        Button,
        Select,
        Form,
        Option,
        FormItem,
    },
    watch: {
        "formData.customContent": {
            handler(v, ov) {
                this.$refs.form.validateField("customContent");
            },
            deep: true,
        },
    },
    data() {
        const vSelectContent = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请选择"));
            } else {
                callback();
            }
        };
        const vCustomContent = (rule, value, callback) => {
            if (!value) {
                callback(new Error("请填写"));
            } else {
                callback();
            }
        };
        return {
            // form数据和检验规则，prop为formData字段
            formData: {
                inputContent: "",
                selectContent: "",
                customContent: "",
                regContent: "",
            },
            formRules: {
                inputContent: [
                    {
                        required: true,
                        message: "请输入",
                        trigger: "blur",
                    },
                ],
                selectContent: [
                    {
                        required: true,
                        trigger: "blur,change",
                        validator: vSelectContent,
                    },
                ],
                customContent: [
                    {
                        required: true,
                        trigger: "blur,change",
                        validator: vCustomContent,
                    },
                ],
                regContent: [
                    {
                        required: true,
                        trigger: "blur",
                        message: "请输入正确格式的手机号",
                        pattern: /^1[3-9](\d{9})$/,
                    },
                ],
            },
            selectData: [
                {
                    label: "aaa",
                    value: "1",
                },
                {
                    label: "bbb",
                    value: "2",
                },
            ],
        };
    },
    methods: {
        clearCustomContent() {
            this.formData.customContent = "";
        },
        selectCustom(item) {
            this.formData.customContent = item;
            console.log(this.formData);
        },
        submitForm() {
            this.$refs["form"].validate((valid) => {
                console.log(valid, this.formData);
            });
        },
    },
};
</script>
<style lang="less" scoped>
.iview-practice-container {
    box-sizing: border-box;
    padding: 20px;
    background: #fff;

    .tabs {
        position: relative;
        display: flex;
        width: 200px;
        .tab-item {
            width: 40px;
            text-align: center;
            border: 1px #eee solid;
            height: 30px;
            line-height: 30px;
            cursor: pointer;
        }
    }
}
</style>
