var express = require('express');
var router = express.Router();
const { suraRequest } = require('./fetchSura');

/* GET users listing. */
router.get('/quran/:surat', function(req, res, next) {
  if(isNaN(req.params.surat) || req.params.surat > 114){
    res.render('error');
  } else {
    const result = suraRequest(req.params.surat);
    if(result === undefined){
      res.render('error');
    } else {
      res.render('displayText', result);
    }
  }
});

module.exports = router;
