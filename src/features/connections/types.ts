export interface Connection {
    _id?: string
    name: string
    url: string
    // transactionReceipts: Transaction[] TODO
    // contractInstances?: Contract[] TODO
}

export interface ConnectionItem extends Connection {
    type: string
}