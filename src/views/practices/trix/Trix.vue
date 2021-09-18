<template>
    <div class="trix-container">
        <div class="block-item">
            <div class="intro">
                <p>Trix编辑器</p>
                <p>直接npm然后引入使用，不用注册组件</p>
                <p>
                    通过ref获取内容
                    <el-button @click="getEditorContent">获取内容</el-button>
                </p>
                <p>配置上传钩子trix-attachment-add处理文件@trix-attachment-add="fileAttached"，配合后台接口</p>
                <p>通过config.lang更改菜单栏按钮提示文字</p>
                <p>通过config.attachments更改上传文件默认内容</p>
                <p>通过覆盖css根据文件类型美化ui</p>
                <p>通过覆盖css美化菜单栏</p>
                <p>通过trix-initialize添加菜单和处理钩子，添加一个红色字体</p>
                <p>
                    <el-button @click="showEditorContent">显示内容</el-button>
                </p>
            </div>
            <div class="com-item">
                <div class="trix-container">
                    <trix-editor :class="['trix-content']" ref="trix" />
                </div>
            </div>
            <div class="com-item">
                <div class="trix-content-container" v-html="content"></div>
            </div>
        </div>
    </div>
</template>
<script>
import Trix from "trix";
import "trix/dist/trix.css";
import uploadFiles from "@/components/uploader/post";
import { Button } from "element-ui";
export default {
    components: {
        "el-button": Button,
    },
    data() {
        return {
            mmm: "hhh",
            uploadUrl: "localhost: 127.0.0.1:5000/upload",
            content: "",
        };
    },
    created() {
        console.log(Trix);
        Trix.config.lang.attachFiles = "上传文件";
        Trix.config.lang.unlink = "取消";
        Trix.config.lang.urlPlaceholder = "请输入链接地址";
        Trix.config.lang.bold = "加粗";
        Trix.config.lang.link = "链接";
        Trix.config.lang.italic = "斜体";
        Trix.config.lang.strike = "删除线";
        Trix.config.lang.heading1 = "标题";
        Trix.config.lang.quote = "引用";
        Trix.config.lang.code = "代码";
        Trix.config.lang.bullets = "列表";
        Trix.config.lang.numbers = "列表";
        Trix.config.lang.indent = "里面";
        Trix.config.lang.outdent = "外面";

        Trix.config.attachments.file.caption.size = false;
        Trix.config.attachments.preview.caption.size = false;
        Trix.config.attachments.preview.caption.name = false;
    },
    mounted() {
        Trix.config.textAttributes.red = {
            tagName: "red", //一定要配置，否则返显的时候会被自动过滤掉标签
            style: {
                color: "red",
            },
            inheritable: true,
        };
        // 通过重写pickFiles调整上传过程
        // Trix.config.input.pickFiles = function(t) {
        //     var n;
        //     var e = Trix
        //     return n = e.makeElement("input", {
        //         type: "file",
        //         multiple: !0,
        //         hidden: !0,
        //         //accept: "image/*",
        //         id: this.fileInputId
        //     }),
        //     n.addEventListener("change", function() {
        //         return t(n.files),
        //         e.removeNode(n)
        //     }),
        //     e.removeNode(document.getElementById(this.fileInputId)),
        //     document.body.appendChild(n),
        //     n.click()
        // }
        this.$refs.trix.addEventListener("trix-initialize", function(event) {
            event.target.toolbarElement
                .querySelector(".trix-button-group--text-tools")
                .insertAdjacentHTML("beforeend", '<button class="btn-red" data-trix-attribute="red">A<span></span></button>');
        });

        this.$refs.trix.innerHTML = "<div>5555<red style='color: red;'>22222222sasa</red>";
    },
    methods: {
        getEditorContent() {
            console.log(this.$refs.trix.innerHTML);
        },
        showEditorContent() {
            this.content = this.$refs.trix.innerHTML;
        },
        fileAttached(event) {
            let file = event.attachment.file;
            var attachment;
            attachment = event.attachment;
            if (file) {
                uploadFiles(this.uploadUrl, file, (res) => {
                    attachment.setAttributes({
                        // href: res.fullPath, 点击跳转的链接
                        url: res.fullPath,
                    });
                });
            }
        },
    },
};
</script>
<style lang="less">
.trix-content .attachment--preview {
    width: auto !important;
}
trix-toolbar .trix-button-group {
    margin-bottom: 0;
    border-bottom: 0;
    border-radius: 0;
}
trix-toolbar .trix-button--icon {
    width: 30px;
}
trix-toolbar .btn-red {
    position: relative;
    width: 30px;
    border-bottom: 0;
    border-top: 0;
    border-right: 0;
    color: red;
    cursor: pointer;

    span {
        background: red;
        height: 3px;
        position: absolute;
        bottom: 0;
        width: 100%;
        left: 0;
        border: 0;
        padding: 0;
    }
}

.trix-container {
    box-sizing: border-box;
    padding: 20px;
    background: #fff;

    .trix-content-container {
        .attachment--file {
            border: 1px red solid;
            width: auto;
            display: inline-block;
            padding: 10px 10px 10px 40px;
            position: relative;
            border-radius: 4px;
        }
        .attachment--file:after {
            content: "";
            background: url("../../../assets/common/icon-txt.png") no-repeat top left;
            background-size: 100% 100%;
            position: absolute;
            z-index: 2;
            width: 30px;
            height: 30px;
            left: 5px;
            top: 50%;
            margin-top: -15px;
        }
    }
}
</style>
