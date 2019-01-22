/* ===== Blockchain Class ==========================
|  Class with a constructor for new blockchain 		|
|  ================================================*/

const SHA256 = require('crypto-js/sha256');
const LevelSandbox = require('./LevelSandbox.js');
const Block = require('./Block.js');

class Blockchain {

    constructor() {
        this.db = new LevelSandbox.LevelSandbox();
        this.generateGenesisBlock();
    }

    // Helper method to create a Genesis Block (always with height= 0)
    // You have to options, because the method will always execute when you create your blockchain
    // you will need to set this up statically or instead you can verify if the height !== 0 then you
    // will not create the genesis block
    async generateGenesisBlock(){
        // Add your code here
        let blockHeight = await this.getBlockHeight();
        if(blockHeight<=0){
            let genesisBlock = new Block.Block("This is Genesis Block");
            console.log ("Creating Genesis Block");
            await this.addBlock(genesisBlock);
        }else {
            console.log("Genesis Block is Already created -- > Not Creating another Genesis");
        }
    }

    // Get block height, it is a helper method that return the height of the blockchain
    async getBlockHeight() {
        // Add your code here
        let blockHeight = await this.db.getBlocksCount();
        console.log("NOW RETURNING  block height "+ blockHeight);
        return blockHeight;
    }

    // Add new block
    async addBlock(newBlock) {
        newBlock.height = await this.getBlockHeight();
        console.log("New Blocks height "+newBlock.height);
        // UTC timestamp
        newBlock.time = new Date().getTime().toString().slice(0,-3);
        // previous block hash
        if(newBlock.height>0){

            let previousBlockJson = await this.getBlock(newBlock.height-1);
            let previousBlock = JSON.parse(previousBlockJson);
            console.log("Previous Block = "+ previousBlock)
            newBlock.previousBlockHash = previousBlock.hash;
        }
        // Block hash with SHA256 using newBlock and converting to a string
        newBlock.hash = SHA256(JSON.stringify(newBlock)).toString();
        console.log("Adding block # "+ newBlock.height);

        await this.db.addDataToLevelDB(JSON.stringify(newBlock));
        console.log("Saved Block to DB" + JSON.stringify(newBlock));
    }

    // Get Block By Height
    async getBlock(height) {
        let block = await this.db.getLevelDBData(height);
        console.log("Retrieved block "+height +" = "+block);
        return block;
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
   
}

module.exports.Blockchain = Blockchain;