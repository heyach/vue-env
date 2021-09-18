<template>
    <div class="bubble-sort">
        <div class="block-item">
            <div class="intro">
                <p>冒泡排序</p>
                <p>一般按照从小到大，反之按照数组反转即可</p>
                <p imp>将a[i]与后面的每一项比较，按照排序规则交换位置</p>
                <p imp>重复上一步操作直到排序完成</p>
                <p imp>缺点，只进行了相邻的交换，一轮遍历中没有把最小的数冒泡到a[0]位置</p>
                <p>待排序数组{{ bubbleData }}</p>
                <p>排序后{{ newBubbleData }}</p>
                <img src="@/assets/algorithm/bubble-sort1.jpg" />
            </div>
            <div class="com-item">
                <el-button type="primary" @click="bubbleSort">bubble sort</el-button>
            </div>
        </div>
        <div class="block-item">
            <div class="intro">
                <p>冒泡排序2</p>
                <p imp>优化，从终点开始往起点相邻比较，交换，保证a[i]始终在这一轮遍历里为最小值</p>
                <p>待排序数组{{ bubbleData2 }}</p>
                <p>排序后{{ newBubbleData2 }}</p>
                <img src="@/assets/algorithm/bubble-sort2.jpg" />
            </div>
            <div class="com-item">
                <el-button type="primary" @click="bubbleSort2">bubble sort</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { Button } from "element-ui";
import Algorithm from "../Algorithm";
export default {
    components: {
        "el-button": Button,
    },
    data() {
        return {
            bubbleData: [],
            newBubbleData: "",
            bubbleData2: [],
            newBubbleData2: "",
        };
    },
    created() {
        for (let i = 1; i <= 15; i++) {
            this.bubbleData.push(i * i);
            this.bubbleData2.push(i * i);
            this.disorder(this.bubbleData);
            this.disorder(this.bubbleData2);
        }
        this.bubbleData.push(36);
        this.bubbleData2.push(36);
    },
    methods: {
        bubbleSort() {
            this.newBubbleData = Algorithm.BubbleSort(this.bubbleData);
        },
        bubbleSort2() {
            this.newBubbleData2 = Algorithm.BubbleSort2(this.bubbleData2);
        },
        disorder(arr) {
            return Algorithm.Shuffle(arr);
        },
    },
};
</script>
<style lang="less" scoped>
.bubble-sort {
    box-sizing: border-box;
    padding: 20px;
    background: #fff;
}
</style>
