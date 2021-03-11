<template>
  <div class="clear-float">
    <div class="block-item">
      <div class="intro">
        <p>浮动元素float</p>
        <p>浮动的水平浮动指元素只能在左右移动而不是上下</p>
        <p>浮动：浮动的框可以左右移动，直至它的外边缘遇到包含框或者另一个浮动框的边缘。</p>
        <p imp>浮动框不属于文档中的普通流，当一个元素浮动之后，不会影响到块级框的布局而只会影响内联框（通常是文本）的排列，文档中的普通流就会表现得和浮动框不存在一样，当浮动框高度超出包含框的时候，也就会出现包含框不会自动伸高来闭合</p>
        <p imp>浮动元素（“高度塌陷”现象）。顾名思义，就是漂浮于普通流之上，像浮云一样，但是只能左右浮动。正是因为浮动的这种特性，导致本属于普通流中的元素浮动之后，包含框内部由于不存在其他普通流元素了，也就表现出高度为0（高度塌陷）。在实际布局中，往往这并不是我们所希望的，所以需要闭合浮动元素，使其包含框表现出正常的高度。</p>
      </div>
      <div class="com-item" style="border: 1px green solid;padding: 10px;">
        <div class="leftfloat">leftfloat</div>
        <div class="cnt">正常内容，与浮动元素一起计算宽度</div>
        <div class="rightfloat">rightfloat</div>
        <div class="rightfloat">rightfloat2</div>
      </div>
    </div>
    <div class="block-item" style="margin-top: 100px;">
      <div class="intro">
        <p>清除float的方式及其原理</p>
        <p>元素前的浮动元素和元素后的浮动元素有差别，前面的浮动元素会和元素一起计算宽度</p>
        <p>包含浮动元素的容器的高度会忽略浮动元素的高度，导致高度塌陷（绿色盒子）</p>
        <p imp>clear(left,right,both,none,inherit)属性指定元素两侧不能出现浮动元素</p>
        <p imp>通过将父容器创建为BFC清除浮动解决高度塌陷</p>
      </div>
      <div class="com-item" style="border: 1px green solid;padding: 10px;">
        <div class="leftfloat">leftfloat</div>
        <div class="rightfloat">rightfloat</div>
        <div class="cnt">正常内容，与浮动元素一起计算宽度</div>
        <div class="rightfloat">rightfloat2</div>
      </div>
      <div class="com-item" style="border: 1px green solid;padding: 10px;margin-top: 100px;">
        <p imp>在包含浮动元素的盒子里加一个元素，指定clear属性</p>
        <div class="leftfloat">leftfloat</div>
        <div class="rightfloat">rightfloat</div>
        <div class="cnt">正常内容，与浮动元素一起计算宽度</div>
        <div class="rightfloat">rightfloat2</div>
        <div class="clearfix"></div>
      </div>
      <p imp>通过给容器添加伪元素clear清除浮动</p>
      <div class="com-item clearfix2" style="border: 1px green solid;padding: 10px;margin-top: 10px;">
        <div class="leftfloat">leftfloat</div>
        <div class="rightfloat">rightfloat</div>
        <div class="cnt">正常内容，与浮动元素一起计算宽度</div>
        <div class="rightfloat">rightfloat2</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
<style lang="less" scoped>
.clear-float {
  box-sizing: border-box;
  padding: 20px;
  background: #fff;

  .cnt {
    border: 1px orange solid;
  }
  .leftfloat {
    float: left;
    width: 100px;
    height: 100px;
    border: 1px dashed red;
  }
  .rightfloat {
    float: right;
    width: 100px;
    height: 100px;
    border: 1px dashed red;
  }
  .clearfix {
    clear: both;
  }
  .clearfix2::after {
    content: "";
    display: block;
    height: 0;
    clear: both;
  }
}
</style>
