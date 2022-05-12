<template>
    <div>
        <mavonEditor :toolbars="toolbars" v-model="content" @change="change" ref="mark" />
        <p @click="getContent">获取编辑器内容</p>
        <div class="markdown-body" v-html="renderContent"></div>
    </div>
</template>
<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
export default {
    components: {
        mavonEditor,
    },
    data() {
        return {
            toolbars: {
                bold: true,
                italic: true,
                header: true,
                underline: true,

                strikethrough: true,
                mark: true,
                superscript: true,

                subscript: true,

                quote: true,

                ol: true,
                ul: true,

                link: true,
                code: true,

                table: true,

                fullscreen: true,

                undo: true,
                redo: true,

                trash: true,

                preview: true,
            },
            content: "",
            renderContent: ""
        };
    },
    methods: {
        change() {},
        getContent() {
            console.log(this.content)
            console.log(this.$refs.mark.d_value)
            console.log(this.$refs.mark.d_render)
            this.renderContent = this.$refs.mark.d_render
        }
    },
};
</script>
<style lang="less" scoped></style>
