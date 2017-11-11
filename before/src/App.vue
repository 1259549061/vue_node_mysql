<template>
  <div class="app_box">
    <div class="app_innerbox">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
  .app_innerbox{
    width: 1200px;
    margin: 0 auto;
    height: 100%;
    position: relative
  }
  .app_box{
    position: absolute;
    left: 0;
    right:0;
    bottom: 0;
    top:0;
  }
</style>
