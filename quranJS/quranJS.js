/*
  RETURNS AN OBJECT WITH FOLLOWING PROPERTIES :
  - status (if no error, status = 1, if error, status = 0)
  - text (object with Quran text =
      - first level : 2 objects { info } and { text }
      - second level of { text } : )
*/

const fs = require('fs');

const quranDatas = require('./quran-data');


class QuranJS {
  constructor(){
    this.status = [1, "OK"];
    this.text = {};

    // populates text properties with Quran text
    this.buildQuranObject();
    this.buildTranslation();
    this.addInfoToSuras();
  }

  buildQuranObject(){
    try{
      const file = fs.readFileSync(__dirname + '/quran-simple-enhanced.txt', 'utf8');

      const quranLines = file.split(/\r?\n/);

      for(let line of quranLines){
        let newLine = line.split('|');
        let sura = newLine[0];
        let ayat = newLine[1];
        let arabic = newLine[2];

        if(this.text[sura]){
          this.text[sura]["text"][ayat] = { ar: arabic };
        } else {
          this.text[sura] = {info:{}, text:{}};
          this.text[sura]["text"][ayat] = { ar: arabic };
        }
      }
    } catch(e) {
      this.status = [0, e];
    }
  }

  // updates text property with English translation
  buildTranslation(){
    try{
      const file = fs.readFileSync(__dirname + '/en.sahih.txt', 'utf8');

      const translationLines = file.split(/\r?\n/);

      for(let line of translationLines){
        let newLine = line.split('|');
        let sura = newLine[0];
        let ayat = newLine[1];
        let english = newLine[2];

        // if(this.text[sura]){
        //   this.text[sura][ayat]["en"] = english;
        // }
        if(this.text[sura]){
          this.text[sura]["text"][ayat]["en"] = english;
        }
      }
    } catch(e) {
      this.status = [0, e];
    }
  }

  addInfoToSuras(){
    //
    for(let sura in this.text){ // we loop through the suras
      const infos = quranDatas.Sura[sura - 1]; // -1 because the datas are arrays inside an array with index 0
      this.text[sura]["info"] = {
        name: infos[4],
        tname: infos[5],
        ename: infos[6],
        type: infos[7],
        order: infos[2]
      };
    }
  }

  //get sura or sura+ayat requested
  get(sura = 0, ayat = 0){
    if(parseInt(sura) > 0 && parseInt(ayat) === 0){ // if sura is provided but not ayat
      if(this.text[sura]){ // if sura exists
        return this.text[sura];
      } else {
        return undefined;
      }
    } else if (parseInt(sura) > 0 && parseInt(ayat) > 0) { // if sura and ayat are provided
      if(this.text[sura]){ // if sura exists
        if(this.text[sura]["text"][ayat]){ // if ayat exists
          return {info: this.text[sura]["info"], text: this.text[sura]["text"][ayat]};
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    }
  }

  // searches for substrings in Quran
  search(string, lang = "ar"){
    string = string.trim();
    let results = [];
    if(string.length > 2 && typeof string === 'string'){ // must be at least 2 char long and not empty
      for(let sura in this.text){ // loops through suras
        for(let ayat in this.text[sura]["text"]){ // loops though ayats
          if(this.text[sura]["text"][ayat][lang].toLowerCase().includes(string.toLowerCase())){
            results.push(`[${sura}:${ayat}, ${this.text[sura]["text"][ayat][lang]}]`);
          }
        }
      }

      return {
        count: results.length,
        results
      };
    }
  }

  chronologicalOrder(){
    let chronologicalQuran = {};

    for(let sura in this.text){
      chronologicalQuran[this.text[sura]["info"]["order"]] = {
        traditionalOrder: sura,
        ar: this.text[sura]["info"]["name"],
        en: this.text[sura]["info"]["ename"]
      };
    }

    return chronologicalQuran;
  }

}

module.exports = new QuranJS();
