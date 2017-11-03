<template>
  <div class="login_box">
    <div class="login_box_box">
      <div class="login_left">
        <div class="login_animate animated bounceInLeft">写着玩写着玩写着玩</div>
      </div>
      <div class="login_right" :style="{height:login_right_height}">
        <div class="login_input_box">
          <div class="input-group">
            <span class="input-group-addon login_input_png" id="basic-addon1"></span>
            <input type="text" class="form-control login_input_style" placeholder="请输入用户名" aria-describedby="basic-addon1">
          </div>
          <div class="input-group mTop40">
            <span class="input-group-addon login_input_png2" id="basic-addon2"></span>
            <input type="text" class="form-control login_input_style" placeholder="请输入密码" aria-describedby="basic-addon2">
          </div>
          <input type="button" style="width: 100%" class="btn btn-primary mTop40 login_space" value="登录">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let $ = window.jquery = require('jquery');
  import '../assets/css/login.css';
  import '../assets/css/common.css';
  import '../../node_modules/bootstrap/dist/css/bootstrap.css';
  import '../../node_modules/animate.css';
export default {
  data () {
    return {
      login_right_height:$(window).height()+'px'
    }
  },
  mounted:function () {
    this.init()
  },
  computed:{

  },
  methods:{
    init:function () {
      $(window).resize(()=>{
        this.login_right_height = $(window).height()+'px'
      })
      setTimeout(function () {
        $('.login_animate').addClass('myCircle')
      },2000)

    }
  }
}
</script>

