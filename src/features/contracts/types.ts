import { AbiItem } from "web3-utils";

export interface Contract {
    _id?: string
    name: string
    sourceCode: string
    abi: AbiItem[]
    bytecode: string
    address: string // TODO, for ALREADY DEPLOYED is fine, but for simulation?
    connectionId: string // TODO, for ALREADY DEPLOYED is fine, but for simulation?
}