<template>
  <div class="header">
    <div class="header-con">
      <img src="@/assets/common/logo.png" class="logo">
      <div class="menu-con">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <template v-for="(item) in menuList">
            <el-menu-item
              v-if="item.children.length == 0"
              :index="item.index"
              :key="item.index"
              :disabled="item.disabled"
            >{{item.name}}</el-menu-item>
            <el-submenu v-if="item.children.length > 0" :index="item.index" :key="item.index">
              <template slot="title">{{item.name}}</template>
              <el-menu-item
                v-for="(item2, index2) in item.children"
                :key="index2"
                :index="item2.index"
                :disabled="item.disabled"
              >{{item2.name}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </div>
      <div class="userinfo">
        <img
          class="avatar"
          @click="showUserMenus = !showUserMenus"
          :src="userInfo.avatar ? userInfo.avatar : 'https://user-gold-cdn.xitu.io/2019/7/4/16bbc699faf90ff6?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1'"
        >
        <div class="user-menus" v-if="showUserMenus">
          <div
            class="menu-item"
            @click="toFunc(item)"
            v-for="(item, index) in userMenus"
            :key="index"
          >{{item.name}}</div>
        </div>
      </div>
    </div>
    <img src="@/assets/common/colorful-line.png" class="b-line">
  </div>
</template>

<script>
import { Menu, Submenu, MenuItemGroup, MenuItem } from "element-ui";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  components: {
    "el-menu": Menu,
    "el-sub-menu": Submenu,
    "el-menu-item-group": MenuItemGroup,
    "el-menu-item": MenuItem
  },
  data() {
    return {
      menuList: [],
      activeIndex: "0",
      showUserMenus: false,
      userMenus: []
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.Auth.userInfo ? state.Auth.userInfo : {
        name: "",
        avatar: "",
      }
    })
  },
  mounted() {
    let that = this;
    that.getMenus().then(res => {
      that.menuList = res.data;
    });
    that.userMenus = [{
      name: "写文章",
      route: "/article/release"
    },{
      name: "我的文章",
      route: "/user/myarticle"
    },{
      name: "我的信息",
      route: "/user/userinfo"
    }]
  },
  methods: {
    ...mapActions("Auth", ["getMenus"]),
    toFunc(f) {
      let that = this;
      that.showUserMenus = false;
      if (f.route == that.$route.path) {
        return;
      }
      that.$router.push({
        path: f.route
      });
    },
    handleSelect(e, f) {
      let that = this;
      let [index, index2] = f;
      let route = "/";
      if (!index2) {
        route = that.menuList[index].route;
      } else {
        let clist = that.menuList[index].children;
        clist.forEach(item => {
          if (item.index == index2) {
            route = item.route;
          }
        });
      }
      if (route == that.$route.path) {
        return;
      }
      that.$router.push({
        path: route
      });
    }
  }
};
</script>

<style lang="less" scoped>
.el-menu.el-menu--horizontal {
  border-bottom: 0;
}
.header {
  position: fixed;
  z-index: 9999;
  top: 0;
  width: 100%;
  height: 80px;
  background: #fff;
  .header-con {
    position: relative;
    width: 1200px;
    height: 80px;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding-left: 70px;
    .logo {
      position: absolute;
      width: 106px;
      height: 60px;
      top: 10px;
      left: 0;
    }
    .userinfo {
      position: absolute;
      right: 0;
      display: flex;
      align-items: center;

      border: 2px #ddd solid;
      border-radius: 50%;

      cursor: pointer;
      .avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .username {
        font-size: 14px;
        margin-left: 10px;
      }
      .user-menus {
        position: absolute;
        width: 80px;
        background: #fff;
        border: 1px solid rgba(177, 180, 185, 0.45);
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
        padding: 10px;
        top: 50px;
        z-index: 10;
        border-radius: 4px;
        .menu-item {
          height: 20px;
          line-height: 20px;
          text-align: center;
          padding: 5px 0;
          border-bottom: 1px #e5e5e5 solid;
          font-size: 12px;
          color: #666;
        }
      }
    }
  }
  .b-line {
    position: absolute;
    bottom: 0;
  }
}
</style>
