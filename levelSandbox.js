const level = require('level');
const chainDB = './chaindata';
class LevelSandbox {

    constructor() {
        this.db = level(chainDB);
    }

    // Get data from levelDB with key (Promise)
     getLevelDBData(key){
        let self = this;
        return new Promise(function(resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject()
        });
    }

    // Add data to levelDB with key and value (Promise)
    addLevelDBData(key, value) {
        let self = this;
        return new Promise(function(resolve, reject) {
            // Add your code here, remember in Promises you need to resolve() or reject() 
            self.db.put(key, value, function(err) {
                if (err) return console.log('Block ' + key + ' submission failed', err);
                });
            resolve;
        });
    }

     addDataToLevelDB(value) {
        let i = 0;
        let self = this;
        self.db.createReadStream().on('data', function(data) {
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
                    return console.log('Unable to read data stream!', err)
                }).on('close', function() {
                console.log('Counter #' + i);
                return i;
                });
        });
    }  

}

module.exports.LevelSandbox = LevelSandbox;