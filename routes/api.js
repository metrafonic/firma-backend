var express = require('express');
var router = express.Router();
var oraclerun = require('../functions/oraclerun');


var cb1 = function (req, res, next) {
  sqlline = "SELECT " + req.params.c + " FROM ANSATT";
  console.log(req.params)
  console.log(req.params.c)
  next()
}

router.get('/example/:c', [cb1, oraclerun]);


/* GET api info */
router.get('/', function(req, res, next) {
  res.render('api', {
    title: 'API Information:',
    dbinfo: config.connAttrs
  });
});


module.exports = router;
