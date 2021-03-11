<template>
  <div class="shuffle">
    <div class="block-item">
      <div class="intro">
        <p>洗牌算法</p>
        <p>由如何快速随机打乱一副扑克牌A1-A54而来</p>
        <p imp>通常算法</p>
        <p>随机一个1-54的下标，将该牌放到一个新数组里</p>
        <p>重复上一步54次得到一个新数组</p>
        <p>问题在于上述随机过程不能保证随机的值不重复，即第n次随机的值与之前的值重复</p>
        <p imp>进阶优化</p>
        <p>将每次随机到的值从数组里去除，保证后续的随机过程不会取重复的值</p>
        <p>即原数组的值越来越少，新数组的值越来越多</p>
        <p>最终原数组被清空，新数组为全随机后的数组</p>
        <p>这个问题在于需要对两个数组进行处理</p>
        <p imp>继续进阶</p>
        <p>将随机到的值交换到数组的尾部，控制随机的范围</p>
        <p>即第一次随机的值（A15）交换到A54的位置，然后从1-53范围取随机数</p>
        <p>这样既能保证不会取到重复的值（随机的下标还是可能重复，但是值已经不一样了）</p>
        <p>检验方式可以看数组有无重复值，求和是否一样</p>
        <p>而且每次随机的概率都是1/n</p>
        <p>时间复杂度为O(n)，空间复杂度为O(1)</p>
        <p>待洗牌数组{{ shuffleData }}</p>
        <p imp>洗牌后{{ newShuffleData }}</p>
      </div>
      <div class="com-item">
        <el-button type="primary" @click="shuffle">shuffle</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { Button } from "element-ui";
import Algorithm from "@/utils/Algorithm";
export default {
  components: {
    "el-button": Button
  },
  data() {
    return {
      shuffleData: [],
      newShuffleData: ""
    };
  },
  created() {
    for (let i = 1; i <= 15; i++) {
      this.shuffleData.push(i);
    }
  },
  methods: {
    shuffle() {
      this.newShuffleData = Algorithm.Shuffle(this.shuffleData);
    }
  }
};
</script>
<style lang="less" scoped>
.shuffle {
  box-sizing: border-box;
  padding: 20px;
  background: #fff;
}
</style>
