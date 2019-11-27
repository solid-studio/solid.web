import { Reducer } from 'redux'

import { Block } from '@solid-explorer/types'

import { Status, NormalizedObject } from '../common/types'
import { ActionType, Actions } from './action-types'
import { normalize, schema } from 'normalizr';

export interface BlocksState {
  currentBlock?: Block
  blocks: NormalizedObject<Block>
  getBlocksStatus: Status
}

export const initialState: BlocksState = {
  currentBlock: undefined,
  getBlocksStatus: Status.NotStarted,
  blocks: {
    byId: {},
    allIds: []
  }
}

export const appReducer: Reducer<BlocksState, Actions> = (
  state: BlocksState = initialState,
  action: Actions
): BlocksState => {
  switch (action.type) {
    case ActionType.BLOCKS_RECEIVED: // TEST
      return { ...state, blocks: getNewBlocks(action.payload, state), currentBlock: action.payload[0] }
    default:
      return state
  }
}

export const normalizeBlocks = (blocks: Block[]): NormalizedObject<Block> => {
  const blockSchema = new schema.Entity('blocks');
  const blockListSchema = new schema.Array(blockSchema);
  const normalizedData = normalize(blocks, blockListSchema);

  return {
    byId: normalizedData.entities.blocks,
    allIds: normalizedData.result
  }
}

export const getNewBlocks = (blocks: Block[], state: BlocksState): NormalizedObject<Block> => {
  const newNormalizedBlocks = normalizeBlocks(blocks)
  const filteredNewIds = newNormalizedBlocks.allIds.filter((id: string) => {
    return state.blocks.allIds.indexOf(id) === -1
  })
  const newBlocks = {
    ...state.blocks,
    byId: {
      ...state.blocks.byId,
      ...newNormalizedBlocks.byId
    },
    allIds: [...state.blocks.allIds, ...filteredNewIds]
  }
  return newBlocks
}