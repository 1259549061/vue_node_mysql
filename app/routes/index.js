var express = require('express');
var router = express.Router();
var mysqlQuery = require('../app');

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

module.exports = router;
