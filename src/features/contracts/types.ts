import { Status } from "../common/types";

export interface Contract {
    _id?: string
    address?: string
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
