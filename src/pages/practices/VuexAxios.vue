<template>
  <div class="vuexaxios">
    <div>a{{ totalCount }}</div>
    <div>b{{ getTenCount }}</div>
    <el-button type="primary" @click="addCount">add</el-button>
    <el-button type="primary" @click="reduceCount">reduce</el-button>
    <el-button type="primary" @click="getInfo">getInfo</el-button>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { Button } from "element-ui";
export default {
  name: "VuexAxios",
  components: {
    "el-button": Button
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("VuexAxios", ["getTenCount"]),
    // 正常引入store里的state
    // totalCount() {
    //   return this.$store.state.VuexAxios.totalCount;
    // }
    // 快速引入
    ...mapState({
      totalCount: state => state.VuexAxios.totalCount
    })
  },
  methods: {
    // 通过mapActions快速引入后，相当于在method里注册里这个方法
    // this.addCount()相当于this.$store.dispatch("addCount")
    ...mapActions("VuexAxios", ["addCount", "reduceCount", "getAsyncInfo"]),
    // module里使用namespaced后触发action也需要加上module路径
    // getAsyncInfo(){
    //   this.$store
    //     .dispatch("VuexAxios/getAsyncInfo", {
    //       name: 'bbb'
    //     })
    //     .then(res => {
    //       console.log(2, res, this.getTenCount);
    //     })
    // }
    getInfo() {
      this.getAsyncInfo({
        name: "ccc"
      }).then(res => {
        console.log(12, res);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.vuexaxios{
  box-sizing: border-box;
  padding: 20px;
  background: #fff;
}
</style>

