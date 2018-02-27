var express = require('express');
var router = express.Router();
const suraRequest = require('./fetchSura');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', suraRequest(96));
});

module.exports = router;
