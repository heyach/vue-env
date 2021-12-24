import Vue from "vue";
const vueIns = new Vue();
const treeUtils = {
    transDataToTree: function transDataToTree(list, parentId = "parentId", title = "name") {
        var map = {},
            node,
            roots = [],
            i;
        for (i = 0; i < list.length; i += 1) {
            map[list[i].id] = i; //建一个对象，key是id, 值是在list中的位置
            list[i].children = [];
        }
        for (i = 0; i < list.length; i += 1) {
            node = list[i];
            node.title = node[title];
            node.isRole = node.checked;
            var pid = parentId ? node[parentId] : node.pid;
            if (list[map[pid]]) {
                // 通过位置值找到当前的parent
                list[map[pid]].children.push(node);
            } else {
                roots.push(node);
            }
        }
        return roots;
    },
	
    treeBtnDelStyle: function(render, onOk, onCancel, onBefore, title) {
        var _title = title ? title : "你确定要删除吗？";
        return render(
            "Poptip",
            {
                props: { confirm: true, title: _title, width: 200, placement: "top-end", transfer: true },
                on: {
                    "on-ok": onOk,
                    "on-cancel": onCancel || function() {},
                },
            },
            [
                render(
                    "a",
                    {
                        attrs: { href: "javascript:;" },
                        style: { margin: "0 0 0 5px" },
                        class: "c-tree-btn-del",
                        on: {
                            click: () => {
                                onBefore && onBefore();
                            },
                        },
                    },
                    "删除"
                ),
            ]
        );
    },
    treeBtnEditStyle: function(h, options) {
        var _onInput = options.onInput,
            _onSave = options.onSave,
            _onCancel = options.onCancel;
        var _title = options.title || "名称",
            _value = options.value || "";
        var _btnTxt = options.type == "add" ? "新建" : "编辑";
        return h(
            "Poptip",
            {
                props: { width: 285, transfer: true },
            },
            [
                h(
                    "a",
                    {
                        attrs: { href: "javascript:;" },
                        style: { margin: "0 0 0 5px" },
                        class: { "c-tree-btn-edit": true },
                    },
                    _btnTxt
                ),
                h("div", { slot: "content" }, [
                    h(
                        "div",
                        {
                            style: { lineHeight: "30px" },
                        },
                        _title
                    ),
                    h("input", {
                        attrs: { type: "text" },
                        domProps: { value: _value },
                        class: "c-tree-tip-input",
                        on: {
                            input: (event) => {
                                _onInput && _onInput(event);
                            },
                        },
                    }),
                    h(
                        "Button",
                        {
                            on: {
                                click: () => {
                                    _onSave && _onSave();
                                },
                            },
                            style: {
                                "margin-right": "8px",
                            },
                            props: {
                                type: "primary",
                                size: "small",
                            },
                        },
                        "保存"
                    ),
                    h(
                        "Button",
                        {
                            on: {
                                click: () => {
                                    _onCancel ? _onCancel() : document.body.click();
                                },
                            },
                            class: {
                                "c-btn-back": true,
                            },
                            props: {
                                type: "primary",
                                size: "small",
                            },
                        },
                        "取消"
                    ),
                ]),
            ]
        );
    },
    setTreeRootExpand(treeData) {
        var len = treeData.length;
        var item;
        for (var i = 0; i < len; i++) {
            item = treeData[i];
            if (item.parentId == 0) {
                item.expand = true;
            }
        }
    },
    setTreeExpandSelected: function setTreeExpandSelected(treeData, id, isSingle, parent) {
        treeData.forEach((item) => {
            if (isSingle) {
                vueIns.$set(item, "selected", false);
            }
            if ((id + "").split(",").find((v) => v == item.id)) {
                vueIns.$set(item, "expand", true);
                vueIns.$set(item, "selected", true);
                if (parent) {
                    vueIns.$set(parent, "expand", true);
                }
            }
            item.children.forEach((child) => {
                if (child.children.length) {
                    vueIns.$set(item, "expand", true);
                }
            });
            setTreeExpandSelected(item.children, id, isSingle, item);
        });
    },
    addTreeRoot: function(tree) {
        return [
            {
                parentId: null,
                id: 0,
                name: "全部",
                isRoot: true,
                children: tree,
                expand: true,
            },
        ];
    },
    getTreeAllParentId(data, id) {
        var ids = [];

        var _getTreeAllParentId = function(treeData, id) {
            var len = treeData.length;
            var item;
            for (var i = 0; i < len; i++) {
                item = treeData[i];
                if (item.id == id) {
                    ids.push(id);
                    if (item.parentId) _getTreeAllParentId(data, item.parentId);
                }
            }
        };

        _getTreeAllParentId(data, id);
        return ids;
    },
    setTreeExpand: function setTreeExpand(treeData, id) {
        // 非标准树结构，从子往父遍历
        var len = treeData.length;
        var item;
        for (var i = 0; i < len; i++) {
            item = treeData[i];
            if (item.id == id) {
                if (vueIns) vueIns.$set(item, "expand", true);
                else item.expand = true;
                setTreeExpand(treeData, item.parentId);
            }
        }
    },
    setFlatTreeSelected(flatData, id) {
        var item,
            len = flatData.length;
        for (var i = 0; i < len; i++) {
            item = flatData[i];
            if (item.id == id) {
                vueIns.$set(item, "selected", true);
            }
        }
    },
    getTrueTreeAllParentId(data, id) {
        var ids = [];

        var _findLeaf = function(treeData, id) {
            var len = treeData.length;
            var item;
            for (var i = 0; i < len; i++) {
                item = treeData[i];
                if (item.id == id) {
                    ids.push(id);
                    _findLeaf(data, item.parentId);
                    break;
                } else {
                    if (item.children) _findLeaf(item.children, id);
                }
            }
        };
        _findLeaf(data, id);
        return ids;
    },
    setTrueTreeExpand: function(treeData, id) {
        // 标准树结构
        var ids = this.getTrueTreeAllParentId(treeData, id).reverse();

        var _findLeaf = function(data) {
            for (var i = 0, len = data.length; i < len; i++) {
                var item = data[i];
                if (ids.indexOf(item.id) > -1) {
                    vueIns.$set(item, "expand", true);
                    if (item.children) _findLeaf(item.children);
                    break;
                }
            }
        };

        _findLeaf(treeData);
    },
    setTrueTreeSelected: function setTrueTreeSelected(treeData, id) {
        var item,
            len = treeData.length;
        for (var i = 0; i < len; i++) {
            item = treeData[i];
            vueIns.$set(item, "selected", false);
            if (item.id == id) {
                vueIns.$set(item, "selected", true);
                break;
            } else {
                if (item.children) {
                    setTrueTreeSelected(item.children, id);
                }
            }
        }
    },
    getRootIds(datas) {
        var ids = [];
        datas.forEach((item) => {
            if (!item.parentId) ids.push(item.id);
        });
        return ids;
    },
    setTreeLeftHeight(extraHeight = 0, id = "#J_TREE_LEFT") {
        var h = document.querySelector(".lay").offsetHeight || document.documentElement.clientHeight - 90;
        document.querySelector(id).style.height = h - 10 - extraHeight + "px";
        document.querySelector(id).style.overflowY = "auto";
        return h;
    },
    setNodeLev(treeData) {
        var _setLev = function(_data, groupLev) {
            _data.forEach(function(item) {
                item.lev = groupLev;
                if (item.children && item.children.length) {
                    _setLev(item.children, item.lev + 1);
                }
            });
        };
        _setLev(treeData, 0);
    },
};

export default treeUtils;
