export interface Transaction {
    // TODO
    status: boolean
    transactionHash: string
    transactionIndex: number
    blockHash: string
    blockNumber: number
    from: string
    to: string
    contractAddress?: string
    cumulativeGasUsed: number
    gasUsed: number
}