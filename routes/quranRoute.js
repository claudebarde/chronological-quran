var express = require('express');
var router = express.Router();
const suraRequest = require('./fetchSura');

/* GET users listing. */
router.get('/quran/:id', function(req, res, next) {
  if(isNaN(req.params.id) || req.params.id > 114){
    res.render('error');
  } else {
    res.render('index', suraRequest(req.params.id));
  }
});

module.exports = router;
