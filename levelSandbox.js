const level = require('level');
const chainDB = './chaindata';
class LevelSandbox {

    constructor() {
        this.db = level(chainDB);
    }

    // Get data from levelDB with key (Promise)
    getLevelDBData(key){
        let self = this;
        //return new Promise(function(resolve, reject) {
            return  self.db.get(key)/*, function(err, value) {
                if (err) return console.log('Not found!', err);
                console.log('Value = ' + value);
                resolve( value);
              });
        });*/
    }

    // Add data to levelDB with key and value (Promise)
    addLevelDBData(key, value) {
        let self = this;
        //return new Promise(function(resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject() 
            self.db.put(key, value);
        //});
    }

      addDataToLevelDB(value) {
        let i = 0;
        let self = this;
        self.db.createReadStream().on('data', async function(data) {
              i++;
            }).on('error', function(err) {
                return console.log('Unable to read data stream!', err)
            }).on('close', function() {
              console.log('Block #' + i);
             self.addLevelDBData(i, value);
            });
    }

    // Method that return the height
    getBlocksCount() {
        let self = this;
        return new Promise(function(resolve, reject){
            let i = 0;
            self.db.createReadStream().on('data', function(data) {
                i++;
                }).on('error', function(err) {
                    reject(err)
                    console.log('Unable to read data stream!', err)
                }).on('close', function() {
                  console.log('Counter #' + i);
                  resolve(i);
                });
            return i;
        });
    }  

      // Method that return the height
      getBlock(x) {
        let self = this;
        return new Promise(function(resolve, reject){
            let i = 0;
            self.db.createReadStream().on('data', function(data) {
                i++;
                if(i===x){
                    resolve(data.value);
                }
             });
        });
    }  

}

module.exports.LevelSandbox = LevelSandbox;