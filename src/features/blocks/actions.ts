import { ActionCreator, Action } from 'redux'

import { Block } from '@solid-explorer/types'

import { ActionType, BlocksReceivedAction, GetBlocksAction } from './action-types'

export const blocksReceived: ActionCreator<BlocksReceivedAction> = (blocks: Block[]): BlocksReceivedAction => {
  return {
    type: ActionType.BLOCKS_RECEIVED,
    payload: blocks
  }
}

export const getBlocks: ActionCreator<GetBlocksAction> = (connectionId: number): GetBlocksAction => {
  return {
    type: ActionType.GET_BLOCKS,
    payload: connectionId
  }
}
