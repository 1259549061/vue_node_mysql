<template>
  <div style="width: 100%">
    <header class="index_header">
      <img src="../../src/assets/mojiezuo.png" width="32" style="vertical-align: middle">
      <img src="../../src/assets/mojiezuo.png" width="32">
      <span style="color: #ffffff">~ ~ ~ ~ ~</span>
      <h3 style="color: #ffffff;line-height: 70px;padding-left: 10px;padding-right: 10px;display: inline">slucky xxxxxxx</h3>
      <span style="color: #ffffff">~ ~ ~ ~ ~</span>
      <img src="../../src/assets/mojiezuo.png" width="32">
      <img src="../../src/assets/mojiezuo.png" width="32" style="vertical-align: middle">
      <input type="button" value="退出" class="btn btn-default pull-right mRight20" @click="loginOut" style="position: relative;top: 21px;">
      <span style="color: #ffffff;float: right;margin-right: 20px;margin-left: 20px;line-height: 70px">{{username}}</span>
      <img src="../../src/assets/user.png" width="28" style="float: right;position: relative;top: 21px;">

    </header>
    <div class="index_main_box">
      <div class="index_main_box_box">
        <div class="index_main_left">
          <ul style="width: 100%;height: 100%;overflow: auto;padding-top: 10px;" id="index_tree" class="ztree"></ul>
        </div>
        <div class="index_main_right" v-show="menu_tree_id != ''">
          <div style="width: 96%;margin:0 auto;">
            <div class="col-md-12 col-xs-12 padding0" style="height: 54px;line-height: 54px;border-bottom: 1px dashed #ffffff">
              <div class="col-md-3 col-xs-3 col-sm-3 colorF padding0">名称：{{content.name}}</div>
              <div class="col-md-3 col-xs-3 col-sm-3 colorF padding0">最后更新时间：{{content.updateTime}}</div>
              <div class="col-md-3 col-xs-3 col-sm-3 col-md-offset-3 col-xs-offset-3 col-sm-offset-3 colorF padding0">
                <div class="sys_up_box">
                  <form id="uploadFormCus" enctype="multipart/form-data">
                    <input type="file" name="file" id="file" class="sys_upload_input" @change="upload">
                  </form>
                </div>
              </div>
              <div class="clear"></div>
            </div>
            <div class="clear"></div>
          </div>
          <div style="width: 96%;height:calc(100% - 64px);background-color: #ffffff;color: #000000;margin: 10px auto 0 auto">
            <textarea class="col-md-12 col-sm-12 col-xs-12" style="height:100%;overflow: auto;resize: none" v-model="content.data"></textarea>
          </div>
        </div>
        <div class="index_main_right" v-show="menu_tree_id == ''">
          <div style="width: 96%;height: 74px;line-height: 74px;margin: 0 auto">
            <div class="col-md-4 col-sm-4 col-xs-4 colorF padding0">
              所在位置：{{myLocation}}
            </div>
            <div class="col-md-4 col-sm-4 col-xs-4 colorF"></div>
            <div class="col-md-4 col-sm-4 col-xs-4 colorF"></div>
          </div>
          <div style="width: 96%;height: 500px;margin: 0 auto" id="myBaiduMap"></div>
        </div>
      </div>
    </div>
    <ul style="width: 80px;position: absolute;border: 1px solid #dddddd;background-color: #dddddd;"
        id="onRightId" v-show="onRightShow">
      <li @click="treeMenu('rename')" style="border-bottom: 1px solid #ffffff">重命名</li>
      <li @click="treeMenu('delete')">删除</li>
    </ul>
    <div class="modal fade" id="treeMenuId" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
      <div class="modal-dialog" role="document" style="margin-top: 100px;width: 400px;">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" @click="menu_return()" aria-label="Close">
              <span aria-hidden="true" style="font-size: 20px">×</span>
            </button>
            <h4 class="modal-title" id="myModalLabel" style="font-size: 16px;">{{menu_title}}</h4>
          </div>
          <div class="modal-body">
            <label v-show="menu_title == '重命名'">请输入名称：</label>
            <input v-show="menu_title == '重命名'" type="text" class="form-control mTop10" v-model="menu_name">
            <div v-show="menu_title == '删除'" class="col-xs-12"
                 style="text-align: center;height: 40px;line-height: 40px;">确定要删除此节点吗？
            </div>
            <div class="clear"></div>
          </div>
          <div class="modal-footer">
            <input type="button" class="btn btn-default" value="取消" @click="menu_return()">
            <input type="button" class="btn btn-primary" value="确定" @click="menu_sure()">
          </div>
        </div>
      </div>
    </div>
    <myTips v-bind:tip_type="tip_type" v-bind:tip_text="tip_text" v-show="tipsShow"></myTips>
  </div>
</template>

