const quranJS = require('../quranJS/quranJS');

const suraRequest = (id) => {
  const sura = quranJS.get(id);

  let text = "";
  for(let item in sura.text){
    if (sura.text.hasOwnProperty(item)) {
      text += `<div class="quranText"><p class="quranText__index">${item} - </p><p class="quranText__ar">${sura.text[item]["ar"]}</p><p class="quranText__en">${sura.text[item]["en"]}</p></div>`;
    }
  }

  return { title: sura.info.name, ename: sura.info.ename, text: text }
}

module.exports = suraRequest;