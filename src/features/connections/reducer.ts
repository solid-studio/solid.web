import { Reducer } from 'redux'

import { Connection } from '@solid-explorer/types'

import { Status } from '../common/types'

import { ActionType, Actions } from './action-types'

export interface ConnectionState {
  connectionModalOpen: boolean
  connections: Connection[]
  currentConnection?: Connection
  getConnectionsStatus: Status
  createConnectionStatus: Status
}

export const initialState: ConnectionState = {
  connections: [],
  connectionModalOpen: false,
  createConnectionStatus: Status.NotStarted,
  getConnectionsStatus: Status.NotStarted,
  currentConnection: undefined
}

export const appReducer: Reducer<ConnectionState, Actions> = (
  state: ConnectionState = initialState,
  action: Actions
): ConnectionState => {
  switch (action.type) {
    case ActionType.CLOSE_CONNECTION_MODAL:
      return { ...state, connectionModalOpen: false, currentConnection: undefined }
    case ActionType.OPEN_CONNECTION_MODAL:
      return { ...state, connectionModalOpen: true, currentConnection: action.payload }
    case ActionType.GET_CONNECTIONS:
      return { ...state, getConnectionsStatus: Status.InProgress }
    case ActionType.CONNECTION_ITEM_SELECTED:
      return { ...state, currentConnection: action.payload }
    case ActionType.CONNECTIONS_RECEIVED:
      return {
        ...state,
        connections: action.payload,
        currentConnection: action.payload[0],
        getConnectionsStatus: Status.Completed
      }
    case ActionType.CREATE_CONNECTION:
      return { ...state, createConnectionStatus: Status.InProgress }
    case ActionType.CONNECTION_CREATED:
      const newConnections = [...state.connections, action.payload]
      return {
        ...state,
        connections: newConnections,
        currentConnection: action.payload,
        createConnectionStatus: Status.Completed
      }
    default:
      return state
  }
}
