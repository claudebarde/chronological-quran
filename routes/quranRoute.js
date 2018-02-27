var express = require('express');
var router = express.Router();
const suraRequest = require('./fetchSura');

/* GET users listing. */
router.get('/quran/:id', function(req, res, next) {
  res.render('index', suraRequest(req.params.id));
});

module.exports = router;
