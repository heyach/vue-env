<template>
    <div :class="{ d3: true, selected: selected }" :style="styles" v-drag>
        3333333
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
    methods: {},
};
</script>
<style lang="less">
.d3 {
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
