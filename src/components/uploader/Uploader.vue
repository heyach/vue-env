<template>
  <div class="c-uploader">
    <div class="images">
      <img :src="item" v-for="(item, index) in imageList" :key="index">
    </div>
    <div class="btn-upload">
      <img v-if="imageList.length == 0" src="@/assets/common/icon-add.png">
      <input @change="uploadImage" class="ipt-uploader" type="file" accept="image/*">
    </div>
  </div>
</template>

<script>
import uploadFiles from "./post";
export default {
  props: {
    uploadUrl: {
      type: String,
      default: ""
    },
    imageList: {
      type: Array,
      default: []
    }
  },
  watch: {
    imageList: {
      immediate: true,
      handler(val) {
        this.imageList = val;
      },
      deep: true
    }
  },
  methods: {
    uploadImage(e) {
      let that = this,
        file = e.target.files[0];
      if (file) {
        uploadFiles(that.uploadUrl, file, res => {
          that.$emit("uploadSuccess", res.data)
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.c-uploader {
  position: relative;
  min-width: 50px;
  height: 50px;

  .images {
    position: relative;
    height: 50px;
    display: flex;

    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
  }

  .btn-upload {
    position: absolute;
    width: 50px;
    height: 50px;
    top: 0;
    cursor: pointer;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .ipt-uploader {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    border: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
}
</style>
