const compilerInput = (sources: any, opts: any) => {
    return JSON.stringify({
        language: 'Solidity',
        sources: sources,
        settings: {
            optimizer: {
                enabled: opts.optimize === true || opts.optimize === 1,
                runs: 200
            },
            libraries: opts.libraries,
            outputSelection: {
                '*': {
                    '': ['legacyAST'],
                    '*': ['abi', 'metadata', 'devdoc', 'userdoc', 'evm.legacyAssembly', 'evm.bytecode', 'evm.deployedBytecode', 'evm.methodIdentifiers', 'evm.gasEstimates']
                }
            }
        }
    })
}
export default compilerInput