import { Status } from "../common/types";

export interface Contract {
    _id?: string
    name: string
    sourceCode: string
    abi: []
    bytecode: string
    address?: string
    connectionId?: string
}

export interface CreateContract {
    status: Status
    result?: Contract
}