<script>
  require('ztree');
  require('bootstrap');
  import myTips from './mytips.vue'
  export default {
    data(){
      return{
        onRightShow:false,
        menu_title:'',
        menu_tree_id:'',//选择的树id
        menu_name:'', //重命名的name,
        tip_type:'',
        tip_text:'',
        tipsShow:false,
        username:'liujun',
        myLocation:'',
        content:{
          name:'',
          updateTime:'',
          data:'暂无数据'
        }
      }
    },
    mounted:function () {
      console.log(new Date().getFullYear().toString() + (new Date().getMonth()+1) + new Date().getDay() + '_' + new Date().getTime())
      $('.app_innerbox').css('width','1200px');
      this.init();
    },
    components:{
      myTips:myTips
    },
    methods:{
      init:function (val='init') {
        if(val === 'init'){
          this.bindBody();
        }
        this.tree_setting = {
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
            fontCss:{
              fontSize:'14px',
              fontFamily:"Times New Roman",
              color:"#ffffff"
            },
            showIcon:false
          },
          edit: {
            drag:{
              inner:true
            },
            enable: true,
            showRemoveBtn: false,
            showRenameBtn: false,

          },
          callback: {
            beforeDrag: this.beforeDrag,
            beforeDrop: this.beforeDrop,
            onRightClick:this.onRightClick,
            onClick:this.click
          }
        };
        this.$http.get('/liujun/index/tree/getData').then((data)=>{
          if(this.tree_obj) this.tree_obj.destroy();
          this.tree_obj = $.fn.zTree.init($("#index_tree"),this.tree_setting,data.body.data);
          this.tree_obj.expandAll(true)
        });
        this.renderMap();
      },
      renderMap:function () {
        var op = this;
        var geolocation = new BMap.Geolocation();
        geolocation.getCurrentPosition(function(r){
          if(this.getStatus() == BMAP_STATUS_SUCCESS){
            op.myLocation = r.point.lng + ',' + r.point.lat;
            var map = new BMap.Map("myBaiduMap");    // 创建Map实例
            map.centerAndZoom(new BMap.Point(r.point.lng,r.point.lat), 11);  // 初始化地图,设置中心点坐标和地图级别
            //添加地图类型控件
            map.addControl(new BMap.MapTypeControl({
              mapTypes:[
                BMAP_NORMAL_MAP,
                BMAP_HYBRID_MAP
              ]}));
            map.setCurrentCity("上海");          // 设置地图显示的城市 此项是必须设置的
            map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
          }
          else {
            alert('failed'+this.getStatus());
          }

        },{enableHighAccuracy: true});
      },
      bindBody:function () {
        $('body').bind("mousedown",(event)=> {
          if(event.target.id != 'onRightId' && event.target.innerHTML!="重命名" && event.target.innerHTML!="删除"){
            this.onRightShow = false;
          }
        })
      },
      unbindBody:function () {
        $('body').unbind("mousedown");
      },
      beforeDrag:function () {

      },
      beforeDrop:function () {

      },
      onRightClick:function(event,treeId,treeNode){
        if(treeNode==null){
          return false;
        }
        this.menu_tree_id = treeNode.id;
        this.menu_name = treeNode.name;
        let width = $(window).width();
        let offset = 0;
        if(width>1200){
          offset = (width - 1200)/2
        }
        $("#onRightId").css({top:`${event.clientY + 4}px`,left:`${event.clientX - offset + 10}px`});
        this.onRightShow = true
      },
      click:function (event, treeId, treeNode) {
        this.menu_tree_id = treeNode.id;
        this.$http.get('/liujun/index/tree/getContent',{params:{id:this.menu_tree_id}}).then(data=>{
          console.log(data)
          this.content.data = data.body.data
        })
      },
      treeMenu:function (val) {
        this.unbindBody();
        this.onRightShow = false;
        if(val == 'rename'){
          this.menu_title = '重命名'
        }else{ //delete
          this.menu_title = '删除'
        }
        $('#treeMenuId').modal({backdrop:'static'},'show');
      },
      menu_sure:function () {
        if(this.menu_title == '重命名'){
          this.$http.get('/liujun/index/tree/rename',{params:{id:this.menu_tree_id,name:this.menu_name}}).then((data)=>{
            console.log(data)
            if(data.body.message == 'ok'){
              this.init('refresh');
            }else{

            }
          },()=>{

          })
        }
        $('#treeMenuId').modal('hide');
        this.bindBody();
      },
      menu_return:function () {
        $('#treeMenuId').modal('hide');
        this.bindBody();
      },
      upload:function () {
        this.$http.post(`/liujun/index/tree/contentUpload?id=${this.menu_tree_id}`,new FormData($('#uploadFormCus')[0])).then(data=>{
          console.log(data.body.data);
          if(data.body.message == 'ok'){
            this.content.data = data.body.data;
            alert('上传更新成功');
          }else{
            alert(data.body.message)
          }
          $('#file').val('');
        })
      },
      loginOut:function () {
        this.$router.push({name:'login'})
      }
    },
  }
</script>
