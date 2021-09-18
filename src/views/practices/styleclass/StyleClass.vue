<template>
    <div class="style-class">
        <div :class="['til', { 'footer-text': true }]">{{ title }}</div>
        <div class="form-item" v-for="(item, index) in listInfo" :key="index">
            <div :class="{ 's-l': true, 'error-text': item.status == 3 }">{{ item.name }}</div>
            <div :class="['s-r', { 'error-text': item.status == 2 }]">{{ item.status }}</div>
        </div>
        <div :class="btmClass" :style="{ background: '#e5e5e5', 'font-size': '20px' }">{{ footer }}</div>
    </div>
</template>
<script>
/*
 * style和class的动态绑定通过对象的键值对赋予元素css的属性和值
 * 常用的一般就是元素上有初始的静态class和根据data字段动态加的class，通过数组拼装['title',{'error': isError}]
 * id属性大小写敏感，class和name等属性大小写不敏感，带中下划线的class用引号
 * 如果用object的方式，那么静态class也需要用true来标识引入，array方式静态class在数组里即可
 */
export default {
    data() {
        return {
            isErrorClass: "error-text",
            title: "hello",
            listInfo: [
                {
                    name: "aaa",
                    status: 1,
                },
                {
                    name: "bbb",
                    status: 2,
                },
                {
                    name: "ccc",
                    status: 3,
                },
            ],
            footer: "world",
            btmClass: {
                "footer-text": true,
                btm: true,
            },
        };
    },
};
</script>
<style lang="less" scoped>
.style-class {
    box-sizing: border-box;
    padding: 20px;
    background: #fff;
    .til,
    .btm {
        width: 160px;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .form-item {
        width: 160px;
        height: 50px;
        padding: 0 10px;
        line-height: 50px;
        margin-bottom: 10px;
        background: #999;
        color: blue;
        border-radius: 4px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .s-l {
            color: lightblue;
        }
        .s-r {
            color: lightblue;
        }
        .error-text {
            color: red;
        }
    }
    .footer-text {
        color: lightcoral;
    }
}
</style>
