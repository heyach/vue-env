<template>
  <div class="guess-like">
    <div v-for="(item, index) in guessList" :key="index">
      <div class="guess-like-item">
        <div class="goods-img">
          <img :src="item.img"/>
        </div>
        <div class="goods-info">
          <div class="goods-title">{{ item.title }}</div>
          <div class="goods-price">
            ${{ item.price }}
            <!-- 一些特殊价格信息，折扣，会员免费等，这些内容不一定有，留给父组件分发 -->
            <slot :itemData="item"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["guessList"],
  data(){
    return {
    }
  }
}
</script>
<style lang="less" scoped>
.guess-like{
  .guess-like-item{
    position: relative;
    width: 300px;
    height: 40px;
    line-height: 40px;
    border: 1px lightcoral solid;
    border-radius: 4px;
    margin-bottom: 10px;
    display: flex;

    .goods-img{
      flex-basis: 40px;
      height: 40px;

      img{
        width: 100%;
        height: 100%;
      }
    }
    .goods-info{
      flex-grow: 1;
      display: flex;
      justify-content: space-between;

      .goods-title{
        margin-left: 10px;
      }
      .goods-price{
        margin-right: 10px;
        display: flex;
      }
    }
    
  }
}
</style>

