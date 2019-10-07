import { Reducer } from 'redux'

import { Block } from '@solidstudio/solid.types'

import { Status } from '../common/types'
import { ActionType, Actions } from './action-types';

export interface BlocksState {
    currentBlock?: Block
    blocks: Block[]
    getBlocksStatus: Status
}

export const initialState: BlocksState = {
    blocks: [],
    currentBlock: undefined,
    getBlocksStatus: Status.NotStarted
}

export const appReducer: Reducer<BlocksState, Actions> = (
    state: BlocksState = initialState,
    action: Actions
): BlocksState => {
    switch (action.type) {
        case ActionType.BLOCKS_RECEIVED:
            return { ...state, blocks: action.payload, currentBlock: action.payload[0] }
        default:
            return state
    }
}
