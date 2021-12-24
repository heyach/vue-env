<template>
    <div class="bim-view">
        <div class="menus">
            <div @click="getModelTree">获取所有模型</div>
            <div @click="zoomToModel">定位到综合楼</div>
            <div @click="resetHomeView">恢复主视角</div>
            <div @click="isolateModel">隔离综合楼</div>
        </div>
        <div class="bim-components"></div>
        <div id="bim-scenes"></div>
        <div class="bim-scene-properties">
            <Collapse v-model="sceneProperties">
                <Panel name="model">
                    图层
                    <div slot="content" class="model-tree">
                        <el-tree
                            ref="modelTree"
                            :default-expand-all="true"
                            node-key="id"
                            :data="modelTreeData"
                            :check-on-click-node="true"
                            :render-content="renderModelContent"
                        ></el-tree>
                    </div>
                </Panel>
            </Collapse>
        </div>
    </div>
</template>

<script>
import BimFace from "@/bimsdk/BimfaceSDKLoader@latest-release.js";
import bimfaceUtil from "./bimfaceUtil";
import util from "../../../utils/Tree";
import { Collapse, Panel } from "iview";
import { Tree } from "element-ui";
export default {
    name: "bimface",
    components: {
        Collapse,
        Panel,
        "el-tree": Tree,
    },
    data() {
        return {
            sceneProperties: "model",
            modelTreeData: [],
            viewAdded: false,
        };
    },
    methods: {
        renderModelContent(h, { root, node, data }) {
            return h(
                "div",
                {
                    class: "viewui-tree-title",
                },
                [
                    h(
                        "span",
                        {
                            attrs: { title: data.title },
                            on: {
                                click: () => {
                                    this.highLightModel(data.id, "#ff0000", 0.7)
                                    // this.isolateModel(data.id)
                                    this.zoomToModel(data.id)
                                },
                            },
                        },
                        [data.title]
                    ),
                ]
            );
        },
        // 获取构件树信息
        getModelTree() {
            bimfaceUtil.getModelTree(viewer3D).then((res) => {
                let modelList = res || [];
                modelList.forEach((item) => {
                    item.id = item.actualName;
                    item.nodeKey = item.actualName;
                    item.parentId = -1;
                });
                this.modelTreeData = util.transDataToTree(modelList);
            });
        },
        // 添加bim事件监听
        addModelEvent() {
            // 单击事件，点击模型获取模型信息，综合楼id为86
            viewer3D.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.MouseClicked, (data) => {
                console.log(data);
            });
            // 模型加载完成事件
            viewer3D.addEventListener(Glodon.Bimface.Viewer.Viewer3DEvent.ViewAdded, (data) => {
                this.viewAdded = true;
                // 在这里处理模型白边问题
                this.$nextTick(() => {
                    viewer3D.getViewer().modelManager.updateMaterialsValue("alphaTest", 0.5);
                    viewer3D.render();
                });

                // 获取所有模型信息
                this.getModelTree();

                // 关闭线框模式
                this.setBorderLineEnabled(false);
            });
        },
        // 高亮指定模型
        highLightModel(id, color, opacity) {
            // 新建color对象，指定关注构件被染色的数值
            color = new Glodon.Web.Graphics.Color(color, opacity);
            // 对关注构件进行着色
            viewer3D.overrideComponentsColorById([...id], color);
            viewer3D.render();
        },
        // 是否开启线框
        setBorderLineEnabled(f) {
            viewer3D.setBorderLineEnabled(f);
        },
        // 镜头推进到指定模型
        zoomToModel(id) {
            viewer3D.addSelectedComponentsById([...id]);
            // 定位到选中的构件
            viewer3D.zoomToSelectedComponents();
            // 清除构件选中状态
            viewer3D.clearSelectedComponents();
        },
        // 恢复到默认视角
        resetHomeView() {
            viewer3D.setView(Glodon.Bimface.Viewer.ViewOption.Home);
        },
        // 隔离构件，模式1，除选定构件外其他构件都隐藏，模式2，除选定构件外其他构件都半透明，且不可选中
        isolateModel(id) {
            var makeOthersTranslucent = Glodon.Bimface.Viewer.IsolateOption.MakeOthersTranslucent; // 其他构件半透明
            // var makeOthersTranslucent = Glodon.Bimface.Viewer.IsolateOption.HideOthers; // 其他构件隐藏
            viewer3D.isolateComponentsById([...id], makeOthersTranslucent);
            viewer3D.render();
        },
    },
    mounted() {
        bimfaceUtil
            .createModel({
                viewToken: "26fe93ef437d402d9fc791fe3ae02746",
                // viewToken: "0694a39cb5964af684211aea68da2d02",
                id: "bim-scenes",
            })
            .then((res) => {
                if (res) {
                    window.viewer3D = app.getViewer();
                    this.addModelEvent();
                }
            });
    },
};
</script>

<style lang="less">
.bim-view {
    position: absolute;
    width: calc(100% - 500px);
    height: 100%;
    padding: 0 250px;

    .menus {
        position: absolute;
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;

        div {
            margin: 0 5px;
            background: #ccc;
        }
    }

    .bim-components {
        position: absolute;
        width: 250px;
        height: 100%;
        background: #f7f7f7;
        left: 0;
        top: 0;
    }
    .bim-scene-properties {
        position: absolute;
        width: 250px;
        height: 100%;
        background: #f7f7f7;
        right: 0;
        top: 0;

        .model-tree {
            max-height: 300px;
            overflow: hidden auto;
        }
    }

    #bim-scenes {
        width: 100%;
        height: calc(100% - 50px);
        margin-top: 50px;
    }
}
</style>
