<template>
    <div class="iview-practice-container">
        <div class="block-item">
            <div class="intro">
                <p>iview安装和引入，直接安装ivew，在main里引入既可</p>
            </div>
            <div class="com-item">
                <Button>这是一个普通iview按钮</Button>
            </div>
        </div>
        <div class="block-item">
            <div class="intro">
                <p>table的常见使用</p>
                <p>静态表头和常规表体</p>
                <p>表头字段为columns里的key，渲染对应key的值，data里冗余字段不处理</p>
                <p>stripe隔行背景色</p>
                <p>如要多选，columns第一项可设为selection</p>
                <p>通过遍历data项，设置_checked返显</p>
                <p>自定义表头，通过render回调设置内容</p>
            </div>
            <div class="com-item">
                <Table :columns="tableColumns1" border="" stripe :data="tableData1"></Table>
            </div>
        </div>
        <div class="block-item">
            <div class="intro">
                <p @click="setTreeNodeNotChecked">tree的常见使用</p>
                <p>分级嵌套结构数据</p>
                <p>多选功能show-checkbox</p>
                <p>render节点处理，比如编辑名称，删除等操作</p>
                <p>如果数据为动态数据，废话，一般都是，有render的需求要先处理，比如每一项都添加edit和delete操作</p>
            </div>
            <div class="com-item">
                <Tree ref="ttree" :data="treeData1" show-checkbox></Tree>
            </div>
        </div>
    </div>
</template>
<script>
// table 表头和返显的处理
// tree 多级数据格式和选择处理
// select 多选和搜索等处理
// mg组件封装
import { Button, Table, Select, Tree } from "iview";
export default {
    components: {
        Button,
        Table,
        Select,
        Tree,
    },
    data() {
        return {
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
            // 常规树使用数据
            treeData1: [
                {
                    title: "分类1",
                    expand: true,
                    children: [
                        {
                            title: "分类1-1",
                            expand: true,
                            render: (h, { root, node, data }) => {
                                return h(
                                    "span",
                                    {
                                        style: {
                                            display: "inline-block",
                                            width: "100%",
                                        },
                                    },
                                    [
                                        h("span", data.title),
                                        h(
                                            "span",
                                            {
                                                style: {
                                                    margin: "0 10px",
                                                    color: "red",
                                                },
                                                on: {
                                                    click: () => {
                                                        console.log(data);
                                                    },
                                                },
                                            },
                                            "edit"
                                        ),
                                        h(
                                            "span",
                                            {
                                                style: {
                                                    margin: "0 10px",
                                                    color: "red",
                                                },
                                                on: {
                                                    click: () => {
                                                        const parentKey = root.find((el) => el === node).parent;
                                                        const parent = root.find((el) => el.nodeKey === parentKey).node;
                                                        const index = parent.children.indexOf(data);
                                                        parent.children.splice(index, 1);
                                                    },
                                                },
                                            },
                                            "delete"
                                        ),
                                    ]
                                );
                            },
                            children: [
                                {
                                    title: "分类 1-1-1",
                                },
                                {
                                    title: "分类 1-1-2",
                                },
                            ],
                        },
                        {
                            title: "分类 1-2",
                            expand: true,
                            checked: true,
                            children: [
                                {
                                    title: "分类 1-2-1",
                                    checked: true,
                                },
                                {
                                    title: "分类 1-2-2",
                                },
                            ],
                        },
                    ],
                },
                {
                    title: "分类2",
                    expand: true,
                    children: [
                        {
                            title: "分类2-1",
                            expand: true,
                            children: [
                                {
                                    title: "分类 2-1-1",
                                },
                                {
                                    title: "分类 2-1-2",
                                },
                            ],
                        },
                        {
                            title: "分类 2-2",
                            expand: true,
                            children: [
                                {
                                    title: "分类 2-2-1",
                                },
                                {
                                    title: "分类 2-2-2",
                                },
                            ],
                        },
                    ],
                },
            ],
            // 常规表格使用数据
            tableColumns1: [
                {
                    type: "selection",
                    width: 60,
                    align: "center",
                },
                {
                    title: "Name",
                    key: "name",
                },
                {
                    title: "Age",
                    key: "age",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small",
                                    },
                                    style: {
                                        marginRight: "5px",
                                    },
                                    on: {
                                        click: () => {
                                            console.log(params);
                                        },
                                    },
                                },
                                "编辑"
                            ),
                            h(
                                "Button",
                                {
                                    props: {
                                        type: "primary",
                                        size: "small",
                                    },
                                    style: {
                                        marginRight: "5px",
                                    },
                                    on: {
                                        click: () => {
                                            console.log(params);
                                        },
                                    },
                                },
                                "删除"
                            ),
                        ]);
                    },
                },
                {
                    title: "Address",
                    key: "address",
                    render: (h, params) => {
                        return h("div", [
                            h(
                                "s",
                                {
                                    style: {
                                        marginRight: "5px",
                                    },
                                },
                                params.index
                            ),
                            h("i", params.row.address),
                        ]);
                    },
                },
            ],
            tableData1: [
                {
                    name: "John Brown",
                    age: 18,
                    address: "New York No. 1 Lake Park",
                    date: "2016-10-03",
                },
                {
                    name: "Jim Green",
                    age: 24,
                    address: "London No. 1 Lake Park",
                    date: "2016-10-01",
                },
                {
                    name: "Joe Black",
                    age: 30,
                    address: "Sydney No. 1 Lake Park",
                    date: "2016-10-02",
                },
                {
                    name: "Joe Black1",
                    age: 31,
                    address: "Sydney 1No. 1 Lake Park",
                    date: "2016-10-01",
                },
                {
                    name: "Joe Black",
                    age: 20,
                    address: "Sydney 2No. 1 Lake Park",
                    date: "2016-10-22",
                },
                {
                    name: "Joe Black",
                    age: 34,
                    address: "Sydney 4No. 1 Lake Park",
                    date: "2016-10-402",
                },
            ],
        };
    },
    mounted() {
        var d = this.tableData1;
        d.forEach((item, index) => {
            if (index % 2 == 0) {
                this.$set(item, "_checked", true);
            }
        });
    },
    methods: {
        setTreeNodeNotChecked() {
            var tar = this.treeData1[0].children[1].children[1];
            this.$set(tar, "checked", false);
            console.log(this.$refs.ttree.getCheckedNodes(), this.treeData1);
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
