<template>

</template>
<script>
  export default {
    data(){
      return {
        tipsShow:false,
        tip_success:false,
        tip_error:false,
        tip_info:false,
        tip_text:''
      }
    },
    mounted:function () {
      this.myTip();
    },
    methods:{
      myTip:function (type,text) {
        this.tipsShow = true;
        if(type == 'success') this.tip_success = true;
        if(type == 'error') this.tip_error = true;
        if(type == 'info') this.tip_info = true;
        this.tip_text = text
      }
    }
  }
</script>
