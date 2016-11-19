var express = require('express');
var router = express.Router();
var config = require('../conf/config');
var oraclerun = require('../functions/oraclerun');

var getAnsatt = function (req, res, next) {
  sqlline = "SELECT * FROM ANSATT WHERE 1=1 ";
  next()
}

var getKunder = function (req, res, next) {
  sqlline = "SELECT * FROM KUNDER WHERE 1=1 ";
  next()
}

var getOppdrag = function (req, res, next) {
  sqlline = "SELECT * FROM OPPDRAG WHERE 1=1 ";
  next()
}

var getProsjekt = function (req, res, next) {
  sqlline = "SELECT * FROM PROSJEKT WHERE 1=1 ";
  next()
}

var getTimer = function (req, res, next) {
  sqlline = "SELECT * FROM Timer WHERE 1=1 ";
  next()
}

var filter = function (req, res, next) {
  for (var key in req.query) {
    if (req.query.hasOwnProperty(key)) {
      sqlline= sqlline + "AND " + key + " LIKE '" + req.query[key] + "' ";
    }
  }
  console.log(sqlline);

  next()
}

router.get('/ansatt/', [getAnsatt, filter, oraclerun]);

router.get('/kunder/', [getKunder, filter, oraclerun]);

router.get('/oppdrag/', [getOppdrag, filter, oraclerun]);

router.get('/prosjekt/', [getProsjekt, filter, oraclerun]);

router.get('/timer/', [getTimer, filter, oraclerun]);


/* GET api info */
router.get('/', function(req, res, next) {
  res.render('api', {
    title: 'API Information:',
    config: JSON.stringify(config, null, 4)
  });
});


module.exports = router;
