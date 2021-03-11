<template>
  <div class="login">
    <div class="bg-gradient"></div>
    <div class="login-con">
      <div class="shadow">
        <div class="shadows1"></div>
        <div class="shadows2"></div>
        <div class="shadows3"></div>
        <div class="shadows4"></div>
      </div>
      <div class="cnt">
        <input type="text" autofocus v-model="name" class="ipt-name" placeholder="用户名">
        <input type="text" v-model="pwd" ref="pwd" class="ipt-pwd" maxlength="6">
        <div class="kl" @click="pwdFocus">
          <div class="circle" v-show="pwd.length > 0"></div>
        </div>
        <div class="kl" @click="pwdFocus">
          <div class="circle" v-show="pwd.length > 1"></div>
        </div>
        <div class="kl" @click="pwdFocus">
          <div class="circle" v-show="pwd.length > 2"></div>
        </div>
        <div class="kl" @click="pwdFocus">
          <div class="circle" v-show="pwd.length > 3"></div>
        </div>
        <div class="kl" @click="pwdFocus">
          <div class="circle" v-show="pwd.length > 4"></div>
        </div>
        <div class="kl" @click="pwdFocus">
          <div class="circle" v-show="pwd.length > 5"></div>
        </div>
      </div>
      <div class="btn-login" @click="login2">登录/注册</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { Button } from "element-ui";
export default {
  components: {
    "el-button": Button
  },
  data() {
    return {
      name: "",
      pwd: ""
    };
  },
  methods: {
    ...mapActions("Auth", ["login"]),
    ...mapMutations("Auth", ["setUserInfo"]),
    pwdFocus() {
      this.$refs.pwd.focus();
    },
    login2() {
      let that = this;
      if (!that.name || !that.pwd) {
        console.log("name or password error");
        return;
      }
      that
        .login({
          params: {
            name: that.name,
            password: that.pwd
          }
        })
        .then(res => {
          if(res.code == 0){
            that.$store.commit('Auth/setUserInfo', res.data);
            // that.setUserInfo(res.data) // 通过mapMutations
            that.$router.push({
              path: "/article"
            })
          }else{
            console.log("login failed")
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;

  input::placeholder {
    color: #fff !important;
  }
  .bg-gradient {
    position: absolute !important;
    width: 100% !important;
    height: 100% !important;
    z-index: 0 !important;
    background: #21a0fe !important;
    background: -moz-linear-gradient(
      top,
      #21a0fe,
      rgba(18, 69, 232, 1)
    ) !important;
    background: -webkit-gradient(
      linear,
      0 0,
      0 bottom,
      from(#21a0fe),
      to(rgba(18, 69, 232, 1))
    ) !important;
    background: -webkit-linear-gradient(
      left,
      #21a0fe,
      rgba(18, 69, 232, 1)
    ) !important;
    background: -moz-linear-gradient(
      left,
      #21a0fe,
      rgba(18, 69, 232, 1)
    ) !important;
    background: -o-linear-gradient(
      left,
      #21a0fe,
      rgba(18, 69, 232, 1)
    ) !important;
    background: -ms-linear-gradient(
      left,
      #21a0fe,
      rgba(18, 69, 232, 1)
    ) !important;
    background: linear-gradient(left, #21a0fe, rgba(18, 69, 232, 1)) !important;
    filter: progid:DXImageTransform.Microsoft.gradient(GradientType = 1, startColorstr = #21a0fe, endColorstr = rgba(18, 69, 232, 1)) !important;
  }
  .login-con {
    position: absolute;
    width: 640px;
    height: 360px;
    z-index: 10;
    top: 50%;
    left: 50%;
    margin: -220px -320px;

    .shadow {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;

      .shadows1 {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 5px solid rgba(0, 183, 240, 0.3);
        top: 0;
        left: 0;
        transform: rotateX(10deg) rotateY(10deg) scale(1.03);
        transform-origin: 50% 50%;
        transition: transform 0.25s;
      }
      .shadows2 {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 5px solid rgba(0, 183, 240, 0.4);
        top: 0;
        left: 0;
        transform: rotateX(10deg) rotateY(20deg) scale(1.03);
        transform-origin: 50% 50%;
        transition: transform 0.5s;
      }
      .shadows3 {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 5px solid rgba(0, 183, 240, 0.5);
        top: 0;
        left: 0;
        transform: rotateX(10deg) rotateY(-10deg) scale(1.03);
        transform-origin: 50% 50%;
        transition: transform 0.75s;
      }
      .shadows4 {
        position: absolute;
        width: 100%;
        height: 100%;
        border: 5px solid rgba(0, 183, 240, 0.6);
        top: 0;
        left: 0;
        transform: rotateX(10deg) rotateY(-20deg) scale(1.03);
        transform-origin: 50% 50%;
        transition: transform 1s;
      }
    }
    .cnt {
      position: absolute;
      width: 100%;
      height: 100px;
      top: 140px;
      text-align: center;
      .kl {
        position: relative;
        width: 70px;
        height: 70px;
        border: 3px solid rgba(0, 183, 240, 0.7);
        margin-top: 15px;
        display: inline-block;
        margin-left: 5px;
        margin-right: 5px;
        .circle {
          position: absolute;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #00cca8;
          top: 50%;
          left: 50%;
          margin: -10px;
        }
      }
    }
    .ipt-pwd {
      position: absolute;
      z-index: 100;
      top: -100px;
      left: 0;
      outline: none;
      border: 0;
      background: none;
      opacity: 0;
    }
    .ipt-name {
      position: absolute;
      width: 200px;
      height: 50px;
      border: 2px solid rgba(0, 183, 240, 0.7);
      left: 50%;
      margin-left: -100px;
      top: -75px;
      text-align: center;
      color: #fff;
      font-size: 30px;
    }
    .btn-login {
      position: absolute;
      height: 35px;
      border-radius: 4px;
      color: #fff;
      text-align: center;
      line-height: 35px;
      width: 100px;
      left: 50%;
      font-size: 14px;
      margin-left: -60px;
      bottom: 30px;
      background: #00cca8;
      cursor: pointer;
    }
  }
}
</style>