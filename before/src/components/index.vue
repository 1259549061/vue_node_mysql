<template>
  <div style="width: 100%">
    <header class="index_header"></header>
    <div class="index_main_box">
      <div class="index_main_box_box">
        <div class="index_main_left">
          <ul style="width: 100%;height: 100%;overflow: auto;padding-top: 10px" id="index_tree" class="ztree"></ul>
        </div>
        <div class="index_main_right"></div>
      </div>
    </div>
  </div>
</template>
<script>
  require('ztree');
  export default {
    data(){
      return{

      }
    },
    mounted:function () {
      $('.app_innerbox').css('width','1200px');
      this.init();
    },
    methods:{
      init:function () {
        this.tree_setting = {
//          check:{
//            enable:true,
//            chkStyle:'checkbox'
//          },
          data:{
            key:{
              name:'name'
            },
            simpleData:{
              enable:true,
              idKey:'id',
              pIdKey:'pId',
              rootPid:null
            },
            keep:{
              left:true,
              parent:true
            }
          },
          view:{
            fontcss:{
              fontsize:'14px',
              fontFamily:"Times New Roman"
            },
            showIcon:false
          },
          edit: {
            drag:{
              inner:true
            },
            enable: true,
            showRemoveBtn: true,
            showRenameBtn: true,

          },
          callback: {
            beforeDrag: this.beforeDrag,
            beforeDrop: this.beforeDrop,
          }
        };
        this.$http.get('/liujun/index/tree/getData').then((data)=>{
          if(this.tree_obj) this.tree_obj.destroy();
          this.tree_obj = $.fn.zTree.init($("#index_tree"),this.tree_setting,data.body);
          this.tree_obj.expandAll(true)
        })
      }
    },
    beforeDrag:function () {

    },
    beforeDrop:function () {

    }
  }
</script>
