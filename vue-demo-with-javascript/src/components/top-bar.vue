<template>
  <div class="top-bar-row">
    <div class="back-button">
      <el-button @click="$router.back()" v-if="showBackButton">
        <i class="el-icon-back"></i> 返回
      </el-button>
    </div>

    <div class="top-bar-item top-bar-left">
      <slot name="left"></slot>
    </div>

    <!--空白div撑起中间区域-->
    <div class="top-bar-filler"></div>

    <div class="top-bar-item top-bar-right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'top-bar',
    props: {
      showBackButton: {
        type: Boolean,
        default: true
      }
    }
  }
</script>

<style>
  /*容器设置为flex*/
  .top-bar-row {
    margin: 0.5vw 0;
    display: flex;
    align-items: center;
  }

  .back-button {
    margin-right: 10px;
  }

  /*左侧设置为flex布局,默认左对齐*/
  .top-bar-left {
    display: flex;
  }

  .top-bar-filler {
    flex-grow: 1;
  }

  /*右侧设置为flex布局,自动增长,且右对齐*/
  .top-bar-right {
    display: flex;
    justify-content: flex-end;
  }

</style>