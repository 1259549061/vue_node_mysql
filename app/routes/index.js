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

module.exports = router;
