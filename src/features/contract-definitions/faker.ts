import { ContractDefinition } from './types'

export const buildFakeContractDefinition = (): ContractDefinition => {
    const contractDefinition: ContractDefinition = {
        _id: '1',
        name: "ERC-20",
        sourceCode: "source code", // TODO
        abi: [], // TODO
        bytecode: "bytecode" // TODO
    }

    return contractDefinition
}

export const buildFakeContractDefinitions = (): ContractDefinition[] => {
    const connections: ContractDefinition[] = [{
        _id: '1',
        name: "ERC-20",
        sourceCode: "source code",
        abi: [],
        bytecode: ""
    },
    {
        _id: '2',
        name: "ERC-721",
        sourceCode: "source code",
        abi: [],
        bytecode: "bytecode"

    }]

    return connections
}
