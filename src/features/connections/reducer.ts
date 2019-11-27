import { Reducer } from 'redux'

import { Connection } from '@solid-explorer/types'

import { Status, NormalizedObject } from '../common/types'

import { ActionType, Actions } from './action-types'
import { normalize, schema } from 'normalizr';
import { ActionType as BlockActionType } from '../blocks/action-types'

export interface ConnectionState {
  connectionModalOpen: boolean
  connections: NormalizedObject<Connection>
  currentConnection?: Connection
  getConnectionsStatus: Status
  createConnectionStatus: Status
}

export const initialState: ConnectionState = {
  connections: {
    byId: {},
    allIds: []
  },
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
        connections: getNewConnections(action.payload, state),
        currentConnection: action.payload[0],
        getConnectionsStatus: Status.Completed
      }
    case BlockActionType.BLOCKS_RECEIVED:
      const blocks = action.payload.map((item) => {
        return item.id
      });
      const connectionId = action.payload[0].connectionId // as all will have same connectionId
      const newConnectionsWithBlock = {
        ...state.connections,
        byId: {
          ...state.connections.byId,
          [`${connectionId}`]: {
            ...state.connections.byId[`${connectionId}`],
            blocks
          }
        }
      }
      return {
        ...state,
        connections: newConnectionsWithBlock
      }
    case ActionType.CREATE_CONNECTION:
      return { ...state, createConnectionStatus: Status.InProgress }
    case ActionType.CONNECTION_CREATED:
      const newConnection = action.payload
      const newConnections = {
        ...state.connections,
        byId: {
          ...state.connections.byId,
          [`${newConnection.id}`]: action.payload
        },
        allIds: [...state.connections.allIds, newConnection.id as any]
      }
      return {
        ...state,
        connections: newConnections,// OR getNewConnections([action.payload], state),
        currentConnection: action.payload,
        createConnectionStatus: Status.Completed
      }
    default:
      return state
  }
}

export const normalizeConnections = (connections: Connection[]): NormalizedObject<Connection> => {
  const blockSchema = new schema.Entity('connections');
  const blockListSchema = new schema.Array(blockSchema);
  const normalizedData = normalize(connections, blockListSchema);

  return {
    byId: normalizedData.entities.connections,
    allIds: normalizedData.result
  }
}

export const getNewConnections = (connections: Connection[], state: ConnectionState): NormalizedObject<Connection> => {
  const newNormalizedConnections = normalizeConnections(connections)
  const filteredNewIds = newNormalizedConnections.allIds.filter((id: string) => {
    return state.connections.allIds.indexOf(id) === -1
  })
  const newConnections = {
    ...state.connections,
    byId: {
      ...state.connections.byId,
      ...newNormalizedConnections.byId
    },
    allIds: [...state.connections.allIds, ...filteredNewIds]
  }
  return newConnections
}