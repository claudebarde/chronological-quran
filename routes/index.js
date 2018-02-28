var express = require('express');
var router = express.Router();
const quranJS = require('../quranJS/quranJS');

/* GET home page. */
router.get('/', function(req, res, next) {
  const quranOrder = quranJS.chronologicalOrder();
    let text = '<div class="index__list"><ul class="index__links">';
    for(let item in quranOrder){
      if (quranOrder.hasOwnProperty(item)) {
        text += `<li><a href="/quran/${quranOrder[item]["traditionalOrder"]}">${item} - <span class="index__links__item__ar">${quranOrder[item]["ar"]}</span></a><br /><span class="index__links__item__en">${quranOrder[item]["en"]}</span></li>`;
      }

      if(item % 38 === 0 && item != 114){
        console.log(item);
        text += '</ul><ul class="index__links">';
      }
    }
    text += "</ul></div>";

  res.render('index', { text });
});

module.exports = router;
