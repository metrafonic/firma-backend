var express = require('express');
var router = express.Router();
var config = require('../conf/config');
var oraclerun = require('../functions/oraclerun');


var getAnsatt = function (req, res, next) {
  sqlline = "SELECT * FROM ANSATT WHERE ANSATTNR LIKE '"+ req.params.id +"'";
  next()
}
var getAllAnsatt = function (req, res, next) {
  sqlline = "SELECT * FROM ANSATT";
  next()
}
var getProsjekt = function (req, res, next) {
  sqlline = "SELECT * FROM PROSJEKT WHERE PROSJKODE LIKE '"+ req.params.id +"'";
  next()
}
var getAllProsjekt = function (req, res, next) {
  sqlline = "SELECT * FROM PROSJEKT";
  next()
}

router.get('/ansatt/', [getAllAnsatt, oraclerun]);
router.get('/ansatt/:id', [getAnsatt, oraclerun]);

router.get('/prosjekt/', [getAllProsjekt, oraclerun]);
router.get('/prosjekt/:id', [getProsjekt, oraclerun]);


/* GET api info */
router.get('/', function(req, res, next) {
  res.render('api', {
    title: 'API Information:',
    config: JSON.stringify(config, null, 4)
  });
});


module.exports = router;
