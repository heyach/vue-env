<template>
    <div
        :class="{ d1: true, selected: selected }"
        :style="styles"
        ref="container"
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @mouseup="mouseUp"
        @drop="drop" @dragover="dragOver"
    >
        1111111
    </div>
</template>
<script>
// 作为容器也要接受drop事件，但是父容器上也会触发drop，
export default {
    props: {
        styles: {
            type: Object,
        },
        pNodePosition: {
            type: Object,
        },
    },
    data() {
        return {
            selected: false,
            drag: false,
        };
    },
    methods: {
        dragOver(e) {
            e.preventDefault();
        },
        drop(e) {
            e.preventDefault();
            var data = e.dataTransfer.getData("ID");
            var a = document.createElement("div")
            a.innerHTML = "data" + data
            this.$refs.container.appendChild(a)
            this.$emit("stopCreate")
        },
        createComponent(name, e) {
            var a = document.createElement("div")
            a.innerHTML = "data" + name
            this.$refs.container.appendChild(a)
        },
        mouseDown(e) {
            e.preventDefault();
            this.drag = true;
            this.selected = true;
        },
        mouseMove(e) {
            if (this.drag) {
                let l = parseFloat(e.clientX);
                let t = parseFloat(e.clientY);
                this.styles.left = l - this.pNodePosition.left - 50 + "px";
                this.styles.top = t - this.pNodePosition.top - 50 + "px";
            }
        },
        mouseUp(e) {
            this.drag = false;
            this.selected = false;
        },
    },
};
</script>
<style lang="less">
.d1 {
    position: absolute;
    width: 100px;
    height: 100px;
    top: 0;
    left: 0;
    background: yellow;
}
.selected {
    border: 1px red dashed;
}
</style>
