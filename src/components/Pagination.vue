<template>
  <div class="pagination">
    <div class="page-item" v-if="currentPage > 1" @click="toPrevPage">
      <img src="@/assets/common/icon-left.png">
    </div>
    <div
      :class="['page-item', {'cur': currentPage == item}]"
      v-for="(item, index) in pageList"
      :key="index"
      @click="toTargetPage(item)"
    >{{item}}</div>
    <div class="page-item" v-if="currentPage < totalCount / pageSize" @click="toNextPage">
      <img src="@/assets/common/icon-right.png">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentPage: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    totalCount: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      pageList: []
    };
  },
  mounted() {
    // 静态的props可以在这里接受，异步的props这里接受的是初始化的值，要用watch处理改变后的值
  },
  watch: {
    totalCount: {
      handler(val) {
        let that = this;
        that.pageList = [];
        // 页面同时显示最多的页码数定为5
        // 总页数为totalCount/pageSize+1
        // 总是显示[currentPage,currentPage+(totalCount/pageSize)-1]，例如2-6，5-9
        // 如果不足pageSize个，则往前补齐，例如7-9，则补上5,6
        let t = Math.ceil(that.totalCount / that.pageSize); // 总页数
        let maxPage = that.currentPage + 4 > t ? t : that.currentPage + 4;
        let minPage = maxPage - 4 > 0 ? maxPage - 4 : 1;
        for (let i = minPage; i <= maxPage; i++) {
          that.pageList.push(i);
        }
      }
    }
  },
  methods: {
    toNextPage() {
      this.$emit("toNextPage");
    },
    toPrevPage() {
      this.$emit("toPrevPage");
    },
    toTargetPage(i) {
      if (this.currentPage == i) {
        return;
      }
      this.$emit("toTargetPage", i);
    }
  }
};
</script>

<style lang="less">
@btn-bg-color: #21a0fe;
.pagination {
  position: relative;
  width: 1200px;
  margin: 0 auto;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  .page-item {
    width: 35px;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    border-radius: 4px;
    text-align: center;
    background: #fff;
    color: #333;
    margin: 0 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    img{
      width: 20px;
      height: 20px;
    }
  }

  .page-item.cur {
    background: @btn-bg-color;
    color: #fff;
  }
}
</style>

