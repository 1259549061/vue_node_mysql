<template>
  <div class="app_box">
    <div class="app_innerbox">
      <router-view/>
    </div>
    <!--<div class="app_box mytips" v-show="tipsShow" v-bind:class="{'success':tip_success,'error':tip_error,'info':tip_info}">{{tip_text}}</div>-->
  </div>
</template>

<script>

</script>

<style>
  .app_innerbox{
    width: 1200px;
    margin: 0 auto;
    height: 100%;
    position: relative;
    background-color:#3b3738
  }
  .app_box{
    position: absolute;
    left: 0;
    right:0;
    bottom: 0;
    top:0;
  }
</style>
