import { buildFakeBlocks } from '@solid-explorer/types'

import { appReducer, initialState } from './reducer'
import { blocksReceived } from './actions'

describe('Blocks reducer', () => {
  test('ActionType.BLOCKS_RECEIVED', () => {
    const blocks = buildFakeBlocks()
    const blocksReceivedAction = blocksReceived(blocks)
    const newState = appReducer(initialState, blocksReceivedAction)

    expect(newState.blocks).toEqual(blocks)
    expect(newState.currentBlock).toEqual(blocks[0]) // TODO: Am I sure the current block has to be the first one?, check reducer too..
    expect(newState.getBlocksStatus).toEqual(initialState.getBlocksStatus)
  })
})
