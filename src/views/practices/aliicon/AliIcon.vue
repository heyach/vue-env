<template>
    <div class="ali-icon">
        <div class="block-item">
            <div class="intro">
                <p>引入第三方icon，这里是ali-icon</p>
                <p>在阿里icon里新建项目，在首页选择需要的icon，通过脚本批量加入购物车，从购物车加到项目，下载到本地</p>
                <p>var icons = document.querySelectorAll('.icon-gouwuche1');</p>
                <p>
                    var auto_click = function(i) { if (i 〈 icons.length) { setTimeout(function() { icons.item(i).click();
                    auto_click(i + 1); }, 600); } };
                </p>
                <p>auto_click(0);</p>
                <p>在iconfont.css文件里加入自定义名称处理[class^="hey-icon"], [class*=" hey-icon"]</p>
                <p>在main.js里引入iconfont.css文件使用</p>
                <p>通过font-size控制图标大小</p>
                <p>通过color控制图标颜色</p>
            </div>
            <div class="com-item">
                <i class="hey-iconshibai" style="font-size: 30px;"></i>
                <i class="hey-arrowrightcircle"></i>
                <i class="hey-iconpengyouquan" style="color: blue;"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    },
};
</script>
<style lang="less" scoped>
.ali-icon {
    box-sizing: border-box;
    padding: 20px;
    background: #fff;
}
</style>
