<template>
    <div class="bim-view">
        <div id="bim-scenes"></div>
    </div>
</template>

<script>
import BimFace from "../../bimsdk/BimfaceSDKLoader@latest-release.js";
export default {
    name: "bimface",
    data() {
        return {};
    },
    methods: {
        async createModel({ id, viewToken, path, type = "online", Buttons, Toolbars }) {
            var loaderConfig = new BimfaceSDKLoaderConfig();
            var app;
            var dom4Show = document.getElementById(id);
            dom4Show.innerHTML = "";
            loaderConfig.version = "3.6.131";
            loaderConfig.viewToken = viewToken;
            // 加载BIMFACE JSSDK加载器
            return await new Promise((resolve, reject) => {
                BimfaceSDKLoader.load(
                    loaderConfig,
                    (viewMetaData) => {
                        if (viewMetaData.viewType == "3DView") {
                            var viewConfig = new Glodon.Bimface.Application.WebApplication3DConfig();
                            viewConfig.Buttons = Buttons;
                            viewConfig.Toolbars = Toolbars || ["MainToolbar"];
                            viewConfig.domElement = dom4Show;
                            viewConfig.enableExplosion = true;
                            app = new Glodon.Bimface.Application.WebApplication3D(viewConfig);
                            app.addView(viewToken);
                            resolve(app);
                        }
                    },
                    (error) => {
                        reject(error);
                    }
                );
            });
        },
    },
    mounted() {
        this.createModel({
            viewToken: "2ff6aceef6ac492c9d90a81d559cbec8",
            id: "bim-scenes",
            Buttons: ["Home", "RectangleSelect", "Measure", "Section", "Map", "FullScreen"],
            Toolbars: ["MainToolbar"],
        }).then((res) => {
            if (res) {
                window.viewer3D = res.getViewer();
            }
        });
    },
};
</script>

<style lang="less">
html,
body,
.bim-view {
    position: relative;
    width: 100%;
    height: 100%;
    #bim-scenes {
        width: 100%;
        height: 100%;
    }
}
</style>
