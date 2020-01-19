import { buildFakeBlocks, buildFakeBlock } from '@solid-explorer/types'

import { blocksReducer, blocksInitialState, normalizeBlocks } from './reducer'
import { blocksReceived } from './actions'

describe('Blocks reducer', () => {
  test('ActionType.BLOCKS_RECEIVED', () => {
    const blocks = buildFakeBlocks()
    const blocksNormalized = normalizeBlocks(blocks)
    const blocksReceivedAction = blocksReceived(blocks)
    const newState = blocksReducer(blocksInitialState, blocksReceivedAction)

    expect(newState.blocks).toEqual(blocksNormalized)
    expect(newState.currentBlock).toEqual(blocks[0])
    expect(newState.getBlocksStatus).toEqual(blocksInitialState.getBlocksStatus)
  })

  test('ActionType.BLOCKS_RECEIVED Adding new items', () => {
    const blocks = buildFakeBlocks()
    const blocksNormalized = normalizeBlocks(blocks)
    const blocksReceivedAction = blocksReceived(blocks)
    const newState = blocksReducer(blocksInitialState, blocksReceivedAction)

    expect(newState.blocks).toEqual(blocksNormalized)
    expect(newState.currentBlock).toEqual(blocks[0])
    expect(newState.getBlocksStatus).toEqual(blocksInitialState.getBlocksStatus)

    const newBlock = buildFakeBlock({ id: 3 })
    const newBlocksNormalized = normalizeBlocks([newBlock])
    const newBlocksReceivedAction = blocksReceived([newBlock])
    const newStateWithNewBlock = blocksReducer(newState, newBlocksReceivedAction)

    expect(newStateWithNewBlock.blocks.byId[1]).toEqual(blocksNormalized.byId[1])
    expect(newStateWithNewBlock.blocks.byId[2]).toEqual(blocksNormalized.byId[2])
    expect(newStateWithNewBlock.blocks.byId[3]).toEqual(newBlocksNormalized.byId[3])
  })

  test('ActionType.BLOCKS_RECEIVED Adding new existing items', () => {
    const blocks = buildFakeBlocks()
    const blocksNormalized = normalizeBlocks(blocks)
    const blocksReceivedAction = blocksReceived(blocks)
    const newState = blocksReducer(blocksInitialState, blocksReceivedAction)

    expect(newState.blocks).toEqual(blocksNormalized)
    expect(newState.currentBlock).toEqual(blocks[0])
    expect(newState.getBlocksStatus).toEqual(blocksInitialState.getBlocksStatus)

    const newBlockNumber = 123
    const newBlock = buildFakeBlock({ id: 2, blockNumber: newBlockNumber })
    const newBlocksNormalized = normalizeBlocks([newBlock])
    const newBlocksReceivedAction = blocksReceived([newBlock])
    const newStateWithNewBlock = blocksReducer(newState, newBlocksReceivedAction)

    expect(newStateWithNewBlock.blocks.byId[1]).toEqual(blocksNormalized.byId[1])
    expect(newStateWithNewBlock.blocks.byId[2]).toEqual(newBlocksNormalized.byId[2])
    expect(newStateWithNewBlock.blocks.byId[2].blockNumber).toEqual(newBlockNumber)
  })
})
