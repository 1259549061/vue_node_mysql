<template>
  <div class="login_box">
    <div class="login_box_box">
      <div class="login_left">
        <div class="login_animate animated bounceInLeft" style="font-size: 50px" id="login_title">slucky 个人知识库</div>
        <div class="login_animate2 animated bounceInLeft" style="font-size: 50px">旋转 哈哈</div>
      </div>
      <div class="login_right">
        <div class="login_input_box">
          <div class="input-group width100">
            <span class="input-group-addon login_input_png" id="basic-addon1"></span>
            <input type="text" class="form-control login_input_style" placeholder="请输入用户名" aria-describedby="basic-addon1">
          </div>
          <div class="input-group mTop40 width100">
            <span class="input-group-addon login_input_png2" id="basic-addon2"></span>
            <input type="text" class="form-control login_input_style" placeholder="请输入密码" aria-describedby="basic-addon2">
          </div>
          <input type="button" style="width: 100%" class="btn btn-primary mTop40 login_space" value="登录" @click="login">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted:function () {
    this.init()
  },
  computed:{

  },
  methods:{
    init:function () {
      $('.app_innerbox').css('width','100%');
      $(".login_animate").on('webkitAnimationEnd',()=>{
        $('.login_animate2').addClass('myCircle');
      })
    },
    login:function () {
      $(".login_box").on('webkitAnimationEnd',()=>{
        this.$router.push({name:'index'});
      });
      $('.login_box').addClass('willLogin');
    }
  }
}
</script>


