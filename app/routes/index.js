var express = require('express');
var router = express.Router();
var mysqlQuery = require('../app');
var formidable = require('formidable');
var util = require('util');
var fs = require('fs');

/* GET home page. */
router.get('/getData', function(req, res, next) {
    mysqlQuery.mysqlQuery('select * from indexTree',function (err,vals,fields) {
        if(err) throw err;
        res.send(vals)
    })
});
router.get('/rename', function(req, res, next) {
    let id = req.query.id;
    let name = req.query.name;
    console.log(id,name);
    mysqlQuery.mysqlQuery(`update indexTree set name='${name}' where id='${id}'`,function (err,vals,fields) {
        if(err) throw err;
        res.json({
            'message':'ok',
            'data':''
        })
    });
});
router.get('/getContent', function(req, res, next) {
    let id = req.query.id;
    mysqlQuery.mysqlQuery(`select content from indexTree where id='${id}'`,function (err,vals,fields) {
        console.log(vals);
        let content = vals.content==null?'':vals.content;
        if(err) throw err;
        res.json({
            'message':'ok',
            'data':content
        })
    });
});
router.post('/contentUpload',function (req,res,next) {
    let form = new formidable.IncomingForm();
    form.uploadDir = 'uploadDir';
    form.keepExtensions = true;//保存扩展名
    let path = '';
    let treeId = req.query.id;
    form.parse(req, function(err, fields, files) {
        if(err) throw err
        path = files.file.path;
    });
    form.on('end', function() {
        let filePath = (__dirname+'/'+path).replace(/\/routes/,'');
        fs.readFile(filePath,'utf8',function (err,data) {
            console.log(data)
            if(err) throw err;
            mysqlQuery.mysqlQuery(`update indexTree set content='${data}' where id='${treeId}'`,function (err,vals,fields) {
                if(err) throw err
            });
            res.send({
                'message':'ok',
                'data':data
            })
        });
    });
});

module.exports = router;
