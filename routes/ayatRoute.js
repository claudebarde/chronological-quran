var express = require('express');
var router = express.Router();
const { ayatRequest } = require('./fetchSura');

/* GET users listing. */
router.get('/quran/:surat/:ayat', function(req, res, next) {
  if(isNaN(req.params.surat) || req.params.surat > 114 || isNaN(req.params.ayat)){
    res.render('error');
  } else {
    const result = ayatRequest(req.params.surat, req.params.ayat);
    if(result === undefined){
      res.render('error');
    } else {
      res.render('displayText', result);
    }
  }
});

module.exports = router;
