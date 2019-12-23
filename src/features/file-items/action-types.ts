import { Action } from 'redux'

import { FileItem } from '@solid-explorer/types'

export enum ActionType {
  ERROR_WHEN_GETTING_DATA = 'ERROR_WHEN_GETTING_DATA', // TODO
  FILE_ITEMS_RECEIVED = 'FILE_ITEMS_RECEIVED',
  GET_FILE_ITEMS = 'GET_FILE_ITEMS'
}

export interface GetFileItemsAction extends Action {
  type: ActionType.GET_FILE_ITEMS
}

export interface FileItemsReceivedAction extends Action {
  type: ActionType.FILE_ITEMS_RECEIVED
  payload: FileItem[]
}

export type Actions = GetFileItemsAction | FileItemsReceivedAction
