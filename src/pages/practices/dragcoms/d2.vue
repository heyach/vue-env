<template>
    <div
        :class="{ d2: true, selected: selected }"
        :style="styles"
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @mouseup="mouseUp"
    >
        22222222
    </div>
</template>
<script>
export default {
    props: {
        styles: {
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
                this.styles.left = parseFloat(e.clientX) - 400 - 50 + "px";
                this.styles.top = parseFloat(e.clientY) - 50 + "px";
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
.d2 {
    position: absolute;
    width: 100px;
    height: 100px;
    top: 0;
    left: 0;
    background: blue;
}
.selected {
    border: 1px red dashed;
}
</style>
