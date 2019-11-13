import { Action } from 'redux'

import { Block } from '@solidstudio/types'

export enum ActionType {
  ERROR_WHEN_GETTING_DATA = 'ERROR_WHEN_GETTING_DATA', // TODO: MOVE
  BLOCKS_RECEIVED = 'BLOCKS_RECEIVED',
  GET_BLOCKS = 'GET_BLOCKS'
}

export interface BlocksReceivedAction extends Action {
  type: ActionType.BLOCKS_RECEIVED
  payload: Block[]
}

export interface GetBlocksAction extends Action {
  type: ActionType.GET_BLOCKS
  payload: number
}

export type Actions = BlocksReceivedAction | GetBlocksAction
