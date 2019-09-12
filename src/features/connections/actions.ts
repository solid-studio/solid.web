import { ActionCreator, Action } from 'redux'

import { ActionType, CreateConnectionAction, ConnectionsReceivedAction, GetConnectionsAction, ConnectionModalAction } from './action-types'
import { Connection } from './types'

export const closeConnectionModal: ActionCreator<Action> = (): ConnectionModalAction => {
  return {
    type: ActionType.CLOSE_CONNECTION_MODAL
  }
}

export const openConnectionModal: ActionCreator<Action> = (connection?: Connection): ConnectionModalAction => {
  return {
    type: ActionType.OPEN_CONNECTION_MODAL,
    payload: connection
  }
}

export const connectionsReceived: ActionCreator<Action> = (connections: Connection[]): ConnectionsReceivedAction => {
  return {
    type: ActionType.CONNECTIONS_RECEIVED,
    payload: connections
  }
}

export const getConnections: ActionCreator<Action> = (): GetConnectionsAction => {
  return {
    type: ActionType.GET_CONNECTIONS
  }
}

export const createOrUpdateConnection: ActionCreator<Action> = (values: Connection): CreateConnectionAction => {
  return {
    type: ActionType.CREATE_CONNECTION,
    payload: values
  }
}

export const connectionCreated: ActionCreator<Action> = (values: Connection): CreateConnectionAction => {
  return {
    type: ActionType.CONNECTION_CREATED,
    payload: values
  }
}

