import { ActionCreator, Action } from 'redux'

import { Block } from './types'
import { ActionType, BlocksReceivedAction, GetBlocksAction } from './action-types'

export const blocksReceived: ActionCreator<Action> = (blocks: Block[]): BlocksReceivedAction => {
    return {
        type: ActionType.BLOCKS_RECEIVED,
        payload: blocks
    }
}

export const getBlocks: ActionCreator<Action> = (): GetBlocksAction => {
    return {
        type: ActionType.GET_BLOCKS
    }
}