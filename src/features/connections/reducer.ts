import { Reducer } from 'redux'
import { normalize, schema } from 'normalizr';

import { Connection } from '@solid-explorer/types'

import { ActionType as BlockActionType } from '../blocks/action-types'
import { ActionType as TransactionActionType } from '../transactions/action-types'
import { ActionType as ContractActionType } from '../contracts/action-types'

import { Status, NormalizedObject } from '../common/types'

import { ActionType, Actions } from './action-types'

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

/* tslint:disable */
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
    case ContractActionType.CONTRACTS_RECEIVED:
      const contracts = action.payload.map((item) => {
        return `${item.id}`
      });
      // A connection has to be selected in order to access this
      const connectionIdFromContracts = state.currentConnection ? state.currentConnection.id : action.payload[0].connectionId // As all transactions should be of the same connection
      const newConnectionsWithContracts = {
        ...state.connections,
        byId: {
          ...state.connections.byId,
          [`${connectionIdFromContracts}`]: {
            ...state.connections.byId[`${connectionIdFromContracts}`],
            contracts
          }
        }
      }
      return {
        ...state,
        connections: newConnectionsWithContracts
      }
    case TransactionActionType.TRANSACTIONS_RECEIVED:
      const transactions = action.payload.map((item) => {
        return `${item.id}`
      });
      // A connection has to be selected in order to access this
      const connectionIdFromTransactions = state.currentConnection ? state.currentConnection.id : action.payload[0].connectionId // As all transactions should be of the same connection
      const newConnectionsWithTransactions = {
        ...state.connections,
        byId: {
          ...state.connections.byId,
          [`${connectionIdFromTransactions}`]: {
            ...state.connections.byId[`${connectionIdFromTransactions}`],
            transactions
          }
        }
      }
      return {
        ...state,
        connections: newConnectionsWithTransactions
      }
    case BlockActionType.BLOCKS_RECEIVED:
      const blocks = action.payload.map((item) => {
        return `${item.id}`
      });
      // A connection has to be selected in order to access this
      const connectionIdFromBlocks = state.currentConnection ? state.currentConnection.id : action.payload[0].connectionId // As all blocks should be of the same connection
      const newConnectionsWithBlock = {
        ...state.connections,
        byId: {
          ...state.connections.byId,
          [`${connectionIdFromBlocks}`]: {
            ...state.connections.byId[`${connectionIdFromBlocks}`],
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
/* tslint:enable */

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