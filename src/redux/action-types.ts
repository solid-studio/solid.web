import { Action } from "redux";

import { Connection, CreateConnection, CreateContract, Contract, Transaction } from "./types";

export enum ActionType {
    ERROR_WHEN_GETTING_DATA = "ERROR_WHEN_GETTING_DATA",
    ERROR_WHEN_EXECUTING_TRANSACTION = "ERROR_WHEN_EXECUTING_TRANSACTION",
    CONNECTIONS_RECEIVED = "CONNECTIONS_RECEIVED",
    CONTRACTS_RECEIVED = "CONTRACTS_RECEIVED",
    CREATE_CONNECTION = "CREATE_CONNECTION",
    CREATE_CONTRACT = "CREATE_CONTRACT",
    CONTRACT_CREATED = "CONTRACT_CREATED",
    CONNECTION_CREATED = "CONNECTION_CREATED",
    TRANSACTIONS_RECEIVED = "TRANSACTIONS_RECEIVED",
    CONTRACT_SELECTED = "CONTRACT_SELECTED",
    LOAD_COMPILER = "LOAD_COMPILER"
}

// connection
export interface ConnectionCreatedAction extends Action {
    type: ActionType.CONNECTION_CREATED,
    payload: Connection
}

export interface CreateConnectionAction extends Action {
    type: ActionType.CREATE_CONNECTION;
    payload: CreateConnection;
}

export interface ConnectionsReceivedAction extends Action {
    type: ActionType.CONNECTIONS_RECEIVED;
    payload: Connection[];
}

// contract
export interface ContractSelectedAction extends Action {
    type: ActionType.CONTRACT_SELECTED,
    payload: Contract
}

export interface ContractCreatedAction extends Action {
    type: ActionType.CONTRACT_CREATED,
    payload: Contract
}

export interface CreateContractAction extends Action {
    type: ActionType.CREATE_CONTRACT;
    payload: CreateContract;
}

export interface ContractsReceivedAction extends Action {
    type: ActionType.CONTRACTS_RECEIVED;
    payload: Contract[];
}

export interface TransactionsReceivedAction extends Action {
    type: ActionType.TRANSACTIONS_RECEIVED;
    payload: Transaction[];
}

// compiler
export interface LoadCompilerWorkerAction extends Action {
    type: ActionType.LOAD_COMPILER;
    payload: Worker | undefined
}

export type Actions = LoadCompilerWorkerAction |
    ContractSelectedAction |
    ContractsReceivedAction | ContractCreatedAction |
    CreateContractAction | CreateConnectionAction |
    ConnectionsReceivedAction | ConnectionCreatedAction |
    TransactionsReceivedAction;