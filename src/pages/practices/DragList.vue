<template>
    <div class="draglist-container">
        <div class="block-item">
            <div class="intro">
                <p>1，通过transition-group包裹所有要交换的item，实现交换位置过渡</p>
                <p>2，通过dragstart记录drag的item</p>
                <p>3，通过dragenter记录拖动过程中的信息，可以在这里实现实时交换，即拖过一个交换一个</p>
                <p>4，通过dragend交换2个元素</p>
            </div>
            <div class="com-item">
                <transition-group name="list-item-action">
                    <div
                        class="drag-list"
                        v-for="item in List"
                        :key="item.id"
                        draggable="true"
                        @dragstart="dragstart(item)"
                        @dragenter="dragenter(item)"
                        @dragend="dragend(item)"
                    >
                        {{ item.title }}
                    </div>
                </transition-group>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            List: [
                { id: 1, title: "这里是列表1的标题" },
                { id: 2, title: "这里是列表2的标题" },
                { id: 3, title: "这里是列表3的标题" },
                { id: 4, title: "这里是列表4的标题" },
                { id: 5, title: "这里是列表5的标题" },
                { id: 6, title: "这里是列表6的标题" },
                { id: 7, title: "这里是列表7的标题" },
            ],
            oldItem: "",
            newItem: "",
        };
    },
    methods: {
        // 记录初始信息
        dragstart(item) {
            this.oldItem = item;
        },
        // 记录过程中信息
        dragenter(item) {
            this.newItem = item;
        },
        // 做最终操作
        dragend(item) {
            if (this.oldItem != this.newItem) {
                let oldIndex = this.List.indexOf(this.oldItem);
                let newIndex = this.List.indexOf(this.newItem);
                let newList = [...this.List]; // 中间数组，用于交换两个节点
                // 删除老的节点
                newList.splice(oldIndex, 1);
                // 在列表目标位置增加新的节点
                newList.splice(newIndex, 0, this.oldItem);
                // 更新this.List，触发transition-group的动画效果
                this.List = [...newList];
            }
        },
    },
};
</script>
<style scoped lang="less">
.list-item-action-move {
    transition: transform 1s;
}
.draglist-container {
    box-sizing: border-box;
    padding: 20px;
    background: #fff;
    .drag-list {
        margin: 0 auto;
        width: 300px;
        height: 50px;
        line-height: 50px;
        text-align: center;
        border: 1px solid #20a0ff;
        background-color: #bfa;
    }
}
</style>
