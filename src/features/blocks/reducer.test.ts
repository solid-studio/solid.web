import { buildFakeBlocks, buildFakeBlock } from '@solid-explorer/types'

import { appReducer, initialState, normalizeBlocks } from './reducer'
import { blocksReceived } from './actions'

describe('Blocks reducer', () => {
  test('ActionType.BLOCKS_RECEIVED', () => {
    const blocks = buildFakeBlocks()
    const blocksNormalized = normalizeBlocks(blocks)
    const blocksReceivedAction = blocksReceived(blocks)
    const newState = appReducer(initialState, blocksReceivedAction)

    expect(newState.blocks).toEqual(blocksNormalized)
    expect(newState.currentBlock).toEqual(blocks[0]) // TODO: Am I sure the current block has to be the first one?, check reducer too..
    expect(newState.getBlocksStatus).toEqual(initialState.getBlocksStatus)
  })

  test('ActionType.BLOCKS_RECEIVED Adding new items', () => {
    const blocks = buildFakeBlocks()
    const blocksNormalized = normalizeBlocks(blocks)
    const blocksReceivedAction = blocksReceived(blocks)
    const newState = appReducer(initialState, blocksReceivedAction)

    expect(newState.blocks).toEqual(blocksNormalized)
    expect(newState.currentBlock).toEqual(blocks[0]) // TODO: Am I sure the current block has to be the first one?, check reducer too..
    expect(newState.getBlocksStatus).toEqual(initialState.getBlocksStatus)

    const newBlock = buildFakeBlock({ id: 3 })
    const newBlocksNormalized = normalizeBlocks([newBlock])
    const newBlocksReceivedAction = blocksReceived([newBlock])
    const newStateWithNewBlock = appReducer(newState, newBlocksReceivedAction)

    expect(newStateWithNewBlock.blocks.byId[1]).toEqual(blocksNormalized.byId[1])
    expect(newStateWithNewBlock.blocks.byId[2]).toEqual(blocksNormalized.byId[2])
    expect(newStateWithNewBlock.blocks.byId[3]).toEqual(newBlocksNormalized.byId[3])
  })

  test('ActionType.BLOCKS_RECEIVED Adding new existing items', () => {
    const blocks = buildFakeBlocks()
    const blocksNormalized = normalizeBlocks(blocks)
    const blocksReceivedAction = blocksReceived(blocks)
    const newState = appReducer(initialState, blocksReceivedAction)

    expect(newState.blocks).toEqual(blocksNormalized)
    expect(newState.currentBlock).toEqual(blocks[0]) // TODO: Am I sure the current block has to be the first one?, check reducer too..
    expect(newState.getBlocksStatus).toEqual(initialState.getBlocksStatus)

    const newBlockNumber = 123;
    const newBlock = buildFakeBlock({ id: 2, blockNumber: newBlockNumber })
    const newBlocksNormalized = normalizeBlocks([newBlock])
    const newBlocksReceivedAction = blocksReceived([newBlock])
    const newStateWithNewBlock = appReducer(newState, newBlocksReceivedAction)

    expect(newStateWithNewBlock.blocks.byId[1]).toEqual(blocksNormalized.byId[1])
    expect(newStateWithNewBlock.blocks.byId[2]).toEqual(newBlocksNormalized.byId[2])
    expect(newStateWithNewBlock.blocks.byId[2].blockNumber).toEqual(newBlockNumber)
  })
})
