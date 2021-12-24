const bimfaceUtil = {
    // 根据容器id和viewToken创建场景
    async createModel({ id, viewToken }) {
        var loaderConfig = new BimfaceSDKLoaderConfig();
        var dom4Show = document.getElementById(id);
        loaderConfig.viewToken = viewToken;
        // 加载BIMFACE JSSDK加载器
        return await new Promise((resolve, reject) => {
            BimfaceSDKLoader.load(
                loaderConfig,
                (viewMetaData) => {
                    var webAppConfig = new Glodon.Bimface.Application.WebApplication3DConfig();
                    webAppConfig.domElement = dom4Show;
                    window.app = new Glodon.Bimface.Application.WebApplication3D(webAppConfig);
                    window.app.addView(viewToken);
                    resolve(window.app);
                },
                (error) => {
                    console.log(error);
                    reject(error);
                }
            );
        });
    },
    // 获取所有构件
    async getModelTree(viewer3D) {
        return await new Promise((resolve, reject) => {
            viewer3D.getModelTree((res) => {
                if (res) {
                    resolve(res);
                } else {
                    reject(null);
                }
            });
        });
    },
};
export default bimfaceUtil;
