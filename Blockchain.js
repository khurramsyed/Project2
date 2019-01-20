/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

const SHA256 = require('crypto-js/sha256');
const LevelSandbox = require('./LevelSandbox.js');
const Block = require('./Block.js');

const BLOCK_HEIGHT_KEY = "BLOCK_HEIGHT"

class Blockchain {

    constructor() {
        this.bd = new LevelSandbox.LevelSandBox();
        console.log("Createing Genesis block");
        this.generateGenesisBlock();
    }

    // Helper method to create a Genesis Block (always with height= 0)
    // You have to options, because the method will always execute when you create your blockchain
    // you will need to set this up statically or instead you can verify if the height !== 0 then you
    // will not create the genesis block
    generateGenesisBlock(){
 
        this.bd.addLevelDBData(BLOCK_HEIGHT_KEY, this.getBlockHeight()).then((data) =>{
            console.log("Inside Genesis block Height = "+ data);
        }).catch(error => console.log(error));

        let genesis = new Block.Block("Genesis Block");
        this.addBlock(genesis);
    }

    // Get block height, it is a helper method that return the height of the blockchain
    getBlockHeight() {
        let height = this.bd.getLevelDBData(BLOCK_HEIGHT_KEY);
        if(height == null || height == undefined){
            return 0;
        }
        return height;
    }

    // Add new block
    addBlock(newBlock) {
        const self = this
        
        var newBlockHeight = self.getBlockHeight();
        console.log("In addBlock - new BlockHeight is "+ newBlockHeight);
        // Block height 
        newBlock.height = newBlockHeight
        // UTC timestamp
        newBlock.time = new Date().getTime().toString().slice(0,-3);
        // previous block hash
        if(self.getBlockHeight()>0){   
          newBlock.previousBlockHash = this.bd.getLevelDBData(self.getBlockHeight()).hash;
        }
        // Block hash with SHA256 using newBlock and converting to a string
        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
       
        console.log("At the time of insertion block height" + newBlockHeight);
        self.bd.addLevelDBData(newBlockHeight, newBlock).then(value => console.log("Inserted Block "+value));
        var nextBlockHeight = newBlockHeight +1
        self.updateBlockHeight(nextBlockHeight);
        
        return newBlock;
    }

    // Get Block By Height
    getBlock(height) {
        return this.bd.getLevelDBData(height);
    }

    // Validate if Block is being tampered by Block Height
    validateBlock(height) {
        // Add your code here
    }

    // Validate Blockchain
    validateChain() {
        // Add your code here
    }

    // Utility Method to Tamper a Block for Test Validation
    // This method is for testing purpose
    _modifyBlock(height, block) {
        let self = this;
        return new Promise( (resolve, reject) => {
            self.bd.addLevelDBData(height, JSON.stringify(block).toString()).then((blockModified) => {
                resolve(blockModified);
            }).catch((err) => { console.log(err); reject(err)});
        });
    }


    updateBlockHeight(height){
        if(isNaN(height)){
            throw "Block height must be a number";
        }
        console.log("Updating next block height to " + height);
       this.bd.addLevelDBData(BLOCK_HEIGHT_KEY, height).then(value => console.log("New Block height is "+ value)).catch((error)=> console.log("Error Updating the height to"+height) );
    }
   
}

module.exports.Blockchain = Blockchain;