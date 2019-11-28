import { buildFakeConnections, buildFakeConnection, buildFakeTransactions, Connection, buildFakeBlocks, buildFakeContracts } from '@solid-explorer/types'

import { appReducer, initialState, normalizeConnections } from './reducer'
import {
  connectionsReceived,
  closeConnectionModal,
  openConnectionModal,
  getConnections,
  createOrUpdateConnection,
  connectionCreated
} from './actions'
import { Status, NormalizedObject } from '../common/types'
import { transactionsReceived } from '../transactions/actions'
import { ConnectionNormalized } from './types'
import { blocksReceived } from '../blocks/actions'
import { contractsReceived } from '../contracts/actions'

describe('Connections reducer', () => {
  test('ActionType.CLOSE_CONNECTION_MODAL', () => {
    const action = closeConnectionModal()
    const newState = appReducer(initialState, action)

    expect(newState.connectionModalOpen).toEqual(false)
    expect(newState.connections).toEqual(initialState.connections)
    expect(newState.currentConnection).toEqual(initialState.currentConnection)
    expect(newState.getConnectionsStatus).toEqual(initialState.getConnectionsStatus)
    expect(newState.createConnectionStatus).toEqual(initialState.createConnectionStatus)
  })

  test('ActionType.OPEN_CONNECTION_MODAL in EDIT mode', () => {
    const connection = buildFakeConnection()
    const action = openConnectionModal(connection)
    const newState = appReducer(initialState, action)

    expect(newState.connectionModalOpen).toEqual(true)
    expect(newState.connections).toEqual(initialState.connections)
    expect(newState.currentConnection).toEqual(connection)
    expect(newState.getConnectionsStatus).toEqual(initialState.getConnectionsStatus)
    expect(newState.createConnectionStatus).toEqual(initialState.createConnectionStatus)
  })

  test('ActionType.OPEN_CONNECTION_MODAL in CREATE mode', () => {
    const action = openConnectionModal()
    const newState = appReducer(initialState, action)

    expect(newState.connectionModalOpen).toEqual(true)
    expect(newState.connections).toEqual(initialState.connections)
    expect(newState.currentConnection).toEqual(initialState.currentConnection)
    expect(newState.getConnectionsStatus).toEqual(initialState.getConnectionsStatus)
    expect(newState.createConnectionStatus).toEqual(initialState.createConnectionStatus)
  })

  test('ActionType.GET_CONNECTIONS', () => {
    const action = getConnections()
    const newState = appReducer(initialState, action)

    expect(newState.connectionModalOpen).toEqual(initialState.connectionModalOpen)
    expect(newState.connections).toEqual(initialState.connections)
    expect(newState.currentConnection).toEqual(initialState.currentConnection)
    expect(newState.getConnectionsStatus).toEqual(Status.InProgress)
    expect(newState.createConnectionStatus).toEqual(initialState.createConnectionStatus)
  })

  // TODO
  // test('ActionType.CONNECTION_ITEM_SELECTED', () => {
  //     const blocks = buildFakeBlocks()
  //     const blocksReceivedAction = blocksReceived(blocks);
  //     const newState = appReducer(initialState, blocksReceivedAction)

  //     expect(newState.blocks).toEqual(blocks)
  //     expect(newState.currentBlock).toEqual(blocks[0]) // TODO: Am I sure the current block has to be the first one?, check reducer too..
  //     expect(newState.getBlocksStatus).toEqual(initialState.getBlocksStatus)
  // })

  describe('ActionType.CONNECTIONS_RECEIVED', () => {
    test('ActionType.CONNECTIONS_RECEIVED: that connections are added to the state correctly', () => {
      const connections = buildFakeConnections()
      const normalizedConnections = normalizeConnections(connections)
      const action = connectionsReceived(connections)
      const newState = appReducer(initialState, action)

      expect(newState.connectionModalOpen).toEqual(initialState.connectionModalOpen)
      expect(newState.connections).toEqual(normalizedConnections)
      expect(newState.currentConnection).toEqual(connections[0])
      expect(newState.getConnectionsStatus).toEqual(Status.Completed)
      expect(newState.createConnectionStatus).toEqual(initialState.createConnectionStatus)
    })

    test('ActionType.CONNECTIONS_RECEIVED: adding new items', () => {
      const connections = buildFakeConnections()
      const normalizedConnections = normalizeConnections(connections)
      const action = connectionsReceived(connections)
      const newState = appReducer(initialState, action)

      expect(newState.connectionModalOpen).toEqual(initialState.connectionModalOpen)
      expect(newState.connections).toEqual(normalizedConnections)
      expect(newState.currentConnection).toEqual(connections[0])
      expect(newState.getConnectionsStatus).toEqual(Status.Completed)
      expect(newState.createConnectionStatus).toEqual(initialState.createConnectionStatus)

      // add new items
      const newConnection = buildFakeConnection({ id: 3 })
      const newConnectionsNormalized = normalizeConnections([newConnection])
      const newConnectionsReceivedAction = connectionsReceived([newConnection])
      const newStateWithNewConnection = appReducer(newState, newConnectionsReceivedAction)

      expect(newStateWithNewConnection.connections.byId[1]).toEqual(normalizedConnections.byId[1])
      expect(newStateWithNewConnection.connections.byId[2]).toEqual(normalizedConnections.byId[2])
      expect(newStateWithNewConnection.connections.byId[3]).toEqual(newConnectionsNormalized.byId[3])

    })

    test('ActionType.CONNECTIONS_RECEIVED: Adding new existing items', () => {
      const connections = buildFakeConnections()
      const normalizedConnections = normalizeConnections(connections)
      const action = connectionsReceived(connections)
      const newState = appReducer(initialState, action)

      expect(newState.connectionModalOpen).toEqual(initialState.connectionModalOpen)
      expect(newState.connections).toEqual(normalizedConnections)
      expect(newState.currentConnection).toEqual(connections[0])
      expect(newState.getConnectionsStatus).toEqual(Status.Completed)
      expect(newState.createConnectionStatus).toEqual(initialState.createConnectionStatus)

      // add new existing items
      const newName = 'other name'
      const newConnection = buildFakeConnection({ id: 2, name: newName })
      const newConnectionsNormalized = normalizeConnections([newConnection])
      const newConnectionsReceivedAction = connectionsReceived([newConnection])
      const newStateWithNewConnection = appReducer(newState, newConnectionsReceivedAction)

      expect(newStateWithNewConnection.connections.byId[1]).toEqual(normalizedConnections.byId[1])
      expect(newStateWithNewConnection.connections.byId[2]).toEqual(newConnectionsNormalized.byId[2])
      expect(newStateWithNewConnection.connections.byId[2].name).toEqual(newName)
    })

  })

  test('ActionType.CREATE_CONNECTION', () => {
    const action = createOrUpdateConnection()
    const newState = appReducer(initialState, action)

    expect(newState.connectionModalOpen).toEqual(initialState.connectionModalOpen)
    expect(newState.connections).toEqual(initialState.connections)
    expect(newState.currentConnection).toEqual(initialState.currentConnection)
    expect(newState.getConnectionsStatus).toEqual(initialState.getConnectionsStatus)
    expect(newState.createConnectionStatus).toEqual(Status.InProgress)
  })

  test('ActionType.CONNECTION_CREATED', () => {
    const connection = buildFakeConnection()
    const normalizedConnection = normalizeConnections([connection])
    const action = connectionCreated(connection)
    const newState = appReducer(initialState, action)

    expect(newState.connectionModalOpen).toEqual(initialState.connectionModalOpen)
    expect(newState.connections).toEqual(normalizedConnection)
    expect(newState.currentConnection).toEqual(connection)
    expect(newState.getConnectionsStatus).toEqual(initialState.getConnectionsStatus)
    expect(newState.createConnectionStatus).toEqual(Status.Completed)
  })

  test('BlockActionType.TRANSACTIONS_RECEIVED', () => {
    const connection = buildFakeConnection()
    const connectionsNormalized = normalizeConnections([connection])
    const connectionAction = connectionsReceived([connection])
    const newConnectionState = appReducer(initialState, connectionAction)

    expect(newConnectionState.connections).toEqual(connectionsNormalized)
    expect(newConnectionState.currentConnection).toEqual(connection)

    const transactions = buildFakeTransactions()
    const expectedTransactions = transactions.map((item) => {
      return `${item.id}`
    });

    const expectedNormalizedConnection: NormalizedObject<ConnectionNormalized> = {
      ...connectionsNormalized,
      byId: {
        ...connectionsNormalized.byId,
        [`${connection.id}`]: {
          ...connectionsNormalized.byId[`${connection.id}`],
          transactions: expectedTransactions
        }
      }
    }

    const action = transactionsReceived(transactions)
    const newState = appReducer(newConnectionState, action)

    expect(newState.connectionModalOpen).toEqual(newConnectionState.connectionModalOpen)
    expect(newState.connections).toEqual(expectedNormalizedConnection)
    expect(newState.currentConnection).toEqual(newConnectionState.currentConnection)
    expect(newState.getConnectionsStatus).toEqual(newConnectionState.getConnectionsStatus)
    expect(newState.createConnectionStatus).toEqual(newConnectionState.createConnectionStatus)
  })

  test('TransactionActionType.BLOCKS_RECEIVED', () => {
    const connection = buildFakeConnection()
    const connectionsNormalized = normalizeConnections([connection])
    const connectionAction = connectionsReceived([connection])
    const newConnectionState = appReducer(initialState, connectionAction)

    expect(newConnectionState.connections).toEqual(connectionsNormalized)
    expect(newConnectionState.currentConnection).toEqual(connection)

    const blocks = buildFakeBlocks()
    const expectedBlocks = blocks.map((item) => {
      return `${item.id}`
    });

    const expectedNormalizedConnection: NormalizedObject<ConnectionNormalized> = {
      ...connectionsNormalized,
      byId: {
        ...connectionsNormalized.byId,
        [`${connection.id}`]: {
          ...connectionsNormalized.byId[`${connection.id}`],
          blocks: expectedBlocks
        }
      }
    }

    const action = blocksReceived(blocks)
    const newState = appReducer(newConnectionState, action)

    expect(newState.connectionModalOpen).toEqual(newConnectionState.connectionModalOpen)
    expect(newState.connections).toEqual(expectedNormalizedConnection)
    expect(newState.currentConnection).toEqual(newConnectionState.currentConnection)
    expect(newState.getConnectionsStatus).toEqual(newConnectionState.getConnectionsStatus)
    expect(newState.createConnectionStatus).toEqual(newConnectionState.createConnectionStatus)

  })

  test('ContractActionType.CONTRACTS_RECEIVED', () => {
    const connection = buildFakeConnection()
    const connectionsNormalized = normalizeConnections([connection])
    const connectionAction = connectionsReceived([connection])
    const newConnectionState = appReducer(initialState, connectionAction)

    expect(newConnectionState.connections).toEqual(connectionsNormalized)
    expect(newConnectionState.currentConnection).toEqual(connection)

    const contracts = buildFakeContracts()
    const expectedContracts = contracts.map((item) => {
      return `${item.id}`
    });

    const expectedNormalizedConnection: NormalizedObject<ConnectionNormalized> = {
      ...connectionsNormalized,
      byId: {
        ...connectionsNormalized.byId,
        [`${connection.id}`]: {
          ...connectionsNormalized.byId[`${connection.id}`],
          contracts: expectedContracts
        }
      }
    }

    const action = contractsReceived(contracts)
    const newState = appReducer(newConnectionState, action)

    expect(newState.connectionModalOpen).toEqual(newConnectionState.connectionModalOpen)
    expect(newState.connections).toEqual(expectedNormalizedConnection)
    expect(newState.currentConnection).toEqual(newConnectionState.currentConnection)
    expect(newState.getConnectionsStatus).toEqual(newConnectionState.getConnectionsStatus)
    expect(newState.createConnectionStatus).toEqual(newConnectionState.createConnectionStatus)

  })
})
