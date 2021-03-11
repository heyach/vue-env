<template>
  <div class="userinfo">
    <div class="userinfo-con">
      <div class="basic-info">
        <div class="title">基本信息</div>
        <div class="info-item">
          <div class="label">昵称</div>
          <div class="content">
            <input type="text" v-model="userInfo.name">
          </div>
        </div>
        <div class="info-item">
          <div class="label">头像</div>
          <div class="content">
            <uploader @uploadSuccess="uploadSuccess" :imageList="imageList" :uploadUrl="uploadUrl"></uploader>
          </div>
        </div>
        <div class="info-item">
          <div class="label">登录密码</div>
          <div class="content">
            <input type="text" v-model="userInfo.password">
          </div>
        </div>
        <div class="info-item">
          <div class="label">真实姓名</div>
          <div class="content">
            <input type="text" v-model="userInfo.realname">
          </div>
        </div>
        <div class="info-item">
          <div class="label">手机号码</div>
          <div class="content">
            <input type="text" v-model="userInfo.mobile">
          </div>
        </div>
        <div class="info-item">
          <div class="label">联系地址</div>
          <div class="content">
            <input type="text" v-model="userInfo.address">
          </div>
        </div>
        <div class="info-item">
          <div class="label">备注</div>
          <div class="content">
            <textarea v-model="userInfo.notes"></textarea>
          </div>
        </div>
      </div>
      <div class="btn-save" v-if="showSave" @click="save">保存</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import Uploader from "@/components/uploader/Uploader";
export default {
  components: {
    uploader: Uploader
  },
  data() {
    return {
      uploadUrl: "/upload/uploadImage",
      imageList: [],
      showSave: true
    };
  },
  computed: {
    ...mapState({
      userInfo: state => state.Auth.userInfo
    })
  },
  created() {
    let that = this;
    that
      .getUserInfo({
        id: that.userInfo.uid
      })
      .then(res => {
        if (res.code == 0) {
          that.setUserInfo(res.data);
          that.imageList = [res.data.avatar];
        }
      });
  },
  methods: {
    ...mapActions("User", ["getUserInfo", "saveUserInfo"]),
    ...mapMutations("Auth", ["setUserInfo"]),
    uploadSuccess(e) {
      let that = this;
      that.imageList = e;
    },
    save() {
      let that = this;
      that
        .saveUserInfo({
          uid: that.userInfo.uid,
          name: that.userInfo.name,
          password: that.userInfo.password,
          realname: that.userInfo.realname,
          address: that.userInfo.address,
          mobile: that.userInfo.mobile,
          notes: that.userInfo.notes,
          avatar: that.imageList[0]
        })
        .then(res => {
          if (res.code == 0) {
            console.log("modify success");
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.userinfo {
  .userinfo-con {
    position: relative;
    width: 640px;
    background: #fff;
    margin: 0 auto;
    padding: 20px;
    .basic-info {
      .title {
        height: 40px;
        font-size: 30px;
        font-weight: bold;
        line-height: 40px;
      }
      .info-item {
        position: relative;
        min-height: 80px;
        display: flex;
        align-items: center;
        .label {
          flex-basis: 80px;
          text-align: right;
          margin-right: 20px;
          font-size: 14px;
        }
        .content {
          .avatar {
            width: 60px;
            height: 60px;
          }
          input {
            padding-left: 10px;
            height: 40px;
          }
          textarea {
            line-height: 20px;
            padding: 10px;
            border-color: #e5e5e5;
            outline: none;
          }
        }
      }
    }
    .btn-save {
      width: 100px;
      position: relative;
      margin: 0 auto;
      height: 35px;
      line-height: 35px;
      background: #21a0fe;
      font-size: 14px;
      text-align: center;
      border-radius: 4px;
      color: #fff;
      margin-top: 20px;
      cursor: pointer;
    }
  }
}
</style>
