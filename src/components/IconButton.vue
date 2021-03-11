<template>
  <div class="icon-button">
    <button :style="{'color': textColor}">
      <slot>
        <img src="@/assets/common/logo.png" class="default-icon"/>
      </slot>
      <span>{{ buttonText }}</span>
      <slot name="rear"></slot>
    </button>
  </div>
</template>
<script>
export default {
  props: ["buttonText", "textColor"],
  data(){
    return {
      
    }
  }
}
</script>
<style lang="less" scoped>
.icon-button{
  button{
    width: 120px;
    height: 35px;
    line-height: 35px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .default-icon{
    width: 20px;
    height: 20px;
    margin-right: 3px;
  }
}
</style>

