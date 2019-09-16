import { Transaction } from "features/transactions";

export interface BlockHeader {
    number: number
    hash: string
    parentHash: string
    nonce: string
    sha3Uncles: string
    logsBloom: string
    transactionRoot: string
    stateRoot: string
    receiptRoot: string
    miner: string
    extraData: string
    gasLimit: number
    gasUsed: number
    timestamp: number | string
}

export interface Block extends BlockHeader {
    transactions: Transaction[];
    size: number
    difficulty: number
    totalDifficulty: number
    uncles: string[];
}