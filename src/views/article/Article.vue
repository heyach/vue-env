<template>
    <div class="article">
        <h-header></h-header>
        <router-view />
    </div>
</template>

<script>
import Header from "../../components/Header";
export default {
    name: "Article",
    components: {
        "h-header": Header,
    },
};
</script>

<style lang="less" scoped></style>
