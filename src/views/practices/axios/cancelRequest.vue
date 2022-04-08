<template>
    <div style="padding: 20px">
        <div class="tab-con">
            <div class="tab-item" @click="changeTab('3')">3s req</div>
            <div class="tab-item" @click="changeTab('1')">1s req</div>
            <div class="tab-item" @click="changeTab('5')">5s req</div>
            <div class="tab-item" @click="cancelReq">取消请求</div>
        </div>        
        <div class="tab-content">
            <p>res: {{ res }}</p>
        </div>
    </div>
</template>
<script>
import axios from "axios";
export default {
    data() {
        return {
            res: "",
            exec: ""
        }
    },
    methods: {
        changeTab(e) {
            var a = axios.get(`/api/article/demo${e}`, {
                cancelToken: new axios.CancelToken((exec) => {
                    this.exec = exec
                })
            })
            a.then((res) => {
                this.res = "返回结果" + res.data
            }, (res) => {
                this.res = "返回结果" + res.data
            })
        },
        cancelReq() {
            console.log(window.exec)
            window.exec.forEach(item => {
                item()
            })
            // this.exec()
        }
    }
}
</script>
<style lang="less" scoped>
.tab-con {
    width: 400px;
    height: 40px;
    line-height: 40px;
    display: flex;

    .tab-item {
        padding: 0 10px;
        border-radius: 4px;
        cursor: pointer;
        color: #fff;
        background: lightskyblue;
        margin: 0 10px;
    }
}
.tab-content {
    padding: 20px;
}
</style>