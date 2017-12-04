var express = require('express');
var router = express.Router();
var mysqlQuery = require('../app');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');
var chokidar = require('chokidar');

/* GET home page. */
router.get('/getData', function(req, res, next) {
    mysqlQuery.mysqlQuery('select * from indexTree',function (err,vals,fields) {
        if(err){
            return res.json({
                message:'获取树列表失败',
                data:''
            })
        }else{
            return res.json({
                message:"ok",
                data:vals
            })
        }
    })
});
router.get('/rename', function(req, res, next) {
    let id = req.query.id;
    let name = req.query.name;
    mysqlQuery.mysqlQuery(`update indexTree set name='${name}' where id='${id}'`,function (err,vals,fields) {
        if(err){
            return res.json({
                'message':'修改名称失败',
                'data':''
            })
        }else{
            return res.json({
                'message':'ok',
                'data':''
            })
        }
    });
});
router.get('/getContent', function(req, res, next) {
    let id = req.query.id;
    mysqlQuery.mysqlQuery(`select content from indexTree where id='${id}'`,function (err,vals,fields) {
        if(err){
            return res.json({
                'message':'获取内容失败',
                'data':''
            })
        }else{
            return res.json({
                'message':'ok',
                'data':vals[0].content
            })
        }
    });
});
router.post('/contentUpload',function (req,res,next) {
    let form = new formidable.IncomingForm();
    form.uploadDir = 'uploadDir';
    form.keepExtensions = false;//不保存扩展名
    let path = '';
    let treeId = req.query.id;
    let newName = '';
    let filePath = '';
    let count = 0;
    form.parse(req, function(err, fields, files) {
        if(err){
            return res.send({
                'message':'获取文件路径失败',
                'data':''
            })
        }else{
            path = files.file.path;
            newName = new Date().getFullYear().toString() + (new Date().getMonth()+1) + (new Date().getDay()<10?('0'+new Date().getDay()):new Date().getDay()) + '0000' + new Date().getTime();
            fs.rename((__dirname+'/'+path).replace(/\/routes/,''),(__dirname+'/uploadDir/'+newName).replace(/\/routes/,''))
            filePath = (__dirname+'/uploadDir/'+newName).replace(/\/routes/,'');
        }
    });
    form.on('end', function() { //‘end’时间在请求完全接收后触发，即文件已被成功存入磁盘。通过该事件可以发送响应
        return test();
    });
    function test() {
        fs.readFile(filePath,'utf8',function (err,data) {
            if(err){
                setTimeout(function () {
                    count++;
                    test();
                },300);
                if(count === 20){
                    return res.send({
                        'message':'读取文件失败',
                        'data':''
                    })
                }
            }else{
                if(data){
                    data = data.toString().replace(/'/g,'\'');
                    fs.readdir((__dirname+'/uploadDir').replace(/\/routes/,''),function (err,files) {
                        if(err){
                            return res.send({
                                'message':'读取目录失败',
                                'data':''
                            })
                        }else{
                            if(files.length>20){
                                fs.unlink((__dirname+'/uploadDir/').replace(/\/routes/,'')+files[0]);
                            }else{}
                        }
                    });
                    mysqlQuery.mysqlQuery(`update indexTree set content='${data}' where id='${treeId}'`,function (err,vals,fields) {
                        if(err){
                            return res.send({
                                'message':'数据库存储数据失败',
                                'data':''
                            })
                        }else{
                            return res.send({
                                'message':'ok',
                                'data':data
                            })
                        }
                    });
                }
            }
        });
    }
});

module.exports = router;
