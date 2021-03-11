<template>
  <div class="article-list">
    <empty v-if="articleList.length == 0"></empty>
    <div class="article-con" v-if="articleList.length > 0">
      <div
        class="article-item"
        v-for="(item, index) in articleList"
        :key="index"
        @click="toDetail(item.id)"
      >
        <div class="top-info">
          <img :src="item.main_pic" class="article-main-pic">
          <div class="tags">
            <div class="tag" v-for="(item2, index2) in transTags(item.tags)" :key="index2">{{item2}}</div>
          </div>
        </div>
        <div class="info">
          <div class="title">{{item.title}}</div>
          <div class="short-intro">{{item.short_intro}}</div>
          <div class="ctime">{{item.createdAt}}</div>
        </div>
      </div>
    </div>
    <pagination
      v-if="articleList.length > 0"
      @toNextPage="toNextPage"
      @toPrevPage="toPrevPage"
      @toTargetPage="toTargetPage"
      :currentPage="currentPage"
      :totalCount="count"
      :pageSize="limit"
    ></pagination>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";
import Empty from "@/components/Empty";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  name: "Article",
  components: {
    pagination: Pagination,
    empty: Empty
  },
  data() {
    return {
      articleList: [],
      count: 0,
      currentPage: 1,
      limit: 8
    };
  },
  computed: {
    offset() {
      return (this.currentPage - 1) * this.limit;
    }
  },
  created() {
    this.getArticles();
  },
  methods: {
    ...mapActions("Article", ["getArticleList"]),
    transTags(t) {
      return t.split(";");
    },
    toDetail(id) {
      this.$router.push({
        path: `/article/${id}`
      });
    },
    getArticles(author) {
      let that = this;
      that
        .getArticleList({
          params: {
            offset: that.offset,
            limit: that.limit
          }
        })
        .then(res => {
          that.articleList = res.data;
          that.count = res.count;
        });
    },
    toPrevPage() {
      let that = this;
      that.currentPage--;
      that.getArticles();
    },
    toNextPage() {
      let that = this;
      that.currentPage++;
      that.getArticles();
    },
    toTargetPage(i) {
      let that = this;
      that.currentPage = i;
      that.getArticles();
    }
  }
};
</script>
<style lang="less" scoped>
.article-list {
  .article-con {
    width: 1200px;
    margin: 0 auto;
    padding: 20px 0 40px 0;
    &::after {
      content: " ";
      display: block;
      font-size: 0;
      height: 0;
      clear: both;
      visibility: hidden;
    }

    .article-item {
      width: 270px;
      height: 270px;
      float: left;
      margin: 0 15px 20px 15px;
      background: #fff;
      box-shadow: 0 4px 8px 0 rgba(95, 101, 105, 0.05);
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;

      &:hover .article-main-pic {
        transform: scale(1.1);
      }
      .top-info {
        position: relative;
        width: 270px;
        height: 150px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;

        .article-main-pic {
          position: absolute;
          width: 100%;
          height: 100%;
          transition: transform 0.5s;
        }

        .tags {
          position: absolute;
          bottom: 0;
          right: 0;
          padding: 10px;
          display: flex;
          .tag {
            padding: 0 10px;
            height: 20px;
            line-height: 20px;
            color: #fff;
            border-radius: 10px;
            background: #21a0fe;
            border: 2px #fff solid;
            font-size: 12px;
            margin: 0 5px;
          }
        }
      }

      .info {
        height: 120px;
        box-sizing: border-box;
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .title {
          height: 40px;
          line-height: 20px;
          color: #666;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .short-intro {
          height: 32px;
          line-height: 16px;
          font-size: 14px;
          color: #999;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

        .ctime {
          font-size: 10px;
          color: #999;
        }
      }
    }
  }
}
</style>
