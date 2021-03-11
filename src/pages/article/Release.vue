<template>
  <div class="release-article">
    <div class="release-con">
      <div class="form-item">
        <div class="label">文章标题</div>
        <div class="content">
          <input type="text" v-model="title" placeholder="请输入文章标题，30字以内">
        </div>
      </div>
      <div class="form-item">
        <div class="label">文章分类</div>
        <div class="content">
          <el-select v-model="articleClassify">
            <el-option
              v-for="(item, index) in articleClassifyList"
              :key="index"
              :value="item.id"
              :label="item.name"
            ></el-option>
          </el-select>
          <span>先用element-ui的select</span>
        </div>
      </div>
      <div class="form-item">
        <div class="label">文章标签</div>
        <div class="content">
          <div class="article-tags" v-if="tags.length > 0">
            <div class="tag-item" v-for="(item, index) in tags" :key="index">
              <img src="@/assets/common/icon-close.png" @click="delTag(index)">
              {{item}}
            </div>
          </div>
          <input
            type="text"
            v-if="tags.length < 3"
            v-model="iptTag"
            @keyup="inputTags"
            placeholder="请输入文章标签，以分号分隔"
          >
        </div>
      </div>
      <div class="form-item">
        <div class="label">文章简介</div>
        <div class="content">
          <input type="text" v-model="short_intro" placeholder="请输入文章简介，30字以内">
        </div>
      </div>
      <div class="form-item">
        <div class="label">文章封面</div>
        <div class="content">
          <uploader @uploadSuccess="uploadSuccess" :imageList="imageList" :uploadUrl="uploadUrl"></uploader>
          <span>请上传文章封面图，后续处理成带裁剪的上传组件</span>
        </div>
      </div>
      <div class="form-item article-content">
        <div class="label">文章内容</div>
        <div class="content">
          <div id="wang-editer"></div>
        </div>
      </div>
      <div class="btn-release" @click="releaseArticles">{{articleId ? '确认编辑' : '确认发布'}}</div>
    </div>
  </div>
</template>

<script>
import E from "wangeditor";
import Uploader from "@/components/uploader/Uploader";
import { mapActions, mapState, mapGetters } from "vuex";
import { Select } from "element-ui";
export default {
  components: {
    uploader: Uploader,
    "el-select": Select
  },
  data() {
    return {
      title: "",
      short_intro: "",
      classify: "",
      tags: [],
      imageList: [],
      iptTag: "",
      uploadUrl: "/upload/uploadImage",
      articleClassify: "",
      articleClassifyList: [],
      articleId: ""
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.Auth.userInfo
    })
  },
  mounted() {
    let that = this;
    that.articleId = that.$route.query.id;
    that.editor = new E("#wang-editer");
    that.editor.config.uploadImgServer = that.uploadUrl;
    that.editor.config.uploadFileName = "file";
    that.editor.config.customAlert = (s, t) => {
      console.log(s, t);
    };
    that.editor.create();
    that.getArticleClassifies();
    if (that.articleId) {
      that
        .getArticleDetail({
          id: that.articleId
        })
        .then(res => {
          that.title = res.data.title;
          that.short_intro = res.data.short_intro;
          that.tags = res.data.tags.split(";");
          that.articleClassify = res.data.classify;
          that.imageList = [res.data.main_pic];
          that.editor.txt.html(res.data.content);
        });
    }
  },
  methods: {
    ...mapActions("Article", [
      "getArticleClassifyList",
      "releaseArticle",
      "getArticleDetail",
      "updateArticle"
    ]),
    uploadSuccess(e) {
      let that = this;
      that.imageList = e;
    },
    inputTags(e) {
      let that = this;
      let key = e.keyCode;
      if (
        key == 188 ||
        key == 186 ||
        key == 13 ||
        key == 191 ||
        (window.navigator.userAgent.indexOf("Firefox") > 0 && key == 59)
      ) {
        let c = that.iptTag;
        c = c.substr(0, c.length - 1);
        if (c == "" || c == undefined) {
          that.iptTag = "";
          return;
        }
        that.iptTag = "";
        that.tags.push(c);
      }
    },
    delTag(i) {
      let that = this;
      that.tags.splice(i, 1);
    },
    getArticleClassifies() {
      let that = this;
      that.getArticleClassifyList().then(res => {
        that.articleClassifyList = res.data;
      });
    },
    releaseArticles() {
      let that = this;
      // 不写校验了
      let data = {
        title: that.title,
        author_id: that.userInfo.uid,
        content: that.editor.txt.html(),
        tags: that.tags.join(";"),
        main_pic: that.imageList[0],
        classify: that.articleClassify,
        short_intro: that.short_intro
      };
      if (that.articleId) {
        data.id = that.articleId;
        that.updateArticle(data).then(res => {
          if (res.code == 0) {
            that.$router.push(
              { path: "/article" },
              onComplete => {},
              onAbort => {}
            );
          }
        });
      } else {
        that.releaseArticle(data).then(res => {
          if (res.code == 0) {
            that.$router.push(
              { path: "/article" },
              onComplete => {},
              onAbort => {}
            );
          }
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.release-article {
  .release-con {
    position: relative;
    width: 640px;
    margin: 0 auto;
    background: #fff;
    padding: 20px;

    .form-item {
      position: relative;
      min-height: 40px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;

      .label {
        flex-basis: 70px;
        font-size: 14px;
        height: 40px;
        line-height: 40px;
      }
      .content {
        flex-grow: 1;
        min-height: 40px;
        display: flex;
        align-items: center;

        .article-tags {
          display: flex;
          padding-right: 10px;

          .tag-item {
            position: relative;
            padding: 0 10px;
            border-radius: 4px;
            border: 1px #21a0fe solid;
            height: 25px;
            line-height: 25px;
            color: #21a0fe;
            font-size: 12px;
            margin: 0 5px;

            img {
              position: absolute;
              width: 12px;
              height: 12px;
              top: -6px;
              right: -6px;
              z-index: 10;
              cursor: pointer;
            }
          }
        }

        span {
          font-size: 12px;
          color: #999;
          margin-left: 10px;
        }
        input {
          height: 40px;
          width: 100%;
          padding-left: 10px;
          box-sizing: border-box;
          font-size: 14px;
        }
      }
    }
    .form-item.article-content {
      flex-direction: column;
      align-items: flex-start;
      .label {
        flex-basis: 40px;
        line-height: 40px;
      }
    }
    .btn-release {
      position: relative;
      width: 100px;
      height: 35px;
      line-height: 35px;
      margin: 0 auto;
      border-radius: 4px;
      border: 1px #21a0fe solid;
      color: #21a0fe;
      font-size: 14px;
      text-align: center;
      cursor: pointer;
    }
  }
}
</style>
