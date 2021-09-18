<template>
    <div class="quick-sort">
        <div class="block-item">
            <div class="intro">
                <p imp>快速排序的核心就是取基数，遍历数组与基数比较后交换，递归处理至结束</p>
                <p imp>优化的地方在于控制遍历的范围，减少遍历次数</p>
                <p imp>交换值不需要额外的存储空间，减少空间复杂度</p>
                <p>快速排序1-阮一峰</p>
                <p>取数组中间值为基准数</p>
                <p imp>并且将基准值从数组中去除，如不去除，重复值会导致递归溢出</p>
                <p>遍历数组，与基准值比较，小的放left，大于等于放right</p>
                <p>递归处理left和right数组</p>
                <p>将处理后的数组和基准值合并返回</p>
                <p imp>缺点，需要准备left和right数组，增加空间复杂度</p>
                <p imp>缺点，需要对基准值进行splice操作</p>
                <p>待排序数组{{ quickData }}</p>
                <p>排序后{{ newQuickData }}</p>
                <img src="@/assets/algorithm/quick-sort1.jpg" />
            </div>
            <div class="com-item">
                <el-button type="primary" @click="quickSort">quick sort</el-button>
            </div>
        </div>
        <div class="block-item">
            <div class="intro">
                <p>快速排序2</p>
                <p>每次取待排序范围[left,right]的第一个数为基数base</p>
                <p>从右往左找到第一个比基数小的数，j变成该值下标</p>
                <p>从左往右直到j的范围内找到第一个比基数大的值，i变成该值下标</p>
                <p imp>上述2步遍历，如果找不到会一直遍历到范围尽头为止</p>
                <p imp>由于a[j]小于base小于a[i]</p>
                <p imp>交换a[j]和a[i]</p>
                <p>由于ij的遍历规则，结束遍历时i=j</p>
                <p>由于i的遍历规则，a[i]必定大于等于base</p>
                <p>交换base和a[i]</p>
                <p>对[left, i-1]和[i+1,right]递归排序</p>
                <p>待排序数组{{ quickData2 }}</p>
                <p>排序后{{ newQuickData2 }}</p>
                <img src="@/assets/algorithm/quick-sort2.jpg" />
            </div>
            <div class="com-item">
                <el-button type="primary" @click="quickSort2">quick sort2</el-button>
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
            quickData: [],
            newQuickData: "",
            quickData2: [],
            newQuickData2: "",
        };
    },
    created() {
        for (let i = 1; i <= 15; i++) {
            this.quickData.push(i * i);
            this.quickData2.push(i * i);
        }
        this.quickData = this.disorder(this.quickData);
        this.quickData2 = this.disorder(this.quickData2);
        this.quickData.push(25);
        this.quickData2.push(25);
    },
    methods: {
        quickSort() {
            this.newQuickData = Algorithm.QuickSort(this.quickData);
        },
        quickSort2() {
            this.newQuickData2 = Algorithm.QuickSort2(this.quickData2);
        },
        disorder(arr) {
            return Algorithm.Shuffle(arr);
        },
    },
};
</script>
<style lang="less" scoped>
.quick-sort {
    box-sizing: border-box;
    padding: 20px;
    background: #fff;
}
</style>
