<template>
  <div class="slot">
    <div class="block-item">
      <div class="intro">
        <p>slot是设计组件的时候留给父组件进行内容分发的，使得组件的功能更加自由</p>
        <p>比如一个icon按钮，icon可以有slot来指定，element的icon-button只能用自带的icon</p>
        <p>未命名的slot为默认slot，组件里的内容会替换默认slot</p>
        <p>如果父组件里不指定slot内容，子组件里会显示defaultslot里的默认内容（前提是有）</p>
        <p>默认slot和默认内容是不一样的</p>
        <p>不指定slot的内容都会分发到默认slot里</p>
        <p>所有的slot都可以指定默认内容，即未分发内容时的默认内容</p>
        <p>多个slot的默认内容在达成条件时可以同时出现</p>
      </div>
      <div class="com-item">
        <icon-button :buttonText="fmsg" :textColor="'pink'">
          <i class="hey-iconcaidan"></i>
        </icon-button>
        <icon-button :buttonText="fmsg" :textColor="'pink'"></icon-button>
      </div>
    </div>
    <div class="block-item">
      <div class="intro">
        <p>具名slot</p>
        <p>可以在子组件里放置具名slot，父组件里通过名称分发内容</p>
        <p>如果只指定具名slot的内容，子组件里还是会显示defaultslot的默认内容（前提是有）</p>
      </div>
      <div class="com-item">
        <icon-button :buttonText="fmsg" :textColor="'blue'">
          <i class="hey-iconcaidan"></i>
          <template #rear>
            <i class="hey-iconcaidan"></i>
          </template>
        </icon-button>
      </div>
    </div>
    <div class="block-item">
      <div class="intro">
        <p>slot作用域</p>
        <p>父组件往子组件slot里分发内容时可以使用自身作用域的数据</p>
        <p>与往子组件里传参不一样，无需用prop接受，会直接将内容渲染到子组件里</p>
      </div>
      <div class="com-item">
        <icon-button :buttonText="fmsg" :textColor="'blue'">
          <i class="hey-iconcaidan"></i>
          <template #rear>
            <i class="hey-iconcaidan"></i>{{ fmsg + 1 }}
          </template>
        </icon-button>
      </div>
    </div>
    <div class="block-item">
      <div class="intro">
        <p>slot-scope</p>
        <p>父组件里使用子组件数据进行分发内容</p>
        <p>例如一个列表组件，接受一个数组数据，每个item里的slot内容需要根据item的状态来确定</p>
        <p>在子组件的slot上绑定itemData</p>
        <p>父组件上通过slot-scope接受到itemData使用</p>
      </div>
      <div class="com-item">
        <guess-like :guessList="dataList">
          <template slot-scope="it">
            <s v-if="it.itemData.status == 1">${{ it.itemData.price }}</s>
          </template>
        </guess-like>
      </div>
    </div>
    <div class="block-item">
      <div class="intro">
        <p>组件嵌套</p>
        <p>子组件会当做默认slot，如果没有默认slot，组件包含的内容不予显示</p>
      </div>
      <div class="com-item">
        <guess-like :guessList="dataList">
          <number-box placeholderText="input" :defaultValue="8" :stepLength="1" :minValue="1" :maxValue="20"></number-box>
        </guess-like>
      </div>
    </div>
  </div>
</template>
<script>
import IconButton from "@/components/IconButton";
import GuessLike from "@/components/GuessLike";
import NumberBox from "@/components/NumberBox";
export default {
  components: {
    "icon-button": IconButton,
    "guess-like": GuessLike,
    "number-box": NumberBox,
  },
  data(){
    return {
      fmsg: "确定",
      dataList: [{
        title: "aaa",
        img: "https://pic1.zhimg.com/v2-24632619f8f250f4ba6f7189974fb538_is.jpg",
        price: "1",
        status: 0
      },{
        title: "bbb",
        img: "https://pic1.zhimg.com/v2-24632619f8f250f4ba6f7189974fb538_is.jpg",
        price: "2",
        status: 1
      }]
    }
  },
  methods: {
    handle(i){
      console.log(i.name)
    },
    handles(i){
      console.log(i)
    }
  }
}
</script>
<style lang="less" scoped>
.slot{
  box-sizing: border-box;
  padding: 20px;
  background: #fff;
}
</style>
