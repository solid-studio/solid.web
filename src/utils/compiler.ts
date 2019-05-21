const wrapper = require('solc/wrapper')
const solc = wrapper((window as any).Module)
console.log("SOLC", solc)
export { solc }


// var solc = require('solc/wrapper')
// var solcABI = require('solc/abi')


// function findImports (path) {
// 	if (path === 'lib.sol')
// 		return { contents: 'library L { function f() internal returns (uint) { return 7; } }' }
// 	else
// 		return { error: 'File not found' }
// }

// var output = JSON.parse(solc.compile(JSON.stringify(input), findImports))

// // `output` here contains the JSON output as specified in the documentation
// for (var contractName in output.contracts['test.sol']) {
// 	console.log(contractName + ': ' + output.contracts['test.sol'][contractName].evm.bytecode.object)
// }