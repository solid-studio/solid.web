import { buildFakeConnections, buildFakeConnection } from '@solidstudio/types'

import { appReducer, initialState } from './reducer'
import {
  connectionsReceived,
  closeConnectionModal,
  openConnectionModal,
  getConnections,
  createOrUpdateConnection,
  connectionCreated
} from './actions'
import { Status } from 'features/common/types'

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

  test('ActionType.CONNECTIONS_RECEIVED', () => {
    const connections = buildFakeConnections()
    const action = connectionsReceived(connections)
    const newState = appReducer(initialState, action)

    expect(newState.connectionModalOpen).toEqual(initialState.connectionModalOpen)
    expect(newState.connections).toEqual(connections)
    expect(newState.currentConnection).toEqual(connections[0])
    expect(newState.getConnectionsStatus).toEqual(Status.Completed)
    expect(newState.createConnectionStatus).toEqual(initialState.createConnectionStatus)
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
    const action = connectionCreated(connection)
    const newState = appReducer(initialState, action)

    expect(newState.connectionModalOpen).toEqual(initialState.connectionModalOpen)
    expect(newState.connections).toEqual([connection])
    expect(newState.currentConnection).toEqual(connection)
    expect(newState.getConnectionsStatus).toEqual(initialState.getConnectionsStatus)
    expect(newState.createConnectionStatus).toEqual(Status.Completed)
  })
})
