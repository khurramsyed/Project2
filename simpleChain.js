const BlockChain = require('./BlockChain.js');
const Block = require('./Block.js');

let myBlockChain = new BlockChain.Blockchain();

/******************************************
 ** Function for Create Tests Blocks   ****
 ******************************************/

 let i= 0;
 let interval= setInterval( ()=>  {
	i++;
	myBlockChain.addBlock(new Block.Block("Block #"+i));
  if(i>=10)
    clearInterval(interval);
 }, 1000)

/***********************************************
 ** Function to get the Height of the Chain ****
 ***********************************************/


// Be careful this only will work if `getBlockHeight` method in Blockchain.js file return a Promise
myBlockChain.getBlockHeight().then((height) => {
	console.log(height);
}).catch((err) => { console.log(err);});


// prints a promise and then result


/***********************************************
 ******** Function to Get a Block  *************
 ***********************************************/

/*
// Be careful this only will work if `getBlock` method in Blockchain.js file return a Promise
myBlockChain.getBlock(0).then((block) => {
	console.log(JSON.stringify(block));
}).catch((err) => { console.log(err);});

// prints a promise and then result

*?
/***********************************************
 ***************** Validate Block  *************
 ***********************************************/


// Be careful this only will work if `validateBlock` method in Blockchain.js file return a Promise
myBlockChain.validateBlock(0).then((valid) => {
	console.log(valid);
})

/** Tampering a Block this is only for the purpose of testing the validation methods */
/*
myBlockChain.getBlock(5).then((block) => {
	let blockAux = JSON.parse(block);
	blockAux.body = "Tampered Block";
	console.log("Aux Height ="+blockAux.height)
	myBlockChain._modifyBlock(blockAux.height, blockAux).then((blockModified) => {
		if(blockModified){
			myBlockChain.validateBlock(blockAux.height).then((valid) => {
				console.log(`Block #${blockAux.height}, is valid? = ${valid}`);
			})
			.catch((error) => {
				console.log(error);
			})
		} else {
			console.log("The Block wasn't modified");
		}
	}).catch((err) => { console.log(err);});
}).catch((err) => { console.log(err);});
myBlockChain.getBlock(6).then((block) => {
	let blockAux =  JSON.parse(block);
	blockAux.previousBlockHash = "jndininuud94j9i3j49dij9ijij39idj9oi";
	myBlockChain._modifyBlock(blockAux.height, blockAux).then((blockModified) => {
		if(blockModified){
			console.log("The Block was modified");
		} else {
			console.log("The Block wasn't modified");
		}
	}).catch((err) => { console.log(err);});
}).catch((err) => { console.log(err);});
/***********************************************
 ***************** Validate Chain  *************
 ***********************************************/


// Be careful this only will work if `validateChain` method in Blockchain.js file return a Promise
myBlockChain.validateChain().then((errors) => {
	console.log("Errors Are "+errors);
	if(errors.length>0){
		console.log("The chain is not valid:");
		errors.forEach(error => {
			console.log(error);
		});
	} else {
		console.log("No errors found, The chain is Valid!");
	}
}).catch((error) => {
	console.log(error);
})



