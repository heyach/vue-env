<template>
  <div class="number-box-container">
    <div class="block-item">
      <div class="intro">
        <p @click="changePropValue">数字控件</p>
        <p>可以进行一些自定义的处理，步进，上下限</p>
        <p>可以进行一些自定义的过滤，非法数据处理</p>
        <p>可以传入默认值，在data里接受参数赋值给value，不改变传入的prop参数</p>
        <p imp>单独使用时，直接绑定v-model即可</p>
      </div>
      <div class="com-item">
        <number-box
          bgcolor="background: #f7f7f7;"
          placeholderText="input"
          :stepLength="1"
          :minValue="1"
          :maxValue="d.maxValue"
          :defaultValue="8"
        ></number-box>
      </div>
    </div>
    <div class="block-item">
      <div class="intro">
        <p imp>遍历使用时，需要额外处理getNumber，根据遍历的index和value处理model</p>
      </div>
      <div class="com-item">
        <div v-for="(item, index) in dataList" :key="index">
          <number-box
            bgcolor="background: #f7f7f7;"
            placeholderText="input"
            :stepLength="item.stepLength"
            :minValue="item.minValue"
            :maxValue="item.maxValue"
            :defaultValue="item.defaultValue"
            :value="item.value"
            @getNumber="getNumber(index, $event)"
          ></number-box>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import NumberBox from "@/components/NumberBox";
export default {
  components: {
    "number-box": NumberBox,
  },
  data() {
    return {
      mmm: "hhh",
      dataList: [{
        stepLength: 2,
        minValue: 2,
        maxValue: 20,
        defaultValue: 2,
        value: 2
      },{
        stepLength: 4,
        minValue: 4,
        maxValue: 40,
        defaultValue: 4,
        value: 4
      }],
      d: {
        maxValue: 10
      }
    };
  },
  methods: {
    changePropValue() {
      this.d.maxValue = 20;
    },
    getNumber(index, v){
      let that = this;
      let tmp = JSON.parse(JSON.stringify(that.dataList[index]));
      tmp.value = v;
      that.$set(that.dataList, index, tmp);
    },
  }
};
</script>
<style lang="less" scoped>
.number-box-container {
  box-sizing: border-box;
  padding: 20px;
  background: #fff;
}
</style>
