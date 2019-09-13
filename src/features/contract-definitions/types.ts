import { AbiItem } from "web3-utils";

export interface ContractDefinition {
    _id?: string
    name: string
    sourceCode: string
    abi: AbiItem[]
    bytecode: string
}