<template>
    <div class="keyframes-box-container">
        <div class="block-item">
            <div class="intro">
                <p>1，直接使用css动画，style不能用scoped，否则keyframes对应不上</p>
                <p>2，通过将元素copy一份，然后translate(-50%)的方式形成无限滚动动画</p>
            </div>
            <div class="com-item">
                <div class="act-container">
                    <div class="act-cnt act">
                        <div class="cnt-item">111111111111</div>
                        <div class="cnt-item">222222222222</div>
                        <div class="cnt-item">333333333333</div>
                        <div class="cnt-item">444444444444</div>
                        <div class="cnt-item">555555555555</div>
                        <div class="cnt-item">111111111111</div>
                        <div class="cnt-item">222222222222</div>
                        <div class="cnt-item">333333333333</div>
                        <div class="cnt-item">444444444444</div>
                        <div class="cnt-item">555555555555</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="block-item">
            <div class="intro">
                <el-button type="primary" @click="showAction">单击我查看vue过渡效果</el-button>
                <p>过渡效果只能用单元素</p>
                <p>action-enter transform: translateX(-40px); opacity: 0; 表示元素应用动画的那一刻的状态</p>
                <p>action-leave transform: translateX(40px); opacity: 0; 表示元素应用动画最终的状态</p>
                <p>过渡效果必须由dom状态改变触发，如果想无限动画，最好还是用css动画</p>
            </div>
            <div class="com-item">
                <transition name="action">
                    <div class="whatever" v-if="action">我要动起来</div>
                </transition>
            </div>
        </div>
    </div>
</template>
<script>
import { Button } from "element-ui";
export default {
    components: {
        "el-button": Button,
    },
    data() {
        return {
            action: true,
        };
    },
    methods: {
        showAction() {
            this.action = !this.action;
        },
    },
};
</script>
<style lang="less">
@keyframes act {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translateY(-50%);
    }
}
.action-enter-active {
    transition: all 1s ease;
}
.action-leave-active {
    transition: all 1s ease;
}
.action-enter {
    transform: translateX(-40px);
    opacity: 0;
}
.action-leave-to {
    transform: translateX(40px);
    opacity: 0;
}
.keyframes-box-container {
    box-sizing: border-box;
    padding: 20px;
    background: #fff;
    .act {
        animation: act 3s infinite linear;
    }

    .act-container {
        position: relative;
        width: 200px;
        height: 150px;
        border: 1px solid red;
        overflow: hidden;

        .act-cnt {
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;

            .cnt-item {
                position: relative;
                width: 100%;
                height: 30px;
                line-height: 30px;
                text-align: center;
            }
        }
    }
}
</style>
