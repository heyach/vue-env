<template>
  <div class="todo-list">
    <div class="header">
      <div class="">TodoList</div>
      <input
        type="text"
        class="ipt-newtodo"
        placeholder="添加todo"
        v-model="newTodo"
        @keyup.enter="addNewTodo"
      >
    </div>
    <div class="container">
      <div class="undo">
        <div class="til">待完成
          <div class="count">{{undoCount}}</div>
        </div>
        <div class="undos">
          <div class="todo-item" v-for="(item, index) in todoList" :key="index" v-if="!item.status">
            <div class="s-l" @click="completeThis(item)">
              <img src="@/assets/todolist/unselected.png">
            </div>
            <div class="s-m">
              {{ item.name }}
              <div class="todo-time">{{ item.time }}</div>
            </div>
            <div class="s-r" @click="delThis(index)">
              <img src="@/assets/todolist/close.png">
            </div>
          </div>
        </div>
      </div>
      <div class="done">
        <div class="til">已完成
          <div class="count">{{doneCount}}</div>
        </div>
        <div class="dones">
          <div class="todo-item" v-for="(item, index) in todoList" :key="index" v-if="item.status">
            <div class="s-l" @click="undoThis(item)">
              <img src="@/assets/todolist/selected.png">
            </div>
            <div class="s-m">
              {{ item.name }}
              <div class="todo-time">{{ item.time }}</div>
            </div>
            <div class="s-r" @click="delThis(index)">
              <img src="@/assets/todolist/close.png">
            </div>
          </div>
        </div>
      </div>
    </div>
    <footers :styleType="msg"></footers>
  </div>
</template>
<script>
// 通过设置别名，@即为根目录地址
import Storage from "@/utils/Storage";
import TimeFormat from "@/utils/TimeFormat";
import Footer from "@/components/Footer";

export default {
  components: {
    footers: Footer
  },

  data() {
    return {
      newTodo: "",
      todoList: Storage.get("todolist") != null ? Storage.get("todolist") : [],
      msg: "hhh2"
    };
  },
  computed: {
    undoCount() {
      var c = 0;
      this.todoList.forEach(item => {
        if (!item.status) {
          c++;
        }
      });
      return c > 99 ? 99 : c;
    },
    doneCount() {
      var c = 0;
      this.todoList.forEach(item => {
        if (item.status) {
          c++;
        }
      });
      return c > 99 ? 99 : c;
    }
  },
  watch: {
    todoList: {
      handler(items) {
        // 监视todoList值，改变了更新storage
        Storage.set("todolist", this.todoList);
      },
      deep: true
    }
  },
  methods: {
    addNewTodo() {
      this.todoList.push({
        name: this.newTodo,
        status: false,
        time: TimeFormat.getTimeBySymbol("-")
      });
      Storage.set("todolist", this.todoList);
      this.newTodo = "";
    },
    completeThis(item) {
      item.status = true;
    },
    undoThis(item) {
      item.status = false;
    },
    delThis(index) {
      this.todoList.splice(index, 1);
    }
  }
};
</script>
<!-- 使用less，组件样式私有化scoped -->
<style lang="less" scoped>
.todo-list {
  box-sizing: border-box;
  background: #fff;
  .header {
    position: absolute;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: #333;
    color: #fff;
    z-index: 100;
    display: flex;
    justify-content: center;

    .ipt-newtodo {
      border: 0;
      padding: 0;
      margin-left: 20px;
      height: 32px;
      margin-top: 9px;
      padding-left: 10px;
      width: 200px;
      outline: none;
      border-radius: 4px;
      background: #f7f7f7;
    }
  }

  .container {
    position: absolute;
    width: 600px;
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    padding: 50px 20px 40px 20px;
    left: 50%;
    margin-left: -300px;

    .done {
      border-top: 1px #e5e5e5 solid;
    }

    .til {
      margin: 20px 0;
      color: #000;
      font-size: 18px;
      height: 25px;
      line-height: 25px;
      font-weight: bold;

      .count {
        float: right;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        line-height: 25px;
        background: red;
        color: #fff;
        text-align: center;
        font-size: 14px;
      }
    }

    .todo-item {
      position: relative;
      display: flex;
      margin-bottom: 20px;
      padding: 20px;
      background: #f7f7f7;
      border-radius: 4px;

      .s-l {
        display: flex;
        flex-direction: column;
        justify-content: center;

        img {
          width: 18px;
          height: 18px;
        }
      }
      .s-m {
        margin: 0 10px;
        line-height: 16px;
        word-break: break-all;
        padding-right: 18px;
        padding-bottom: 20px;
        cursor: pointer;

        .todo-time {
          position: absolute;
          height: 20px;
          line-height: 20px;
          font-size: 12px;
          color: #999;
        }
      }
      .s-r {
        position: absolute;
        width: 18px;
        height: 18px;
        top: 50%;
        margin-top: -9px;
        right: 18px;

        img {
          width: 18px;
          height: 18px;
        }
      }
    }
  }
}
</style>