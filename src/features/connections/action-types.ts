import { Action } from 'redux'

import { Connection, CreateConnection } from './types'

export enum ActionType {
    ERROR_WHEN_GETTING_DATA = 'ERROR_WHEN_GETTING_DATA', // TODO: Duplicated
    CONNECTIONS_RECEIVED = 'CONNECTIONS_RECEIVED',
    CONTRACTS_RECEIVED = 'CONTRACTS_RECEIVED',
    CREATE_CONNECTION = 'CREATE_CONNECTION',
    CONNECTION_CREATED = 'CONNECTION_CREATED',
}

export interface ConnectionCreatedAction extends Action {
    type: ActionType.CONNECTION_CREATED
    payload: Connection
}

export interface CreateConnectionAction extends Action {
    type: ActionType.CREATE_CONNECTION
    payload: CreateConnection
}

export interface ConnectionsReceivedAction extends Action {
    type: ActionType.CONNECTIONS_RECEIVED
    payload: Connection[]
}

export type Actions = CreateConnectionAction
    | ConnectionsReceivedAction
    | ConnectionCreatedAction