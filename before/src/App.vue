<template>
  <div class="app_box">
    <div class="app_innerbox">
      <header class="index_header" v-show="showHeader">
        <img src="./assets/mojiezuo.png" width="32" style="vertical-align: middle">
        <img src="./assets/mojiezuo.png" width="32">
        <span style="color: #ffffff">~ ~ ~ ~ ~</span>
        <h3 style="color: #ffffff;line-height: 70px;padding-left: 10px;padding-right: 10px;display: inline">slucky xxxxxxx</h3>
        <span style="color: #ffffff">~ ~ ~ ~ ~</span>
        <img src="./assets/mojiezuo.png" width="32">
        <img src="./assets/mojiezuo.png" width="32" style="vertical-align: middle">
        <input type="button" value="退出" class="btn btn-default pull-right mRight20" @click="loginOut" style="position: relative;top: 21px;">
        <span style="color: #ffffff;float: right;margin-right: 20px;margin-left: 20px;line-height: 70px">{{username}}</span>
        <img src="./assets/user.png" width="28" style="float: right;position: relative;top: 21px;">
      </header>
      <div style="width:100%;display: flex;position: absolute;top: 70px;bottom: 0;left: 0;right: 0" v-show="showHeader">
        <div style="width: 60px;border: 1px solid #ffffff;border-top: none" class="MainNav">
          <ul>
            <li><router-link to="/index"><span>首页</span></router-link></li>
            <li><router-link to="/page2"><span>222</span></router-link></li>
            <li><router-link to="/page3"><span>333</span></router-link></li>
          </ul>
        </div>
        <div style="flex: 1">
          <router-view/>
        </div>
      </div>
      <router-view v-show="!showHeader"></router-view>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return{
        username:'liujun',
        showHeader:false
      }
    },
    mounted: function () {
      console.log(this.$route.path)
    },
    methods:{
      loginOut:function () {
        this.$router.push({name:'login'})
      }
    }
  }

</script>

<style>
  .app_box{
    position: absolute;
    left: 0;
    right:0;
    bottom: 0;
    top:0;
    background: url('./assets/will_login_back.jpg') no-repeat;
    background-size: cover;
  }
  .app_innerbox{
    width: 100%;
    margin: 0 auto;
    height: 100%;
    position: relative;
  }
</style>
