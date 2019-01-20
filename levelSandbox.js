/* ===== Persist data with LevelDB ===================================
|  Learn more: level: https://github.com/Level/level     |
|  =============================================================*/

const level = require('level');
const chainDB = './chaindata';
const db = level(chainDB);
class LevelSandBox {
  constructor(){

  }
  // Add data to levelDB with key/value pair
   addLevelDBData(key,value){
     console.log("Inserting Data "+ key +" , " + value);
    return new Promise(function(resolve, reject){
    db.put(key, value)
    resolve(value)
  });
  }

  // Get data from levelDB with key
  getLevelDBData(key){
    return db.get(key, function(err, value) {
      if (err) return console.log('Not found!', err);
      console.log('Key = '+key+' Value = ' + value);
      return value;
    });
  }

  // Add data to levelDB with value
  addDataToLevelDB(value) {
      let i = 0;
      db.createReadStream().on('data', function(data) {
            i++;
          }).on('error', function(err) {
              return console.log('Unable to read data stream!', err)
          }).on('close', function() {
            console.log('Block #' + i);
            addLevelDBData(i, value);
          });
  } 

}

module.exports.LevelSandBox = LevelSandBox