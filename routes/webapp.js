var express = require('express');
var router = express.Router();
var config = require('../conf/config');
var oraclerun = require('../functions/oraclerun');
var waterfall = require('async-waterfall');
var Client = require('node-rest-client').Client;

var client = new Client();


router.get('/', function (req, res) {
  waterfall([
    function(callback){
      unirest.get('http://127.0.0.1:3000/api/ansatt').end(function (response) {
          callback(null, response.body);
          console.log(JSON.stringify(response.body, null, 4))
      });
    },
    function(response1, callback){
      unirest.get('http://127.0.0.1:3000/api/kunder').end(function (response) {
          callback(null, response1, response.body);
          console.log(JSON.stringify(response.body, null, 4))
      });
    },
    function(response1,response2, callback){
      unirest.get('http://127.0.0.1:3000/api/oppdrag').end(function (response) {
          callback(null, response1, response2, response.body);
          console.log(JSON.stringify(response.body, null, 4))
      });
    },
    function(response1,response2, response3, callback){
      unirest.get('http://127.0.0.1:3000/api/prosjekt').end(function (response) {
          callback(null, response1, response2, response3, response.body);
          console.log(JSON.stringify(response.body, null, 4))
      });
    }
  ], function (err, response1, response2, response3, response4) {
    res.render('webapp', {
      ansatt: response1,
      kunder: response2,
      oppdrag: response3,
      prosjekter: response4
    });
  });

})


module.exports = router;
