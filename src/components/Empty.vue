<template>
    <div class="empty">
        <img src="@/assets/common/empty.jpg" class="icon-empty" />
        <span>暂无数据</span>
    </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.empty {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    flex-direction: column;
    margin-top: 200px;
    .icon-empty {
        width: 100px;
        height: auto;
    }
    span {
        font-size: 12px;
        color: #999;
        margin-top: 10px;
    }
}
</style>
