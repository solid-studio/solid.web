import { Status } from "../common/types";

export interface CreateConnection {
    status: Status
    result?: Connection
}

export interface Connection {
    _id?: string
    name: string
    url: string
    // transactionReceipts: Transaction[] TODO
    // contractInstances?: Contract[] TODO
}