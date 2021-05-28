<template>
    <div
        :class="{ d1: true, selected: selected }"
        :style="styles"
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @mouseup="mouseUp"
    >
        1111111
    </div>
</template>
<script>
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
