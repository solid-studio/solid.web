import { ActionCreator } from 'redux'

import { Connection } from '@solidstudio/types'

import {
  ActionType,
  CreateConnectionAction,
  ConnectionsReceivedAction,
  GetConnectionsAction,
  ConnectionModalAction,
  ConnectionItemSelectedAction
} from './action-types'
import { ConnectionItem } from './types'

export const closeConnectionModal: ActionCreator<ConnectionModalAction> = (): ConnectionModalAction => {
  return {
    type: ActionType.CLOSE_CONNECTION_MODAL
  }
}

export const openConnectionModal: ActionCreator<ConnectionModalAction> = (
  connection?: Connection
): ConnectionModalAction => {
  return {
    type: ActionType.OPEN_CONNECTION_MODAL,
    payload: connection
  }
}

export const connectionsReceived: ActionCreator<ConnectionsReceivedAction> = (
  connections: Connection[]
): ConnectionsReceivedAction => {
  return {
    type: ActionType.CONNECTIONS_RECEIVED,
    payload: connections
  }
}

export const getConnections: ActionCreator<GetConnectionsAction> = (): GetConnectionsAction => {
  return {
    type: ActionType.GET_CONNECTIONS
  }
}

export const createOrUpdateConnection: ActionCreator<CreateConnectionAction> = (
  values: Connection
): CreateConnectionAction => {
  return {
    type: ActionType.CREATE_CONNECTION,
    payload: values
  }
}

export const connectionCreated: ActionCreator<CreateConnectionAction> = (
  values: Connection
): CreateConnectionAction => {
  return {
    type: ActionType.CONNECTION_CREATED,
    payload: values
  }
}

export const connectionItemSelected: ActionCreator<ConnectionItemSelectedAction> = (
  values: ConnectionItem
): ConnectionItemSelectedAction => {
  return {
    type: ActionType.CONNECTION_ITEM_SELECTED,
    payload: values
  }
}
