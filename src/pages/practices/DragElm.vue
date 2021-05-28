<template>
    <div class="drag-elm">
        <div class="elms">
            <div class="elm" :id="'d' + item.id" v-for="item in elms" :key="item.id" draggable="true" @dragstart="dragStart">
                {{ item.name }}
            </div>
        </div>
        <div class="target-con" ref="target2" @drop="drop" @dragover="dragOver">
            <template v-for="(item, index) in comList">
                <component
                    v-bind:is="item.name"
                    :key="index"
                    :styles="item.styles"
                ></component>
            </template>
        </div>
    </div>
</template>
<script>
// 预定好的组件
import d1 from "./dragcoms/d1";
import d2 from "./dragcoms/d2";
import d3 from "./dragcoms/d3";
export default {
    components: {
        d1,
        d2,
        d3
    },
    data() {
        return {
            elms: [
                {
                    id: 1,
                    name: "elm1",
                },
                {
                    id: 2,
                    name: "elm2",
                },
                {
                    id: 3,
                    name: "elm3",
                },
            ],
            comList: [],
        };
    },
    methods: {
        dragOver(e) {
            e.preventDefault();
        },
        drop(e) {
            e.preventDefault();
            var data = e.dataTransfer.getData("ID");
            this.createComponent(data, e);
        },
        dragStart(e) {
            // 传递的值，这里传递元素id，在drop时可以获取到
            e.dataTransfer.setData("ID", e.target.id);
        },
        createComponent(name, e) {
            let pNodeInfo = this.$refs.target2.getBoundingClientRect();
            this.comList.push({
                name: name,
                styles: {
                    left: e.clientX - pNodeInfo.left - 50 + "px",
                    top: e.clientY - pNodeInfo.top - 50 + "px",
                },
            });
            // var a = document.createElement("div")
            // a.innerHTML = "data" + name
            // this.$refs.target.appendChild(a)
        },
    },
};
</script>
<style lang="less">
.drag-elm {
    .elms {
        position: absolute;
        width: 300px;
        height: 300px;
        top: 200px;
        border: 1px red solid;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        align-items: center;

        .elm {
            width: 100px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            color: blue;
            border: 1px red solid;
        }
    }

    .target-con {
        position: absolute;
        width: 300px;
        height: 300px;
        border: 1px blue solid;
        left: 400px;
        top: 200px;
        overflow: hidden;
    }
}
</style>
