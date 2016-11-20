var express = require('express');
var router = express.Router();
var fs = require('fs');
var config = require('../conf/config');
var oraclerun = require('../functions/oraclerun')

require.extensions['.ddl'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

var initDB = function (req, res, next) {
  sqlline = require("../dep/database.ddl");
  console.log(sqlline);
  next()
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Firma-backend' });
});

router.get('/initdb', [initDB, oraclerun]);

module.exports = router;
