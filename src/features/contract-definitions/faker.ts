import { ContractDefinition } from './types'

export const buildFakeContractDefinition = (): ContractDefinition => {
    const contractDefinition: ContractDefinition = {
        name: "ERC-20",
        sourceCode: "source code", // TODO
        abi: [], // TODO
        bytecode: "bytecode" // TODO
    }

    return contractDefinition
}

export const buildFakeContractDefinitions = (): ContractDefinition[] => {
    const connections: ContractDefinition[] = [{
        name: "ERC-20",
        sourceCode: "source code",
        abi: [],
        bytecode: ""
    },
    {
        name: "ERC-721",
        sourceCode: "source code",
        abi: [],
        bytecode: "bytecode"

    }]

    return connections
}
