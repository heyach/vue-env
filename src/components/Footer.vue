<template>
    <div class="footer">
        <div class="copyrights" :style="styleType == 'hhh' ? 'color: red' : 'color: #333'">{{ copyrights }}</div>
    </div>
</template>
<script>
export default {
    name: "Footer",
    props: ["styleType"],
    data() {
        return {
            copyrights: "大句要令群丑慑，好逼不厌百回装。",
        };
    },
};
</script>
<style lang="less" scoped>
.footer {
    position: absolute;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #f7f7f7;
    z-index: 100;
    bottom: 0;

    .copyrights {
        text-align: center;
        color: #333;
        font-size: 14px;
    }
}
</style>
