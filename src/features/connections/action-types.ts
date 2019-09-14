import { Action } from 'redux'

import { Connection } from './types'

export enum ActionType {
    OPEN_CONNECTION_MODAL = 'OPEN_CONNECTION_MODAL',
    CLOSE_CONNECTION_MODAL = 'CLOSE_CONNECTION_MODAL',
    GET_CONNECTIONS = 'GET_CONNECTIONS',
    ERROR_WHEN_GETTING_DATA = 'ERROR_WHEN_GETTING_DATA',
    CONNECTIONS_RECEIVED = 'CONNECTIONS_RECEIVED',
    CREATE_CONNECTION = 'CREATE_CONNECTION',
    CONNECTION_CREATED = 'CONNECTION_CREATED',
}

export interface ConnectionModalAction extends Action {
    type: ActionType.OPEN_CONNECTION_MODAL | ActionType.CLOSE_CONNECTION_MODAL,
    payload?: Connection
}

export interface GetConnectionsAction extends Action {
    type: ActionType.GET_CONNECTIONS
}

export interface ConnectionsReceivedAction extends Action {
    type: ActionType.CONNECTIONS_RECEIVED
    payload: Connection[]
}

export interface CreateConnectionAction extends Action {
    type: ActionType.CREATE_CONNECTION | ActionType.CONNECTION_CREATED
    payload: Connection
}

export type Actions = ConnectionModalAction
    | GetConnectionsAction
    | ConnectionsReceivedAction
    | CreateConnectionAction
