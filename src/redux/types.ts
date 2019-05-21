export enum Status {
    InProgress = 'InProgress',
    Completed = 'Completed',
    Synchronizing = 'Synchronizing', // this won't apply for connection modal
    Failed = 'Failed',
    NotStarted = 'NotStarted',
    Started = 'Started'
}

export interface Connection {
    _id?: string;
    name: string;
    url: string;
    transactionReceipts: Transaction[]
    contractInstances?: Contract[]
}

export interface Contract {
    _id?: string;
    connectionId?: string
    name: string
    sourceCode: string
    abi: []
    bytecode: string
}

export interface CreateContract {
    status: Status
    result?: Contract
}

export interface CreateConnection {
    status: Status
    result?: Connection
}

export interface Transaction {
    // TODO
    status: boolean;
    transactionHash: string;
    transactionIndex: number;
    blockHash: string;
    blockNumber: number;
    from: string;
    to: string;
    contractAddress?: string;
    cumulativeGasUsed: number;
    gasUsed: number;
}



