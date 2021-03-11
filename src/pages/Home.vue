<template>
  <div class="home">
    <h-header></h-header>
    <div class="content">
      <div class="side-menu">
        <el-menu
          default-active="2"
          background-color="#add8e6"
          text-color="#0000ff"
          class="el-menu-vertical-demo"
          :router="true"
        >
          <el-submenu v-for="(item, index) in menuList" :key="index" :index="item.index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="(item1, index1) in item.children"
                :key="index1"
                :index="item1.index"
                :route="item1.route"
              >{{ item1.name }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="container">
        <router-view/>一个没啥用的首页
        <div class="fa" @click.self="fa">
          <div class="son" @click="son"></div>
        </div>
        <div id="wang-editer"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { Button, Menu, Submenu, MenuItemGroup, MenuItem } from "element-ui";
import Header from "../components/Header"
import E from "wangeditor";
export default {
  name: "Home",
  components: {
    "el-button": Button,
    "el-menu": Menu,
    "el-sub-menu": Submenu,
    "el-menu-item-group": MenuItemGroup,
    "el-menu-item": MenuItem,
    "h-header": Header
  },
  data() {
    return {
      msg: "1234567890",
      menuList: []
    };
  },
  computed: {
    ...mapState({
      totalCount: state => state.Home.totalCount,
    }),
    ...mapGetters("Home", ["getTenCount"])
  },
  created() {},
  mounted() {
    let that = this;
    that.getMenus().then(res => {
      that.menuList = res.data;
    });
    that.editor = new E("#wang-editer");
    // 图片上传后台接口
    that.editor.config.uploadImgServer =
      "http://127.0.0.1:5000/upload/uploadImage";
    that.editor.config.uploadFileName = "file";
    // 重载alert消息提示
    that.editor.config.customAlert = (s, t) => {
      console.log(s, t);
    };
    // 精简菜单栏
    that.editor.config.menus = [
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "code", // 插入代码
      "undo", // 撤销
    ];
    that.editor.create();
  },
  methods: {
    ...mapActions("Home", ["addCount"]),
    ...mapActions("Auth", ["getMenus"]),
    axios2() {
      this.$store
        .dispatch("Home/getIndexInfo", {
          name: "aaa"
        })
        .then(res => {
          console.log(2, res, this.getCounter);
        })
        .then(res => {
          console.log(3, res);
        });
    },
    fa() {
      console.log(1);
    },
    son() {
      console.log(this.editor.txt.html());
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  position: absolute;
  width: 100%;
  height: 100%;

  .fa {
    position: relative;
    width: 200px;
    height: 200px;
    background: red;
    .son {
      position: relative;
      width: 100px;
      height: 100px;
      background: black;
    }
  }
  .content {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    top: 0;
    display: flex;
    flex-direction: row;

    .side-menu {
      flex-basis: 200px;
      background: lightblue;
      max-width: 200px;
    }
    .container {
      flex-grow: 1;
    }
  }
}
.login-wrap {
  background: #ccc;
  color: red;

  img {
    width: 120px;
  }
}
</style>